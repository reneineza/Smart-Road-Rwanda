/**
 * Centralized Layer Registry
 * Defines all GIS layers available in the SmartRoad Rwanda platform.
 */

export const LAYER_REGISTRY = [
  {
    id: 'roads',
    name: 'Road Network',
    description: 'Primary transportation geometry and engineering attributes',
    defaultVisible: true,
    componentPath: './RoadNetworkLayer' // We will lazy load this
  },
  {
    id: 'traffic',
    name: 'Traffic Density',
    description: 'Real-time and historical traffic volumes',
    defaultVisible: false,
    componentPath: './TrafficLayer'
  },
  {
    id: 'safety',
    name: 'Safety Incidents',
    description: 'Accident hotspots and safety reports',
    defaultVisible: false,
    componentPath: './SafetyLayer'
  },
  {
    id: 'transit',
    name: 'Public Transit',
    description: 'Bus routes and stops',
    defaultVisible: false,
    componentPath: './TransitLayer'
  },
  {
    id: 'analytics',
    name: 'Network Analytics',
    description: 'Aggregated analytics and performance metrics',
    defaultVisible: false,
    componentPath: './AnalyticsLayer'
  },
  {
    id: 'ai',
    name: 'AI Intelligence',
    description: 'Predictive insights for road degradation and traffic',
    defaultVisible: false,
    componentPath: './AILayer'
  }
];

export const getLayerConfig = (id) => LAYER_REGISTRY.find(layer => layer.id === id);
