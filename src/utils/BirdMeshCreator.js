// utils/BirdMeshCreator.js
import * as THREE from 'three';

export const createBirdMesh = (birdData) => {
  const sizeMap = { 
    TINY: 0.3, 
    SMALL: 0.5, 
    MEDIUM: 0.8, 
    LARGE: 1.1 
  };
  const size = sizeMap[birdData.size] || 0.5;
  
  // Create bird group
  const birdGroup = new THREE.Group();
  
  // Bird body (ellipsoid)
  const bodyGeometry = new THREE.SphereGeometry(size, 16, 16);
  bodyGeometry.scale(1.2, 0.8, 0.6); // Make it more oval
  const birdMaterial = new THREE.MeshPhongMaterial({ 
    color: birdData.familyColor || birdData.environmentColor,
    shininess: 60,
    transparent: true,
    opacity: 0.9
  });
  const body = new THREE.Mesh(bodyGeometry, birdMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  birdGroup.add(body);
  
  // Bird head (smaller sphere)
  const headGeometry = new THREE.SphereGeometry(size * 0.6, 12, 12);
  const head = new THREE.Mesh(headGeometry, birdMaterial);
  head.position.set(size * 0.8, size * 0.3, 0);
  head.castShadow = true;
  head.receiveShadow = true;
  birdGroup.add(head);
  
  // Bird beak (small cone)
  const beakGeometry = new THREE.ConeGeometry(size * 0.1, size * 0.4, 6);
  const beakMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFA500, // Orange beak
    shininess: 80
  });
  const beak = new THREE.Mesh(beakGeometry, beakMaterial);
  beak.position.set(size * 1.2, size * 0.3, 0);
  beak.rotation.z = -Math.PI / 2; // Point forward
  beak.castShadow = true;
  birdGroup.add(beak);
  
  // Wings (flattened spheres)
  const wingGeometry = new THREE.SphereGeometry(size * 0.7, 12, 8);
  wingGeometry.scale(0.3, 0.8, 1.5);
  
  const leftWing = new THREE.Mesh(wingGeometry, birdMaterial);
  leftWing.position.set(-size * 0.2, 0, size * 0.6);
  leftWing.castShadow = true;
  birdGroup.add(leftWing);
  
  const rightWing = new THREE.Mesh(wingGeometry, birdMaterial);
  rightWing.position.set(-size * 0.2, 0, -size * 0.6);
  rightWing.castShadow = true;
  birdGroup.add(rightWing);
  
  // Tail (small flattened sphere)
  const tailGeometry = new THREE.SphereGeometry(size * 0.4, 8, 8);
  tailGeometry.scale(0.2, 0.6, 1.2);
  const tail = new THREE.Mesh(tailGeometry, birdMaterial);
  tail.position.set(-size * 1.1, 0, 0);
  tail.castShadow = true;
  birdGroup.add(tail);
  
  // Position the entire bird group
  birdGroup.position.copy(birdData.position);
  birdGroup.userData = birdData;
  
  // Store reference to parts for highlighting
  birdGroup.allParts = [body, head, leftWing, rightWing, tail];
  
  return birdGroup;
};