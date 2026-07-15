# Frontend Architecture

SmartRoad Rwanda leverages a modern, component-driven frontend architecture designed for performance, maintainability, and seamless GIS integration.

## Technology Stack
- **Framework:** Next.js (App Router)
- **Language:** JavaScript / TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS (for utility-first, rapid, and consistent styling)
- **Component Architecture:** Modern component architecture (e.g., shadcn/ui or Radix UI for accessible primitives)
- **Mapping:** MapLibre GL JS or Leaflet via React wrappers (e.g., react-map-gl)

## Folder Structure
```
src/
├── app/                  # Next.js App Router pages (Dashboard, Map, Assets)
├── components/           # Reusable UI components
│   ├── ui/               # Base design system components (Buttons, Inputs, Modals)
│   ├── map/              # GIS specific components (Layers, Controls, Popups)
│   ├── forms/            # Data collection and editing forms
│   └── layout/           # Sidebar, Navbar, Page wrappers
├── lib/                  # Utility functions, API clients, formatters
├── hooks/                # Custom React hooks (e.g., useMapData, useAuth)
├── store/                # Global state management configuration
├── types/                # TypeScript interfaces and type definitions
└── styles/               # Global CSS and Tailwind configuration
```

## State Management Approach
- **Local UI State:** React `useState` and `useReducer` for component-specific state (e.g., dropdowns, form inputs).
- **Server State / Data Fetching:** React Query (TanStack Query) or SWR to handle API requests, caching, background updates, and pagination.
- **Global Map State:** A lightweight global store (like Zustand or Jotai) specifically to manage map viewport, active layers, and selected features across different components without prop drilling.

## API Communication Strategy
- **RESTful Client:** Axios or native `fetch` wrapped in utility functions to handle authentication headers and error standardization.
- **Geospatial Data:** Endpoints will return standard GeoJSON formats. The frontend will parse and pass this directly to the mapping library for rendering via WebGL, ensuring high performance even with thousands of road segments.
