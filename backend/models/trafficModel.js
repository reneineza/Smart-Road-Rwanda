const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/sample_traffic.json');

const readData = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

/**
 * TrafficModel
 *
 * Temporary JSON-backed implementation of the traffic data layer.
 * All methods return Promises to mirror future PostgreSQL async interface.
 * 
 * Migration path: replace readData() calls with pg query calls.
 * The service/controller layers require NO changes.
 */
class TrafficModel {
  static getAllTraffic() {
    return new Promise((resolve) => {
      resolve(readData());
    });
  }

  static getTrafficById(id) {
    return new Promise((resolve) => {
      const data = readData();
      resolve(data.find((t) => t.id === id) || null);
    });
  }

  static getTrafficByRoadId(roadId) {
    return new Promise((resolve) => {
      const data = readData();
      resolve(data.filter((t) => t.roadId === roadId));
    });
  }

  // Future DB stubs
  static createTrafficRecord(record) {
    return Promise.resolve(record);
  }

  static updateTrafficRecord(id, updates) {
    return Promise.resolve({ id, ...updates });
  }

  static deleteTrafficRecord(id) {
    return Promise.resolve(true);
  }
}

module.exports = TrafficModel;
