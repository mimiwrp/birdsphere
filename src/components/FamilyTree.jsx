// components/FamilyTree.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { getAllBirdsWithEnvironments, debugEnvironmentSetup } from '../utils/birdHabitatClassifier.js';

// Import utility modules
import { createBirdMesh } from '../utils/BirdMeshCreator.js';
import { 
  createWaterEnvironment,
  createTreeEnvironment,
  createTallTreeEnvironment,
  createGardenEnvironment
} from '../utils/EnvironmentCreators.js';
import { 
  createScene, 
  createCamera, 
  createRenderer, 
  setupLighting, 
  handleResize 
} from '../utils/ThreeSceneSetup.js';
import { animateBirds } from '../utils/BirdAnimationController.js';
import { MouseInteractionHandler } from '../utils/MouseInteractionHandler.js';

const FamilyTree = ({ birdFamilies, onBirdClick, selectedBird }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const birdMeshesRef = useRef([]);
  const environmentGroupRef = useRef(null);
  const mouseHandlerRef = useRef(null);
  const animationIdRef = useRef(null);
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

    // Initialize Three.js components
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    
    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Append to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Setup lighting
    setupLighting(scene);

    // Create main environment group
    const environmentGroup = new THREE.Group();
    environmentGroupRef.current = environmentGroup;

    // Get environment data
    const { environments, allBirds } = getAllBirdsWithEnvironments(birdFamilies);

    // Create environment zones (only enabled ones)
    createWaterEnvironment(environmentGroup, environments.water);
    createTreeEnvironment(environmentGroup, environments.tree);
    createTallTreeEnvironment(environmentGroup, environments.treeHigh);
    createGardenEnvironment(environmentGroup, environments.garden);

    // Create birds for all environments
    const birdMeshes = [];
    allBirds.forEach(birdData => {
      const birdMesh = createBirdMesh(birdData);
      environmentGroup.add(birdMesh);
      birdMeshes.push(birdMesh);
    });

    birdMeshesRef.current = birdMeshes;
    scene.add(environmentGroup);

    // Setup mouse interaction
    const mouseHandler = new MouseInteractionHandler(
      camera, 
      renderer, 
      environmentGroup, 
      birdMeshes, 
      onBirdClick
    );
    mouseHandlerRef.current = mouseHandler;
    mouseHandler.addEventListeners();

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Animate birds
      const time = Date.now() * 0.001;
      animateBirds(birdMeshes, time);
      
      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Cleanup function
    return () => {
      // Cancel animation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Remove event listeners
      if (mouseHandlerRef.current) {
        mouseHandlerRef.current.removeEventListeners();
      }
      
      // Clean up DOM
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      renderer.dispose();
    };
  }, [birdFamilies]);

  // Handle window resize
  useEffect(() => {
    const handleWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        handleResize(cameraRef.current, rendererRef.current);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
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

export default FamilyTree;