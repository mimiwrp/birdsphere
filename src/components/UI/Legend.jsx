import React from 'react';

const Legend = ({ birdFamilies }) => {
  const sizeInfo = [
    { size: 'TINY', label: 'Tiny (Hummingbird)', dotSize: '12px' },
    { size: 'SMALL', label: 'Small (Robin)', dotSize: '16px' },
    { size: 'MEDIUM', label: 'Medium (Crow)', dotSize: '22px' },
    { size: 'LARGE', label: 'Large (Eagle)', dotSize: '28px' }
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '15px',
      borderRadius: '15px',
      color: '#2c3e50',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      maxWidth: '250px',
      zIndex: 50
    }}>
      {/* Bird Families */}
      <div style={{ 
        fontWeight: 'bold', 
        marginBottom: '12px', 
        color: '#27ae60' 
      }}>
        Bird Families
      </div>
      
      {birdFamilies && birdFamilies.map(family => (
        <div key={family.id} style={{
          display: 'flex',
          alignItems: 'center',
          margin: '8px 0'
        }}>
          <div style={{
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            background: family.color,
            marginRight: '12px',
            border: '2px solid rgba(0,0,0,0.1)'
          }} />
          <span style={{ fontSize: '14px' }}>
            {family.name} ({family.birds.length})
          </span>
        </div>
      ))}

      {/* Bird Sizes */}
      <div style={{ 
        fontWeight: 'bold', 
        margin: '15px 0 10px 0', 
        color: '#27ae60' 
      }}>
        Bird Sizes
      </div>
      
      {sizeInfo.map(size => (
        <div key={size.size} style={{
          display: 'flex',
          alignItems: 'center',
          margin: '8px 0'
        }}>
          <div style={{
            width: size.dotSize,
            height: size.dotSize,
            borderRadius: '50%',
            background: '#34495e',
            marginRight: '12px',
            border: '2px solid rgba(0,0,0,0.1)'
          }} />
          <span style={{ fontSize: '14px' }}>
            {size.label}
          </span>
        </div>
      ))}

      {/* Instructions */}
      <div style={{
        marginTop: '15px',
        fontSize: '12px',
        opacity: 0.7,
        lineHeight: '1.4'
      }}>
        🎯 Drag to rotate • Scroll to zoom<br/>
        🐦 Click birds for details
      </div>
    </div>
  );
};

export default Legend;