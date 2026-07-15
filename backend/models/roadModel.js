const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/sample_roads.json');

// Read data synchronously for simplicity in this temporary JSON model
const readData = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

class RoadModel {
  static getAllRoads() {
    return new Promise((resolve) => {
      const data = readData();
      resolve(data);
    });
  }

  static getRoadById(id) {
    return new Promise((resolve) => {
      const data = readData();
      const feature = data.features.find(f => f.properties.id === id);
      resolve(feature || null);
    });
  }

  static createRoad(newRoad) {
    // Placeholder for future DB implementation
    return Promise.resolve(newRoad);
  }

  static updateRoad(id, updates) {
    // Placeholder for future DB implementation
    return Promise.resolve({ id, ...updates });
  }

  static deleteRoad(id) {
    // Placeholder for future DB implementation
    return Promise.resolve(true);
  }
}

module.exports = RoadModel;
