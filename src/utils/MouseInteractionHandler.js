// utils/MouseInteractionHandler.js
import * as THREE from 'three';
import { highlightBird, resetAllBirds } from './BirdAnimationController.js';

export class MouseInteractionHandler {
  constructor(camera, renderer, environmentGroup, birdMeshes, onBirdClick) {
    this.camera = camera;
    this.renderer = renderer;
    this.environmentGroup = environmentGroup;
    this.birdMeshes = birdMeshes;
    this.onBirdClick = onBirdClick;
    
    // Mouse state
    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    
    // Raycaster for click detection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Bind methods
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseDown(event) {
    this.mouseDown = true;
    this.isDragging = false;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.dragStart = { x: event.clientX, y: event.clientY };
  }

  handleMouseUp(event) {
    this.mouseDown = false;
    
    const dragDistance = Math.sqrt(
      Math.pow(event.clientX - this.dragStart.x, 2) + 
      Math.pow(event.clientY - this.dragStart.y, 2)
    );
    
    if (dragDistance < 5) {
      this.isDragging = false;
      setTimeout(() => this.handleClick(event), 10);
    } else {
      this.isDragging = true;
    }
  }

  handleMouseMove(event) {
    if (!this.mouseDown) return;
    
    const deltaX = event.clientX - this.mouseX;
    const deltaY = event.clientY - this.mouseY;
    
    const dragDistance = Math.sqrt(
      Math.pow(event.clientX - this.dragStart.x, 2) + 
      Math.pow(event.clientY - this.dragStart.y, 2)
    );
    
    if (dragDistance > 5) {
      this.isDragging = true;
    }
    
    if (this.environmentGroup) {
      this.environmentGroup.rotation.y += deltaX * 0.01;
      this.environmentGroup.rotation.x -= deltaY * 0.005;
      
      // Limit vertical rotation
      this.environmentGroup.rotation.x = Math.max(-0.5, Math.min(0.5, this.environmentGroup.rotation.x));
    }
    
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  handleWheel(event) {
    this.camera.position.z += event.deltaY * 0.02;
    this.camera.position.z = Math.max(10, Math.min(40, this.camera.position.z));
  }

  handleClick(event) {
    if (this.isDragging) return;
    
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Create array of all clickable objects (all parts of all birds)
    const clickableObjects = [];
    this.birdMeshes.forEach(birdGroup => {
      birdGroup.allParts.forEach(part => {
        clickableObjects.push(part);
      });
    });
    
    const intersects = this.raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
      // Find which bird group this part belongs to
      const clickedPart = intersects[0].object;
      const clickedBird = this.birdMeshes.find(birdGroup => 
        birdGroup.allParts.includes(clickedPart)
      );
      
      if (clickedBird) {
        // Reset all birds first
        resetAllBirds(this.birdMeshes);
        
        // Highlight clicked bird
        highlightBird(clickedBird, true);
        
        setTimeout(() => {
          if (this.onBirdClick) {
            this.onBirdClick(clickedBird.userData);
          }
        }, 50);
      }
    } else {
      // Reset all birds
      resetAllBirds(this.birdMeshes);
    }
  }

  addEventListeners() {
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousedown', this.handleMouseDown);
    canvas.addEventListener('mouseup', this.handleMouseUp);
    canvas.addEventListener('mousemove', this.handleMouseMove);
    canvas.addEventListener('wheel', this.handleWheel);
  }

  removeEventListeners() {
    const canvas = this.renderer.domElement;
    canvas.removeEventListener('mousedown', this.handleMouseDown);
    canvas.removeEventListener('mouseup', this.handleMouseUp);
    canvas.removeEventListener('mousemove', this.handleMouseMove);
    canvas.removeEventListener('wheel', this.handleWheel);
  }
}