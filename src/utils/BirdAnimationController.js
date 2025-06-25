// utils/BirdAnimationController.js

export const animateBirds = (birdMeshes, time) => {
    birdMeshes.forEach((bird, index) => {
      const birdData = bird.userData;
      
      switch (birdData.habitat) {
        case 'water':
          // Bobbing animation
          bird.position.y += Math.sin(time * 0.8 + index) * 0.003;
          break;
        case 'sky':
          // Floating animation
          bird.position.y += Math.sin(time * 0.3 + index) * 0.004;
          bird.position.x += Math.cos(time * 0.2 + index) * 0.002;
          break;
        case 'tree':
          // Gentle perching movement
          bird.position.y += Math.sin(time * 1.2 + index) * 0.001;
          break;
        case 'treeHigh':
          // Woodpeckers - keep them stationary
          break;
        case 'garden':
          // Hummingbirds - keep them stationary
          break;
        case 'ground':
          // Pecking motion
          bird.position.y += Math.abs(Math.sin(time * 2 + index)) * 0.002;
          break;
      }
    });
  };
  
  export const highlightBird = (birdGroup, isHighlighted = true) => {
    const emissiveColor = isHighlighted ? 0x444444 : 0x000000;
    const scale = isHighlighted ? 1.3 : 1;
    
    birdGroup.allParts.forEach(part => {
      part.material.emissive.setHex(emissiveColor);
    });
    birdGroup.scale.setScalar(scale);
  };
  
  export const resetAllBirds = (birdMeshes) => {
    birdMeshes.forEach(birdGroup => {
      highlightBird(birdGroup, false);
    });
  };