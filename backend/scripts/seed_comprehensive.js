const { Client } = require('pg');
const shapefile = require('shapefile');
require('dotenv').config({ path: '../.env' });

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/srr_db';

const BASE_PATH = 'C:\\Users\\ineza\\Downloads\\New folder\\Rwanda Datas (1)\\Rwanda base map\\Administrative data\\';

const SHAPEFILES = [
  // Administrative boundaries
  { path: BASE_PATH + 'Province.shp', table: 'admin_boundaries', extraProps: { level: 'Province' } },
  { path: BASE_PATH + 'Districts.shp', table: 'admin_boundaries', extraProps: { level: 'District' } },
  { path: BASE_PATH + 'Sectors.shp', table: 'admin_boundaries', extraProps: { level: 'Sector' } },
  { path: BASE_PATH + 'Cells.shp', table: 'admin_boundaries', extraProps: { level: 'Cell' } },
  
  // Hydrography
  { path: BASE_PATH + 'Lakes.shp', table: 'hydrography', extraProps: { type: 'Lake' } },
  { path: BASE_PATH + 'Rivers.shp', table: 'hydrography', extraProps: { type: 'River' } },
  
  // Points of Interest
  { path: BASE_PATH + 'Markets_with_business_centres.shp', table: 'poi', extraProps: { type: 'Market' } },
  
  // Environment
  { path: BASE_PATH + 'Landcover.shp', table: 'landcover', extraProps: { type: 'Landcover' } },
  { path: BASE_PATH + 'soils_organic.shp', table: 'landcover', extraProps: { type: 'Soil' } },
  
  // Roads (Overwriting sample roads with real comprehensive roads)
  { path: BASE_PATH + 'Roads.shp', table: 'roads', extraProps: { type: 'Road' } }
];

async function seedComprehensiveData() {
  const client = new Client({ connectionString: DATABASE_URL });
  
  try {
    console.log('Connecting to Local PostgreSQL...');
    await client.connect();
    
    // Ensure PostGIS is enabled
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis;');

    console.log('Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_boundaries (
        id SERIAL PRIMARY KEY,
        level VARCHAR(50),
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
      CREATE TABLE IF NOT EXISTS hydrography (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
      CREATE TABLE IF NOT EXISTS poi (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
      CREATE TABLE IF NOT EXISTS landcover (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
      CREATE TABLE IF NOT EXISTS roads (
        id SERIAL PRIMARY KEY,
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
    `);
    
    console.log('Truncating tables to prevent duplicates...');
    await client.query('TRUNCATE TABLE admin_boundaries, hydrography, poi, landcover, roads RESTART IDENTITY;');

    for (const shp of SHAPEFILES) {
      console.log(`\nUploading ${shp.path.split('\\\\').pop()} to ${shp.table}...`);
      try {
        let source = await shapefile.open(shp.path);
        let count = 0;
        
        while (true) {
          let result = await source.read();
          if (result.done) break;
          const feature = result.value;
          
          if (feature.geometry) {
            const geomJson = JSON.stringify(feature.geometry);
            const propsJson = JSON.stringify(feature.properties || {});
            
            if (shp.table === 'admin_boundaries') {
              await client.query(`
                INSERT INTO admin_boundaries (level, properties, geom)
                VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326))
              `, [shp.extraProps.level, propsJson, geomJson]);
            } else if (shp.table === 'hydrography') {
              await client.query(`
                INSERT INTO hydrography (type, properties, geom)
                VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326))
              `, [shp.extraProps.type, propsJson, geomJson]);
            } else if (shp.table === 'poi') {
              await client.query(`
                INSERT INTO poi (type, properties, geom)
                VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326))
              `, [shp.extraProps.type, propsJson, geomJson]);
            } else if (shp.table === 'landcover') {
              await client.query(`
                INSERT INTO landcover (type, properties, geom)
                VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326))
              `, [shp.extraProps.type, propsJson, geomJson]);
            } else if (shp.table === 'roads') {
              // Ensure we don't break the road model expectations
              const roadProps = JSON.parse(propsJson);
              roadProps.source = 'Shapefile';
              roadProps.id = roadProps.id || `shp-road-${count}`;
              await client.query(`
                INSERT INTO roads (properties, geom)
                VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326))
              `, [JSON.stringify(roadProps), geomJson]);
            }
            
            count++;
            if (count % 500 === 0) console.log(`... Inserted ${count} features ...`);
          }
        }
        console.log(`Successfully uploaded ${count} features for ${shp.table}!`);
      } catch (err) {
         console.error(`Failed to process ${shp.path}`, err.message);
      }
    }
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

seedComprehensiveData();
