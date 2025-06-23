import React, { useState } from 'react';
import FamilyTree from './components/FamilyTree';
import BirdInfo from './components/BirdInfo';
import Header from './components/UI/Header';
import Legend from './components/UI/Legend';
import { birdFamilies } from './data/birds';

function App() {
  const [selectedBird, setSelectedBird] = useState(null);

  const handleBirdClick = (bird) => {
    console.log('Bird clicked:', bird.name); // Debug log
    setSelectedBird(bird);
  };

  const handleCloseBirdInfo = () => {
    setSelectedBird(null);
  };

  const handlePlayAudio = (audioUrl) => {
    console.log('Playing audio:', audioUrl);
    alert('🎵 Bird call playing! (Audio implementation in next iteration)');
  };

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
        birdFamilies={birdFamilies}
        onBirdClick={handleBirdClick}
      />

      {/* Legend */}
      <Legend birdFamilies={birdFamilies} />

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

export default App;