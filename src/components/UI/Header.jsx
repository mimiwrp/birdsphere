import React from 'react';

const Header = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 100,
      color: '#2c3e50'
    }}>
      <div style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#2c3e50'
      }}>
        🌐 🐦 BirdSphere
      </div>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div><strong>🌐 Interactive 3D Bird Explorer</strong></div>
        <div style={{ 
          fontSize: '12px', 
          marginTop: '5px', 
          opacity: 0.8 
        }}>
          Click birds to learn about them
        </div>
      </div>
    </div>
  );
};

export default Header;