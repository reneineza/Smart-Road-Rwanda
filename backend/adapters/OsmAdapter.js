class OsmAdapter {
  static adapt(properties) {
    // OpenStreetMap tags mapped to engineering attributes
    return {
      id: properties.id,
      name: properties.name || 'Unknown Road',
      classification: properties.highway || 'Unknown',
      surface_type: properties.surface || 'Unknown',
      lanes: properties.lanes ? parseInt(properties.lanes, 10) : 2,
      maxspeed: properties.maxspeed || 'Unknown',
      // OSM rarely has capacity/construction year, so we default or calculate
      estimated_capacity: properties.lanes ? `${parseInt(properties.lanes, 10) * 800} veh/hr` : '1600 veh/hr',
      construction_year: 'N/A',
      responsible_authority: 'OpenStreetMap',
      condition: 'Unknown' // Future AI prediction
    };
  }
}

module.exports = OsmAdapter;
