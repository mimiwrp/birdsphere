// utils/EnvironmentCreators.js
import * as THREE from 'three';

export const createWaterEnvironment = (parent, waterData) => {
  // Water base
  const waterGeometry = new THREE.CylinderGeometry(4, 4, 0.2);
  const waterMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x006994,
    transparent: true,
    opacity: 0.7,
    shininess: 100
  });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.position.set(waterData.position.x, waterData.position.y, waterData.position.z);
  water.receiveShadow = true;
  parent.add(water);
};

export const createSkyEnvironment = (parent, skyData) => {
  // Cloud platform
  const cloudGeometry = new THREE.BoxGeometry(6, 1, 4);
  const cloudMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xF0F8FF,
    transparent: true,
    opacity: 0.6
  });
  const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
  cloud.position.set(skyData.position.x, skyData.position.y, skyData.position.z);
  cloud.castShadow = true;
  parent.add(cloud);
};

export const createTreeEnvironment = (parent, treeData) => {
  // Simplified tree trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 6);
  const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(treeData.position.x, treeData.position.y, treeData.position.z);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  parent.add(trunk);

  // Tree foliage
  const foliageGeometry = new THREE.SphereGeometry(3, 12, 8);
  const foliageMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x228B22,
    transparent: false,
    opacity: 0.8
  });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.set(treeData.position.x, treeData.position.y + 4, treeData.position.z);
  foliage.castShadow = true;
  parent.add(foliage);
};

export const createTallTreeEnvironment = (parent, treeData) => {
  // Tall tree trunk for woodpeckers
  const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.6, 10);
  const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(treeData.position.x, treeData.position.y + 2, treeData.position.z);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  parent.add(trunk);

  // Taller tree crown
  const foliageGeometry = new THREE.SphereGeometry(2.5, 12, 8);
  const foliageMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x2F5233,
    transparent: false,
    opacity: 0.8
  });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.set(treeData.position.x, treeData.position.y + 8, treeData.position.z);
  foliage.castShadow = true;
  parent.add(foliage);
};

export const createGardenEnvironment = (parent, gardenData) => {
  // Garden base
  const gardenGeometry = new THREE.CylinderGeometry(3, 3, 0.3);
  const gardenMaterial = new THREE.MeshPhongMaterial({ color: 0x90EE90 });
  const garden = new THREE.Mesh(gardenGeometry, gardenMaterial);
  garden.position.set(gardenData.position.x, gardenData.position.y - 0.5, gardenData.position.z);
  garden.receiveShadow = true;
  parent.add(garden);

  // Add colorful "flowers" (small spheres)
  const flowerColors = [0xFF69B4, 0xFF6347, 0xFFD700, 0x9370DB, 0xFF4500];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 1.5 + Math.random() * 1;
    
    const flowerGeometry = new THREE.SphereGeometry(0.15, 8, 6);
    const flowerMaterial = new THREE.MeshPhongMaterial({ 
      color: flowerColors[i % flowerColors.length],
      shininess: 100
    });
    const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
    
    flower.position.set(
      gardenData.position.x + Math.cos(angle) * radius,
      gardenData.position.y + 0.2,
      gardenData.position.z + Math.sin(angle) * radius
    );
    flower.castShadow = true;
    parent.add(flower);
  }
};

export const createGroundEnvironment = (parent, groundData) => {
  // Ground patch
  const groundGeometry = new THREE.CylinderGeometry(4, 4, 0.2);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x8B7355 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.set(groundData.position.x, groundData.position.y, groundData.position.z);
  ground.receiveShadow = true;
  parent.add(ground);
};