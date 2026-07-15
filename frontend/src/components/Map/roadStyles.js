/**
 * Road Styling Configuration
 * 
 * Centralised style definitions for road network visualization.
 * Update here to change the look of roads across all map components.
 * Future: styles can be driven from a user-configurable theme.
 */

export const ROAD_STYLES = {
  'National Road': {
    color: '#ef4444',     // Red
    weight: 6,
    opacity: 0.85,
  },
  'District Road': {
    color: '#f59e0b',     // Amber
    weight: 4,
    opacity: 0.85,
  },
  'Urban Road': {
    color: '#8b5cf6',     // Purple
    weight: 4,
    opacity: 0.85,
  },
  'default': {
    color: '#3b82f6',     // Blue
    weight: 3,
    opacity: 0.75,
  }
};

export const ROAD_HOVER_STYLE = {
  weight: 9,
  opacity: 1,
};

export const ROAD_SELECTED_STYLE = {
  weight: 9,
  opacity: 1,
  color: '#0ea5e9', // Sky blue for selection
};

export const CONDITION_COLORS = {
  'Good': '#10b981',    // Emerald
  'Fair': '#f59e0b',    // Amber
  'Poor': '#ef4444',    // Red
};

export const getRoadStyle = (classification) => {
  return ROAD_STYLES[classification] || ROAD_STYLES['default'];
};

export const CLASSIFICATION_OPTIONS = [
  { value: '', label: 'All Classifications' },
  { value: 'National Road', label: 'National Road' },
  { value: 'District Road', label: 'District Road' },
  { value: 'Urban Road', label: 'Urban Road' },
];

export const SURFACE_OPTIONS = [
  { value: '', label: 'All Surfaces' },
  { value: 'Asphalt', label: 'Asphalt' },
  { value: 'Gravel', label: 'Gravel' },
  { value: 'Earth', label: 'Earth' },
];

export const CONDITION_OPTIONS = [
  { value: '', label: 'All Conditions' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' },
];
