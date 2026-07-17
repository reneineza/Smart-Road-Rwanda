const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/srr_db'
});

async function seedLocalGeodata() {
  try {
    await client.connect();
    console.log('Connected to Local PostgreSQL...');

    // Create the PostGIS extension if it doesn't exist
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis;');

    console.log('Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS roads (
        id SERIAL PRIMARY KEY,
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
    `);

    console.log('Wiping old roads data...');
    await client.query('TRUNCATE TABLE roads RESTART IDENTITY');

    console.log('Reading sample_roads.json...');
    const dataPath = path.join(__dirname, '../data/sample_roads.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const geojson = JSON.parse(fileContent);
    
    const features = geojson.features;
    console.log(`Found ${features.length} features to ingest.`);

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

        // Ensuring we add an id and keep properties
        properties.id = properties.id || `local-${i + (paramIndex / 2)}`;
        properties.source = properties.source || 'Local';

        values.push(`($${paramIndex}, ST_SetSRID(ST_GeomFromGeoJSON($${paramIndex + 1}), 4326))`);
        queryValues.push(properties, JSON.stringify(geometry));
        paramIndex += 2;
      }

      await client.query(`
        INSERT INTO roads (properties, geom)
        VALUES ${values.join(', ')}
      `, queryValues);

      console.log(`Inserted ${Math.min(i + BATCH_SIZE, features.length)} / ${features.length} roads...`);
    }

    console.log(`Successfully ingested ${features.length} local roads into PostGIS!`);

  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await client.end();
  }
}

seedLocalGeodata();
