const TransitModel = require('../models/transitModel');

class TransitService {
  static async getAllRoutes() {
    const routes = await TransitModel.getAllRoutes();
    const operators = await TransitModel.getAllOperators();
    const stops = await TransitModel.getAllStops();

    // Enrich routes with operator info and stop counts
    return routes.map(route => {
      const op = operators.find(o => o.id === route.operator_id);
      const routeStops = stops.filter(s => s.route_ids.includes(route.id));
      
      return {
        ...route,
        operator_name: op ? op.operator_name : 'Unknown',
        stop_count: routeStops.length
      };
    });
  }

  static async getRouteById(id) {
    const route = await TransitModel.getRouteById(id);
    if (!route) return null;

    const operators = await TransitModel.getAllOperators();
    const stops = await TransitModel.getAllStops();

    const op = operators.find(o => o.id === route.operator_id);
    const routeStops = stops.filter(s => s.route_ids.includes(route.id));

    return {
      ...route,
      operator: op || { operator_name: 'Unknown' },
      stops: routeStops.map(s => ({ id: s.id, name: s.stop_name, coordinates: s.coordinates }))
    };
  }

  static async getAllStops() {
    const stops = await TransitModel.getAllStops();
    const routes = await TransitModel.getAllRoutes();

    // Enrich stops with route details
    return stops.map(stop => {
      const stopRoutes = stop.route_ids.map(rId => {
        const r = routes.find(route => route.id === rId);
        return r ? { id: r.id, code: r.route_code, name: r.route_name } : null;
      }).filter(Boolean);

      return {
        ...stop,
        routes_served: stopRoutes
      };
    });
  }

  static async getAllOperators() {
    const operators = await TransitModel.getAllOperators();
    const routes = await TransitModel.getAllRoutes();

    return operators.map(op => {
      const opRoutes = routes.filter(r => r.operator_id === op.id);
      return {
        ...op,
        active_routes: opRoutes.length
      };
    });
  }
}

module.exports = TransitService;
