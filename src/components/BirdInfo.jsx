import React from 'react';

const BirdInfo = ({ bird, onClose, onPlayAudio }) => {
  if (!bird) return null;

  const playBirdCall = () => {
    if (onPlayAudio) {
      onPlayAudio(bird.audioUrl);
    } else {
      alert(`🎵 Playing ${bird.name} bird call!\n(In real app, this would play: ${bird.audioUrl})`);
    }
  };

  return (
    <div style={{
      position: 'fixed', // Changed from absolute to fixed
      bottom: '20px',
      left: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      color: '#2c3e50',
      padding: '25px',
      borderRadius: '20px',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
      maxWidth: '350px',
      zIndex: 1000 // Increased z-index
    }}>
      {/* Bird Image */}
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: '#ecf0f1',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        border: `4px solid ${bird.familyColor}`,
        backgroundImage: `url(${bird.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Loading/Fallback */}
        <img 
          src={bird.imageUrl} 
          alt={bird.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '🦅';
          }}
        />
      </div>

      {/* Bird Info */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>
          {bird.name}
        </h3>
        
        <div style={{ 
          fontStyle: 'italic', 
          color: '#7f8c8d',
          fontSize: '14px',
          marginBottom: '10px'
        }}>
          {bird.scientificName}
        </div>
        
        <div style={{ 
          color: bird.familyColor, 
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          Family: {bird.family}
        </div>

        <div style={{
          fontSize: '12px',
          color: '#7f8c8d',
          marginBottom: '10px'
        }}>
          Size: {bird.size} • Wingspan: {bird.wingspan}
        </div>
        
        <div style={{ 
          fontSize: '14px', 
          marginBottom: '15px',
          lineHeight: '1.4'
        }}>
          {bird.description}
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '10px',
          borderRadius: '10px',
          marginBottom: '15px',
          fontSize: '13px',
          fontStyle: 'italic'
        }}>
          💡 {bird.funFact}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={playBirdCall}
            style={{
              background: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔊 Play Bird Call
          </button>
          
          <button 
            onClick={onClose}
            style={{
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirdInfo;