import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { getAllBirdsWithEnvironments, debugEnvironmentSetup } from '../utils/birdHabitatClassifier.js';

const FamilyTree = ({ birdFamilies, onBirdClick, selectedBird }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const birdMeshesRef = useRef([]);
  const environmentGroupRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!birdFamilies || birdFamilies.length === 0) return;

    // TEST THE CLASSIFIER (Remove this later)
    console.log('🧪 Testing Bird Habitat Classifier...');
    debugEnvironmentSetup(birdFamilies);

    // Clear any existing content
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Append to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Enhanced Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(15, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);

    // Create main environment group
    const environmentGroup = new THREE.Group();
    environmentGroupRef.current = environmentGroup;

    // Get environment data
    const { environments, allBirds } = getAllBirdsWithEnvironments(birdFamilies);

    // Create environment zones
    createWaterEnvironment(environmentGroup, environments.water);
    // createSkyEnvironment(environmentGroup, environments.sky);
    createTreeEnvironment(environmentGroup, environments.tree);
    createTallTreeEnvironment(environmentGroup, environments.treeHigh);
    createGardenEnvironment(environmentGroup, environments.garden);
    // createGroundEnvironment(environmentGroup, environments.ground);

    // Create birds for all environments
    const birdMeshes = [];
    allBirds.forEach(birdData => {
      const birdMesh = createBirdMesh(birdData);
      environmentGroup.add(birdMesh);
      birdMeshes.push(birdMesh);
    });

    birdMeshesRef.current = birdMeshes;
    scene.add(environmentGroup);

    // Updated camera position to see all environments
    camera.position.set(20, 15, 25);
    camera.lookAt(0, 5, 0);

    // Mouse controls
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    const handleMouseDown = (event) => {
      mouseDown = true;
      isDragging = false;
      mouseX = event.clientX;
      mouseY = event.clientY;
      dragStart = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = (event) => {
      mouseDown = false;
      
      const dragDistance = Math.sqrt(
        Math.pow(event.clientX - dragStart.x, 2) + 
        Math.pow(event.clientY - dragStart.y, 2)
      );
      
      if (dragDistance < 5) {
        isDragging = false;
        setTimeout(() => handleClick(event), 10);
      } else {
        isDragging = true;
      }
    };

    const handleMouseMove = (event) => {
      if (!mouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      const dragDistance = Math.sqrt(
        Math.pow(event.clientX - dragStart.x, 2) + 
        Math.pow(event.clientY - dragStart.y, 2)
      );
      
      if (dragDistance > 5) {
        isDragging = true;
      }
      
      if (environmentGroup) {
        environmentGroup.rotation.y += deltaX * 0.01;
        environmentGroup.rotation.x -= deltaY * 0.005;
        
        // Limit vertical rotation
        environmentGroup.rotation.x = Math.max(-0.5, Math.min(0.5, environmentGroup.rotation.x));
      }
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleWheel = (event) => {
      camera.position.z += event.deltaY * 0.02;
      camera.position.z = Math.max(10, Math.min(40, camera.position.z));
    };

    // Click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event) => {
      if (isDragging) return;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(birdMeshes);

      if (intersects.length > 0) {
        const clickedBird = intersects[0].object;
        
        // Reset all birds first
        birdMeshes.forEach(mesh => {
          mesh.material.emissive.setHex(0x000000);
          mesh.scale.setScalar(1);
        });
        
        // Highlight clicked bird
        clickedBird.material.emissive.setHex(0x444444);
        clickedBird.scale.setScalar(1.3);
        
        setTimeout(() => {
          if (onBirdClick) {
            onBirdClick(clickedBird.userData);
          }
        }, 50);
      } else {
        // Reset all birds
        birdMeshes.forEach(mesh => {
          mesh.material.emissive.setHex(0x000000);
          mesh.scale.setScalar(1);
        });
      }
    };

    // Add event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Environment-specific animations
      const time = Date.now() * 0.001;
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
            // Drumming/pecking animation for woodpeckers
            // bird.position.x += Math.sin(time * 8 + index) * 0.05;
            // bird.position.y += Math.abs(Math.sin(time * 6 + index)) * 0.02;
            break;
          case 'garden':
            // Hovering animation for hummingbirds
            // bird.position.x += Math.sin(time * 4 + index) * 0.08;
            // bird.position.y += Math.cos(time * 5 + index) * 0.06;
            // bird.position.z += Math.sin(time * 3 + index) * 0.05;
            break;
          case 'ground':
            // Pecking motion
            bird.position.y += Math.abs(Math.sin(time * 2 + index)) * 0.002;
            break;
        }
      });
      
      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('wheel', handleWheel);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [birdFamilies]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#87CEEB',
          fontSize: '20px',
          zIndex: 10
        }}>
          🌍 Creating bird environments...
        </div>
      )}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

// Environment creation functions
const createWaterEnvironment = (parent, waterData) => {
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

const createSkyEnvironment = (parent, skyData) => {
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

const createTreeEnvironment = (parent, treeData) => {
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
    transparent: true,
    opacity: 0.8
  });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.set(treeData.position.x, treeData.position.y + 4, treeData.position.z);
  foliage.castShadow = true;
  parent.add(foliage);
};

const createTallTreeEnvironment = (parent, treeData) => {
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
    transparent: true,
    opacity: 0.8
  });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.set(treeData.position.x, treeData.position.y + 8, treeData.position.z);
  foliage.castShadow = true;
  parent.add(foliage);
};

const createGardenEnvironment = (parent, gardenData) => {
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

const createGroundEnvironment = (parent, groundData) => {
  // Ground patch
  const groundGeometry = new THREE.CylinderGeometry(4, 4, 0.2);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x8B7355 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.set(groundData.position.x, groundData.position.y, groundData.position.z);
  ground.receiveShadow = true;
  parent.add(ground);
};

const createBirdMesh = (birdData) => {
  const sizeMap = { 
    TINY: 0.3, 
    SMALL: 0.5, 
    MEDIUM: 0.8, 
    LARGE: 1.1 
  };
  const size = sizeMap[birdData.size] || 0.5;
  
  const birdGeometry = new THREE.SphereGeometry(size, 16, 16);
  const birdMaterial = new THREE.MeshPhongMaterial({ 
    color: birdData.environmentColor,
    shininess: 60,
    transparent: true,
    opacity: 0.9
  });
  
  const birdMesh = new THREE.Mesh(birdGeometry, birdMaterial);
  birdMesh.position.copy(birdData.position);
  birdMesh.castShadow = true;
  birdMesh.receiveShadow = true;
  birdMesh.userData = birdData;
  
  return birdMesh;
};

export default FamilyTree;