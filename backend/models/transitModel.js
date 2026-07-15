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

  static getAllStops() {
    return new Promise((resolve) => {
      resolve(readData().stops || []);
    });
  }

  static getAllOperators() {
    return new Promise((resolve) => {
      resolve(readData().operators || []);
    });
  }
}

module.exports = TransitModel;
