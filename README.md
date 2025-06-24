# 🌐 BirdSphere - 3D Bird Encyclopedia

Interactive 3D bird family tree with WebGL visualization and GraphQL backend.

## Quick Start

```bash
# Install dependencies
npm install

# Start GraphQL server (Terminal 1)
npm run server

# Start React app (Terminal 2) 
npm run dev
```

**URLs:**
- React App: http://localhost:5173
- GraphQL Playground: http://localhost:4000/graphql


## Current Features

- **3D Tree**: Three.js WebGL scene with clickable bird spheres
- **GraphQL**: Real API integration (fetches static data via Apollo)
- **Collapsible Table**: Right-side overlay with all birds listed
- **Bird Images**: Local photos in `/public/images/birds/`
- **No Auto-Rotation**: Static tree that maintains camera position
- **Two-way Selection**: Click birds in 3D or table, highlights both ways

## Tech Stack

- **Frontend**: React + Vite, Three.js, Apollo Client
- **Backend**: GraphQL (Apollo Server), Express  
- **3D**: WebGL, OrbitControls for camera
- **Styling**: CSS-in-JS, glassmorphism design
