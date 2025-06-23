import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const FamilyTree = ({ birdFamilies, onBirdClick }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const birdMeshesRef = useRef([]);
  const treeGroupRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!birdFamilies || birdFamilies.length === 0) return;
    
    console.log('Creating 3D scene...'); // Debug log

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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create tree group
    const treeGroup = new THREE.Group();
    treeGroupRef.current = treeGroup;

    // Create trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.6, 10);
    const trunkMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      roughness: 0.8
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = -2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroup.add(trunk);

    // Create branches and birds
    const birdMeshes = [];
    
    birdFamilies.forEach((family, familyIndex) => {
      const angle = (familyIndex / birdFamilies.length) * Math.PI * 2;
      
      // Create main branch
      const branchGeometry = new THREE.CylinderGeometry(0.15, 0.25, 5);
      const branchMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
      const branch = new THREE.Mesh(branchGeometry, branchMaterial);
      
      // Position branch
      const branchRadius = 4;
      branch.position.x = Math.cos(angle) * branchRadius;
      branch.position.y = 3 + familyIndex * 0.8;
      branch.position.z = Math.sin(angle) * branchRadius;
      
      // Rotate branch to point outward
      branch.rotation.z = angle;
      branch.rotation.x = Math.PI / 2;
      
      branch.castShadow = true;
      branch.receiveShadow = true;
      treeGroup.add(branch);

      // Add birds to this branch
      family.birds.forEach((bird, birdIndex) => {
        const sizeMap = { 
          TINY: 0.4, 
          SMALL: 0.6, 
          MEDIUM: 0.9, 
          LARGE: 1.3 
        };
        const size = sizeMap[bird.size] || 0.6;
        
        // Create bird sphere
        const birdGeometry = new THREE.SphereGeometry(size, 20, 20);
        const birdMaterial = new THREE.MeshPhongMaterial({ 
          color: family.color,
          shininess: 80,
          transparent: true,
          opacity: 0.9
        });
        
        const birdMesh = new THREE.Mesh(birdGeometry, birdMaterial);
        
        // Position birds along the branch
        const branchProgress = (birdIndex + 1) / (family.birds.length + 1);
        const birdDistance = 2 + branchProgress * 3;
        
        birdMesh.position.x = branch.position.x + Math.cos(angle) * birdDistance;
        birdMesh.position.y = branch.position.y + (birdIndex - family.birds.length/2) * 1.2;
        birdMesh.position.z = branch.position.z + Math.sin(angle) * birdDistance;
        
        // Add slight random variation
        birdMesh.position.y += (Math.random() - 0.5) * 0.5;
        birdMesh.position.x += (Math.random() - 0.5) * 0.3;
        birdMesh.position.z += (Math.random() - 0.5) * 0.3;
        
        birdMesh.castShadow = true;
        birdMesh.receiveShadow = true;
        
        // Store bird data
        birdMesh.userData = { 
          ...bird, 
          family: family.name,
          familyColor: family.color,
          familyId: family.id
        };
        
        treeGroup.add(birdMesh);
        birdMeshes.push(birdMesh);
      });
    });

    birdMeshesRef.current = birdMeshes;
    scene.add(treeGroup);

    // Camera position
    camera.position.set(8, 6, 12);
    camera.lookAt(0, 2, 0);

    // Mouse controls
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event) => {
      mouseDown = true;
      isDragging = false;
      mouseX = event.clientX;
      mouseY = event.clientY;
      dragStart = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = (event) => {
      mouseDown = false;
      
      // Check if this was a drag or a click
      const dragDistance = Math.sqrt(
        Math.pow(event.clientX - dragStart.x, 2) + 
        Math.pow(event.clientY - dragStart.y, 2)
      );
      
      // If moved less than 5 pixels, consider it a click
      if (dragDistance < 5) {
        isDragging = false;
        // Let the click handler process this
        setTimeout(() => handleClick(event), 10);
      } else {
        isDragging = true;
      }
    };

    const handleMouseMove = (event) => {
      if (!mouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      // Mark as dragging if moved enough
      const dragDistance = Math.sqrt(
        Math.pow(event.clientX - dragStart.x, 2) + 
        Math.pow(event.clientY - dragStart.y, 2)
      );
      
      if (dragDistance > 5) {
        isDragging = true;
      }
      
      if (treeGroup) {
        treeGroup.rotation.y += deltaX * 0.01;
        treeGroup.rotation.x -= deltaY * 0.005;
        
        // Limit vertical rotation
        treeGroup.rotation.x = Math.max(-0.5, Math.min(0.5, treeGroup.rotation.x));
      }
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleWheel = (event) => {
      camera.position.z += event.deltaY * 0.01;
      camera.position.z = Math.max(8, Math.min(25, camera.position.z));
    };

    // Click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    const handleClick = (event) => {
      // Prevent click during drag
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
        clickedBird.scale.setScalar(1.2);
        
        // Call the click handler with a small delay to ensure state updates
        setTimeout(() => {
          if (onBirdClick) {
            onBirdClick(clickedBird.userData);
          }
        }, 50);
      } else {
        // Clicked empty space - reset all birds
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
      
      // Gentle bird animations
      birdMeshes.forEach((bird, index) => {
        bird.rotation.y += 0.01;
        const time = Date.now() * 0.001;
        bird.position.y += Math.sin(time + index) * 0.002;
      });
      
      // Auto-rotate tree slowly
      if (treeGroup) {
        treeGroup.rotation.y += 0.002;
      }
      
      camera.lookAt(0, 2, 0);
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
  }, [birdFamilies, onBirdClick]);

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
          color: '#2c3e50',
          fontSize: '20px',
          zIndex: 10
        }}>
          🌳 Growing the bird family tree...
        </div>
      )}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default FamilyTree;