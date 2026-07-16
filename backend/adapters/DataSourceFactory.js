const OsmAdapter = require('./OsmAdapter');

class DataSourceFactory {
  static getEngineeringAttributes(sourceType, rawProperties) {
    switch (sourceType) {
      case 'osm':
      case 'OpenStreetMap':
        return OsmAdapter.adapt(rawProperties);
      // In the future:
      // case 'rtda_gis':
      //   return RtdaAdapter.adapt(rawProperties);
      default:
        // Generic fallback if source unknown
        return OsmAdapter.adapt(rawProperties);
    }
  }
}

module.exports = DataSourceFactory;
