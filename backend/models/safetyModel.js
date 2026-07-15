const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/sample_accidents.json');

const readData = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

/**
 * SafetyModel
 *
 * Temporary JSON-backed implementation of the road safety data layer.
 * All methods return Promises to mirror future PostgreSQL async interface.
 */
class SafetyModel {
  static getAllAccidents() {
    return new Promise((resolve) => {
      resolve(readData());
    });
  }

  static getAccidentById(id) {
    return new Promise((resolve) => {
      const data = readData();
      resolve(data.find((a) => a.id === id) || null);
    });
  }

  static getAccidentsByRoadId(roadId) {
    return new Promise((resolve) => {
      const data = readData();
      resolve(data.filter((a) => a.road_id === roadId));
    });
  }

  // Future DB stubs
  static createAccident(record) {
    return Promise.resolve(record);
  }

  static updateAccident(id, updates) {
    return Promise.resolve({ id, ...updates });
  }

  static deleteAccident(id) {
    return Promise.resolve(true);
  }
}

module.exports = SafetyModel;
