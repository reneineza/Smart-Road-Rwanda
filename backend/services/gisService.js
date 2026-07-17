const db = require('../db');

class GisService {
  static async getAdminBoundaries(level) {
    try {
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry 
        FROM admin_boundaries
        WHERE level = $1
      `, [level]);
      
      const features = result.rows.map(row => ({
        type: 'Feature',
        properties: row.properties,
        geometry: row.geometry
      }));

      return { type: 'FeatureCollection', features };
    } catch (err) {
      console.error('Error fetching admin boundaries:', err);
      throw err;
    }
  }

  static async getHydrography(type) {
    try {
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry 
        FROM hydrography
        WHERE type = $1
      `, [type]);
      
      const features = result.rows.map(row => ({
        type: 'Feature',
        properties: row.properties,
        geometry: row.geometry
      }));

      return { type: 'FeatureCollection', features };
    } catch (err) {
      console.error('Error fetching hydrography:', err);
      throw err;
    }
  }

  static async getPOI(type) {
    try {
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry 
        FROM poi
        WHERE type = $1
      `, [type]);
      
      const features = result.rows.map(row => ({
        type: 'Feature',
        properties: row.properties,
        geometry: row.geometry
      }));

      return { type: 'FeatureCollection', features };
    } catch (err) {
      console.error('Error fetching POI:', err);
      throw err;
    }
  }
  static async getLandcover(type) {
    try {
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry 
        FROM landcover
        WHERE type = $1
      `, [type]);
      
      const features = result.rows.map(row => ({
        type: 'Feature',
        properties: row.properties,
        geometry: row.geometry
      }));

      return { type: 'FeatureCollection', features };
    } catch (err) {
      console.error('Error fetching landcover:', err);
      throw err;
    }
  }
}

module.exports = GisService;
