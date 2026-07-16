const { Client } = require('pg');
const axios = require('axios');
const osmtogeojson = require('osmtogeojson');
require('dotenv').config({ path: '../.env' });

// We use the Neon DB from config
const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_LAT3c7QgJOPI@ep-little-water-atd4cpzt.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Query fetches major road networks in Rwanda
const OVERPASS_QUERY = `
[out:json][timeout:90];
(
  way["highway"~"trunk|primary|secondary|tertiary|unclassified|residential"](-2.0,29.9,-1.8,30.2);
);
out body;
>;
out skel qt;
`;

async function seedOSMData() {
  try {
    await client.connect();
    console.log('Connected to Neon PostgreSQL...');

    console.log('Fetching OpenStreetMap data via Overpass API...');
    const response = await axios.post(OVERPASS_URL, OVERPASS_QUERY, {
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'SmartRoadRwanda/1.0'
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log(`Received ${response.data.elements.length} elements from Overpass. Converting to GeoJSON...`);
    
    // Convert Overpass JSON to valid GeoJSON
    const geojson = osmtogeojson(response.data);
    
    const features = geojson.features.filter(f => f.geometry.type === 'LineString' || f.geometry.type === 'MultiLineString');
    console.log(`Successfully parsed ${features.length} road features!`);

    console.log('Wiping old shapefile roads...');
    await client.query('TRUNCATE TABLE roads RESTART IDENTITY');

    console.log('Uploading rich OSM roads to Neon...');
    
    // Batch processing
    const BATCH_SIZE = 500;
    for (let i = 0; i < features.length; i += BATCH_SIZE) {
      const batch = features.slice(i, i + BATCH_SIZE);
      const values = [];
      const queryValues = [];
      let paramIndex = 1;

      for (const feature of batch) {
        const properties = feature.properties || {};
        const geometry = feature.geometry;

        const richProperties = {
          id: properties.id || `osm-${i + (paramIndex / 2)}`,
          name: properties.name || properties.ref || 'Unknown Road',
          highway: properties.highway || 'Unknown',
          surface: properties.surface || 'Unknown',
          maxspeed: properties.maxspeed || 'Unknown',
          lanes: properties.lanes || '2',
          bridge: properties.bridge || 'no',
          oneway: properties.oneway || 'no',
          source: 'OpenStreetMap'
        };

        values.push(`($${paramIndex}, ST_SetSRID(ST_GeomFromGeoJSON($${paramIndex + 1}), 4326))`);
        queryValues.push(richProperties, JSON.stringify(geometry));
        paramIndex += 2;
      }

      await client.query(`
        INSERT INTO roads (properties, geom)
        VALUES ${values.join(', ')}
      `, queryValues);

      console.log(`Inserted ${Math.min(i + BATCH_SIZE, features.length)} / ${features.length} roads...`);
    }

    console.log(`Successfully ingested ${features.length} highly-detailed OSM roads into Neon PostGIS!`);

  } catch (error) {
    console.error('Migration failed:', error.message);
    if (error.response) console.error(error.response.data);
  } finally {
    await client.end();
  }
}

seedOSMData();
