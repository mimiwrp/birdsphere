import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import FamilyTree from './components/FamilyTree';
import BirdInfo from './components/BirdInfo';
import Header from './components/UI/Header';
import Legend from './components/UI/Legend';
import BirdTable from './components/BirdTable';
import { birdFamilies } from './data/birds'; // Import static data as fallback

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// GraphQL Query
const GET_BIRD_FAMILIES = gql`
  query GetBirdFamilies {
    birdFamilies {
      id
      name
      color
      description
      birds {
        id
        name
        scientificName
        size
        wingspan
        habitat
        description
        imageUrl
        audioUrl
        isEndangered
        funFact
      }
    }
  }
`;

// Main component that uses GraphQL with fallback
function BirdSphereApp() {
  const [selectedBird, setSelectedBird] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const { loading, error, data } = useQuery(GET_BIRD_FAMILIES);

  const handleBirdClick = (bird) => {
    console.log('Bird clicked:', bird.name);
    setSelectedBird(bird);
  };

  const handleCloseBirdInfo = () => {
    setSelectedBird(null);
  };

  const handlePlayAudio = (audioUrl) => {
    console.log('Playing audio:', audioUrl);
    alert('🎵 Bird call playing! (Audio implementation in next iteration)');
  };

  // Use GraphQL data if available, otherwise fall back to static data
  const birdData = data?.birdFamilies || birdFamilies;
  const isUsingFallback = !data?.birdFamilies;

  // Loading state (only show if we don't have fallback data)
  if (loading && !isUsingFallback) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2c3e50',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
        <div>Loading BirdSphere from GraphQL...</div>
        <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.7 }}>
          Fetching bird families and species data
        </div>
      </div>
    );
  }

  // No error state - just use fallback data if GraphQL fails
  // This ensures the app always works, even when deployed without a server

  // Success state - render the app (works with both GraphQL and static data)
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%)',
      position: 'relative',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <Header />

      {/* Status indicator for development */}
      {isUsingFallback && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 193, 7, 0.9)',
          color: '#856404',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          zIndex: 1001,
          backdropFilter: 'blur(10px)'
        }}>
          📡 Using static data (GraphQL server offline)
        </div>
      )}

      {/* Full-Width 3D Scene */}
      <FamilyTree 
        birdFamilies={birdData}
        onBirdClick={handleBirdClick}
        selectedBird={selectedBird}
      />

      {/* Legend */}
      <Legend birdFamilies={birdData} />

      {/* Toggle Button for Bird Table */}
      <button
        onClick={() => setShowTable(!showTable)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '25px',
          padding: '12px 20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#2c3e50',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 1)';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {showTable ? '🔽 Hide Bird Table' : '📋 View Bird Table'}
      </button>

      {/* Collapsible Bird Table Overlay */}
      {showTable && (
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '20px',
          width: '400px',
          height: 'calc(100vh - 120px)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '20px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          zIndex: 999,
          animation: 'slideIn 0.3s ease-out',
          overflow: 'hidden'
        }}>
          <BirdTable 
            birdFamilies={birdData}
            selectedBird={selectedBird}
            onBirdSelect={handleBirdClick}
            onPlayAudio={handlePlayAudio}
          />
        </div>
      )}

      {/* Bird Info Popup */}
      {selectedBird && (
        <BirdInfo 
          bird={selectedBird}
          onClose={handleCloseBirdInfo}
          onPlayAudio={handlePlayAudio}
        />
      )}

      {/* CSS Animation for table slide-in */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// App wrapper with Apollo Provider
function App() {
  return (
    <ApolloProvider client={client}>
      <BirdSphereApp />
    </ApolloProvider>
  );
}

export default App;