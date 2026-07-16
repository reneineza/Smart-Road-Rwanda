const db = require('../db');

const DataSourceFactory = require('../adapters/DataSourceFactory');

class RoadModel {
  static async getAllRoads() {
    try {
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry,
          ST_Length(geom::geography) / 1000 AS length_km
        FROM roads
      `);
      
      const features = result.rows.map(row => {
        const p = row.properties;
        const source = p.source || 'OpenStreetMap';
        const engineering = DataSourceFactory.getEngineeringAttributes(source, p);
        engineering.length = parseFloat(row.length_km.toFixed(2));

        return {
          type: 'Feature',
          id: p.id,
          geometry: row.geometry,
          engineering: engineering,
          future_modules: {
            traffic: [],
            safety: [],
            maintenance: []
          },
          // Kept for backward compatibility while migrating frontend
          properties: {
            ...p,
            ...engineering
          }
        };
      });

      return {
        type: 'FeatureCollection',
        features
      };
    } catch (err) {
      console.error('Error fetching roads from DB:', err);
      throw err;
    }
  }

  static async getRoadById(id) {
    try {
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry,
          ST_Length(geom::geography) / 1000 AS length_km
        FROM roads 
        WHERE properties->>'id' = $1
      `, [id]);

      if (result.rows.length === 0) return null;

      const row = result.rows[0];
      const p = row.properties;
      const source = p.source || 'OpenStreetMap';
      
      const engineering = DataSourceFactory.getEngineeringAttributes(source, p);
      engineering.length = parseFloat(row.length_km.toFixed(2));

      return {
        type: 'Feature',
        id: p.id,
        geometry: row.geometry,
        engineering: engineering,
        future_modules: {
          traffic: [],
          safety: [],
          maintenance: []
        },
        // Kept for backward compatibility while migrating frontend
        properties: {
          ...p,
          ...engineering
        }
      };
    } catch (err) {
      console.error('Error fetching road by ID:', err);
      throw err;
    }
  }

  static createRoad(newRoad) {
    // Requires inserting into PostGIS
    return Promise.resolve(newRoad);
  }

  static updateRoad(id, updates) {
    // Requires updating PostGIS
    return Promise.resolve({ id, ...updates });
  }

  static deleteRoad(id) {
    // Requires deleting from PostGIS
    return Promise.resolve(true);
  }
}

module.exports = RoadModel;
