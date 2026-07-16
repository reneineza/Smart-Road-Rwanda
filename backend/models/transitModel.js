const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/sample_transit.json');

const readData = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

class TransitModel {
  static getAllRoutes() {
    return new Promise((resolve) => {
      resolve(readData().routes || []);
    });
  }

  static getRouteById(id) {
    return new Promise((resolve) => {
      const data = readData();
      resolve(data.routes.find((r) => r.id === id) || null);
    });
  }

  static async getAllStops() {
    try {
      const db = require('../db');
      const result = await db.query(`
        SELECT 
          properties, 
          ST_AsGeoJSON(geom)::json AS geometry 
        FROM transit_stops
      `);
      
      const features = result.rows.map(row => ({
        type: 'Feature',
        properties: row.properties,
        geometry: row.geometry
      }));

      return {
        type: 'FeatureCollection',
        features
      };
    } catch (err) {
      console.error('Error fetching transit stops from DB:', err);
      // Fallback to sample data if table doesn't exist or error occurs
      return readData().stops || [];
    }
  }

  static getAllOperators() {
    return new Promise((resolve) => {
      resolve(readData().operators || []);
    });
  }
}

module.exports = TransitModel;
