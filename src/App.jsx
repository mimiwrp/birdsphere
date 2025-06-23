import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import FamilyTree from './components/FamilyTree';
import BirdInfo from './components/BirdInfo';
import Header from './components/UI/Header';
import Legend from './components/UI/Legend';

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

// Main component that uses GraphQL
function BirdSphereApp() {
  const [selectedBird, setSelectedBird] = useState(null);
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

  // Loading state
  if (loading) {
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

  // Error state
  if (error) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e74c3c',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
        <div>GraphQL Server Error</div>
        <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
          Make sure to run: npm run server
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.6 }}>
          {error.message}
        </div>
      </div>
    );
  }

  // Success state - render the app
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

      {/* 3D Scene */}
      <FamilyTree 
        birdFamilies={data.birdFamilies}
        onBirdClick={handleBirdClick}
      />

      {/* Legend */}
      <Legend birdFamilies={data.birdFamilies} />

      {/* Bird Info Popup */}
      {selectedBird && (
        <BirdInfo 
          bird={selectedBird}
          onClose={handleCloseBirdInfo}
          onPlayAudio={handlePlayAudio}
        />
      )}
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