import React, { useMemo } from 'react';

const BirdTable = ({ birdFamilies, selectedBird, onBirdSelect, onPlayAudio }) => {
  // Flatten all birds from all families
  const allBirds = useMemo(() => {
    return birdFamilies.flatMap(family => 
      family.birds.map(bird => ({
        ...bird,
        familyName: family.name,
        familyColor: family.color
      }))
    );
  }, [birdFamilies]);

  const handleBirdClick = (bird) => {
    onBirdSelect(bird);
  };

  const handlePlayAudio = (e, bird) => {
    e.stopPropagation(); // Prevent bird selection when clicking audio
    onPlayAudio(bird.audioUrl);
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0'
    }}>
      {/* Table Header */}
      <div style={{
        padding: '15px 15px 12px', // Smaller padding
        borderBottom: '2px solid rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.5)'
      }}>
        <h2 style={{
          margin: '0 0 3px 0',
          fontSize: '20px', // Smaller
          color: '#2c3e50',
          fontWeight: 'bold'
        }}>
          🦅 Birds
        </h2>
        <p style={{
          margin: '0',
          fontSize: '12px', // Smaller
          color: '#7f8c8d',
          opacity: 0.8
        }}>
          Click to view details • {allBirds.length} species
        </p>
      </div>

      {/* Scrollable Bird List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px 0'
      }}>
        {allBirds.map((bird, index) => (
          <div
            key={bird.id}
            onClick={() => handleBirdClick(bird)}
            style={{
              padding: '12px 15px', // Smaller padding
              margin: '3px 10px', // Smaller margins
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: selectedBird?.id === bird.id 
                ? `linear-gradient(135deg, ${bird.familyColor}20, ${bird.familyColor}10)`
                : 'rgba(255, 255, 255, 0.3)',
              border: selectedBird?.id === bird.id 
                ? `2px solid ${bird.familyColor}`
                : '2px solid transparent',
              transform: selectedBird?.id === bird.id ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedBird?.id === bird.id 
                ? `0 4px 20px ${bird.familyColor}30`
                : '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (selectedBird?.id !== bird.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                e.target.style.transform = 'scale(1.01)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedBird?.id !== bird.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            {/* Bird Info Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px' // Reduced gap
            }}>
              {/* Bird Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Common Name */}
                <div style={{
                  fontSize: '14px', // Slightly smaller
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '2px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {bird.name}
                </div>
                
                {/* Scientific Name */}
                <div style={{
                  fontSize: '11px', // Smaller
                  color: '#7f8c8d',
                  fontStyle: 'italic',
                  marginBottom: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {bird.scientificName}
                </div>

                {/* Family Badge */}
                <div style={{
                  display: 'inline-block',
                  fontSize: '10px', // Smaller
                  color: bird.familyColor,
                  background: `${bird.familyColor}15`,
                  padding: '1px 6px', // Smaller padding
                  borderRadius: '8px',
                  border: `1px solid ${bird.familyColor}30`,
                  fontWeight: '500'
                }}>
                  {bird.familyName}
                </div>
              </div>

              {/* Audio Button */}
              <button
                onClick={(e) => handlePlayAudio(e, bird)}
                style={{
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px', // Smaller
                  padding: '6px 8px', // Smaller padding
                  fontSize: '10px', // Smaller font
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  minWidth: '50px', // Smaller width
                  justifyContent: 'center',
                  flexShrink: 0 // Prevent shrinking
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2980b9';
                  e.target.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3498db';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                🔊
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div style={{
        padding: '15px 20px',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.3)',
        fontSize: '12px',
        color: '#7f8c8d',
        textAlign: 'center'
      }}>
        💡 Tip: Click birds in the 3D tree or this list to explore
      </div>
    </div>
  );
};

export default BirdTable;