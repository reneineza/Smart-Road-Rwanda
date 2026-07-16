const { Client } = require('pg');
const shapefile = require('shapefile');

const DATABASE_URL = 'postgresql://neondb_owner:npg_LAT3c7QgJOPI@ep-little-water-atd4cpzt.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

const BASE_PATH = 'C:\\Users\\ineza\\Downloads\\New folder\\Rwanda Datas (1)\\Rwanda base map\\Administrative data\\';

const SHAPEFILES = [
  // Already uploaded:
  // { path: BASE_PATH + 'Districts.shp', table: 'admin_boundaries', extraProps: { level: 'District' } },
  // { path: BASE_PATH + 'Sectors.shp', table: 'admin_boundaries', extraProps: { level: 'Sector' } },
  // { path: BASE_PATH + 'Lakes.shp', table: 'hydrography', extraProps: { type: 'Lake' } },
  // { path: BASE_PATH + 'Rivers.shp', table: 'hydrography', extraProps: { type: 'River' } },
  // { path: BASE_PATH + 'Markets_with_business_centres.shp', table: 'poi', extraProps: { type: 'Market' } }
  
  // New massive layers:
  { path: BASE_PATH + 'Province.shp', table: 'admin_boundaries', extraProps: { level: 'Province' } },
  { path: BASE_PATH + 'Cells.shp', table: 'admin_boundaries', extraProps: { level: 'Cell' } },
  { path: BASE_PATH + 'Landcover.shp', table: 'landcover', extraProps: { type: 'Landcover' } }
];

async function seedComprehensiveData() {
  const client = new Client({ connectionString: DATABASE_URL });
  
  try {
    console.log('Connecting to Neon PostgreSQL...');
    await client.connect();

    console.log('Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS landcover (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        properties JSONB,
        geom geometry(Geometry, 4326)
      );
    `);

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
