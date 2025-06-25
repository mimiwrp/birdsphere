// Bird Habitat Classification System
// This function determines the natural environment for each bird

const getBirdHabitat = (bird, familyName = '') => {
    const birdName = bird.name?.toLowerCase() || '';
    const family = familyName.toLowerCase();
    
    // Woodpeckers - tall trees
    const woodpeckerKeywords = [
      'woodpecker', 'pecker', 'flicker', 'sapsucker', 'downy', 'pileated'
    ];
    
    // Hummingbirds - garden environment
    const hummingbirdKeywords = [
      'hummingbird', 'ruby-throated', 'annas', 'rufous', 'calliope'
    ];
    
    // Water birds - aquatic environments
    const waterKeywords = [
      'duck', 'goose', 'swan', 'pelican', 'cormorant', 'heron', 'egret', 
      'crane', 'stork', 'ibis', 'flamingo', 'loon', 'grebe', 'coot', 
      'moorhen', 'gallinule', 'tern', 'gull', 'seagull', 'albatross',
      'petrel', 'shearwater', 'gannet', 'booby', 'frigatebird', 'anhinga',
      'bittern', 'rail', 'sandpiper', 'plover', 'turnstone', 'avocet',
      'stilt', 'oystercatcher', 'curlew', 'godwit', 'snipe', 'phalarope',
      'mallard', 'canada'
    ];
    
    // Sky birds - raptors and high-flying birds
    const skyKeywords = [
      'eagle', 'hawk', 'falcon', 'kestrel', 'osprey', 'vulture', 'condor',
      'kite', 'harrier', 'goshawk', 'sparrowhawk', 'buzzard', 'swift',
      'swallow', 'martin', 'nighthawk', 'whippoorwill', 'chimney',
      'red-tailed', 'bald', 'peregrine'
    ];
    
    // Ground birds - terrestrial, ground-dwelling
    const groundKeywords = [
      'quail', 'pheasant', 'grouse', 'ptarmigan', 'prairie', 'chicken',
      'turkey', 'roadrunner', 'killdeer', 'pipit', 'lark', 'bunting',
      'towhee', 'dove', 'pigeon', 'partridge', 'francolin', 'guineafowl', 
      'peacock', 'peafowl'
    ];
    
    // Check for woodpeckers first
    for (const keyword of woodpeckerKeywords) {
      if (birdName.includes(keyword) || family.includes(keyword)) {
        return 'treeHigh';
      }
    }
    
    // Check for hummingbirds
    for (const keyword of hummingbirdKeywords) {
      if (birdName.includes(keyword) || family.includes(keyword)) {
        return 'garden';
      }
    }
    
    // Check bird name against other keywords
    for (const keyword of waterKeywords) {
      if (birdName.includes(keyword) || family.includes(keyword)) {
        return 'water';
      }
    }
    
    for (const keyword of skyKeywords) {
      if (birdName.includes(keyword) || family.includes(keyword)) {
        return 'sky';
      }
    }
    
    for (const keyword of groundKeywords) {
      if (birdName.includes(keyword) || family.includes(keyword)) {
        return 'ground';
      }
    }
    
    // Family-based classification fallback
    const woodpeckerFamilies = ['picidae', 'woodpecker'];
    const hummingbirdFamilies = ['trochilidae', 'hummingbird'];
    const waterFamilies = [
      'anatidae', 'pelecanidae', 'ardeidae', 'gruidae', 'phoenicopteridae',
      'gaviidae', 'podicipedidae', 'rallidae', 'laridae', 'procellariidae',
      'sulidae', 'fregatidae', 'scolopacidae', 'charadriidae', 'recurvirostridae',
      'waterfowl'
    ];
    
    const skyFamilies = [
      'accipitridae', 'falconidae', 'cathartidae', 'pandionidae',
      'apodidae', 'hirundinidae', 'caprimulgidae', 'raptors'
    ];
    
    const groundFamilies = [
      'phasianidae', 'odontophoridae', 'meleagrididae', 'cariamidae',
      'alaudidae', 'motacillidae', 'emberizidae', 'columbidae'
    ];
    
    for (const woodpeckerFamily of woodpeckerFamilies) {
      if (family.includes(woodpeckerFamily)) {
        return 'treeHigh';
      }
    }
    
    for (const hummingbirdFamily of hummingbirdFamilies) {
      if (family.includes(hummingbirdFamily)) {
        return 'garden';
      }
    }
    
    for (const waterFamily of waterFamilies) {
      if (family.includes(waterFamily)) {
        return 'water';
      }
    }
    
    for (const skyFamily of skyFamilies) {
      if (family.includes(skyFamily)) {
        return 'sky';
      }
    }
    
    for (const groundFamily of groundFamilies) {
      if (family.includes(groundFamily)) {
        return 'ground';
      }
    }
    
    // Default to tree for songbirds and unknown birds
    return 'tree';
  };
  
  // Group birds by their natural habitat
  const groupBirdsByHabitat = (birdFamilies) => {
    const environmentGroups = {
      water: { birds: [], color: 0x4A90E2 }, // Blue
      sky: { birds: [], color: 0x87CEEB },   // Sky blue
      tree: { birds: [], color: 0x228B22 }, // Forest green
      ground: { birds: [], color: 0x8B4513 } // Saddle brown
    };
    
    birdFamilies.forEach(family => {
      family.birds.forEach(bird => {
        const habitat = getBirdHabitat(bird, family.name);
        environmentGroups[habitat].birds.push({
          ...bird,
          originalFamily: family.name,
          originalFamilyColor: family.color,
          habitat: habitat
        });
      });
    });
    
    return environmentGroups;
  };
  
  // Test function to see classification results
  const testBirdClassification = (birdFamilies) => {
    console.log('🔍 Bird Habitat Classification Results:');
    console.log('=====================================');
    
    birdFamilies.forEach(family => {
      console.log(`\n📁 Family: ${family.name}`);
      family.birds.forEach(bird => {
        const habitat = getBirdHabitat(bird, family.name);
        const icon = {
          water: '🌊',
          sky: '☁️',
          tree: '🌳',
          ground: '🏔️'
        }[habitat];
        console.log(`  ${icon} ${bird.name} → ${habitat.toUpperCase()}`);
      });
    });
    
    const grouped = groupBirdsByHabitat(birdFamilies);
    console.log('\n📊 Environment Distribution:');
    Object.keys(grouped).forEach(env => {
      console.log(`  ${env.toUpperCase()}: ${grouped[env].birds.length} birds`);
    });
    
    return grouped;
  };
  
  // Environment configuration with positioning and styling
  const environmentConfig = {
    water: {
      name: 'Water Environment',
      color: 0x4A90E2,
      position: { x: -10, y: 0, z: -5 },
      size: { width: 6, height: 1, depth: 6 },
      birdPositions: 'circular',
      animationType: 'bobbing'
    },
    sky: {
      name: 'Sky Environment', 
      color: 0x87CEEB,
      position: { x: 0, y: 10, z: -10 },
      size: { width: 8, height: 2, depth: 4 },
      birdPositions: 'scattered',
      animationType: 'floating'
    },
    tree: {
      name: 'Tree Environment',
      color: 0x228B22,
      position: { x: -2, y: 3, z: 2 },
      size: { width: 6, height: 8, depth: 6 },
      birdPositions: 'branches',
      animationType: 'perching'
    },
    treeHigh: {
      name: 'Tall Tree Environment',
      color: 0x2F5233,
      position: { x: 6, y: 5, z: 0 },
      size: { width: 4, height: 12, depth: 4 },
      birdPositions: 'trunk',
      animationType: 'drumming'
    },
    garden: {
      name: 'Garden Environment',
      color: 0x9B59B6,
      position: { x: 2, y: 1, z: 8 },
      size: { width: 5, height: 3, depth: 5 },
      birdPositions: 'flowers',
      animationType: 'hovering'
    },
    ground: {
      name: 'Ground Environment',
      color: 0x8B4513,
      position: { x: -8, y: -1, z: 8 },
      size: { width: 6, height: 1, depth: 6 },
      birdPositions: 'scattered',
      animationType: 'pecking'
    }
  };
  
  // Enhanced grouping function with positioning data
  const createEnvironmentData = (birdFamilies) => {
    const environments = {};
    
    // Initialize environments
    Object.keys(environmentConfig).forEach(envKey => {
      environments[envKey] = {
        ...environmentConfig[envKey],
        birds: [],
        birdCount: 0
      };
    });
    
    // Distribute birds to environments
    birdFamilies.forEach(family => {
      family.birds.forEach(bird => {
        const habitat = getBirdHabitat(bird, family.name);
        
        environments[habitat].birds.push({
          ...bird,
          originalFamily: family.name,
          originalFamilyColor: family.color,
          habitat: habitat,
          environmentColor: environments[habitat].color
        });
        
        environments[habitat].birdCount++;
      });
    });
    
    return environments;
  };
  
  // Calculate bird positions within each environment
  const calculateBirdPositions = (environment, birds) => {
    const { position, size, birdPositions } = environment;
    const positions = [];
    
    switch (birdPositions) {
      case 'circular':
        birds.forEach((bird, index) => {
          const angle = (index / birds.length) * Math.PI * 2;
          const radius = size.width / 3;
          positions.push({
            x: position.x + Math.cos(angle) * radius,
            y: position.y + 0.5,
            z: position.z + Math.sin(angle) * radius
          });
        });
        break;
        
      case 'scattered':
        birds.forEach((bird, index) => {
          positions.push({
            x: position.x + (Math.random() - 0.5) * size.width,
            y: position.y + Math.random() * size.height,
            z: position.z + (Math.random() - 0.5) * size.depth
          });
        });
        break;
        
      case 'grid':
        const cols = Math.ceil(Math.sqrt(birds.length));
        birds.forEach((bird, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          positions.push({
            x: position.x + (col - cols/2) * (size.width / cols),
            y: position.y + 0.5,
            z: position.z + (row - cols/2) * (size.depth / cols)
          });
        });
        break;
        
      case 'branches':
        // For tree environment - keep existing branch logic
        birds.forEach((bird, index) => {
          const angle = (index / birds.length) * Math.PI * 2;
          const radius = 2.5;
          const height = 2 + (index % 3) * 1.5;
          positions.push({
            x: position.x + Math.cos(angle) * radius,
            y: position.y + height,
            z: position.z + Math.sin(angle) * radius
          });
        });
        break;
  
      case 'trunk':
        // For woodpeckers on tall tree trunk
        birds.forEach((bird, index) => {
          const angle = (index / birds.length) * Math.PI * 2;
          const radius = 1.2; // Close to trunk
          const height = 3 + index * 2; // Vertical spacing along trunk
          positions.push({
            x: position.x + Math.cos(angle) * radius,
            y: position.y + height,
            z: position.z + Math.sin(angle) * radius
          });
        });
        break;
  
      case 'flowers':
        // For hummingbirds around flowers
        birds.forEach((bird, index) => {
          const angle = (index / birds.length) * Math.PI * 2;
          const radius = 1.5 + Math.random() * 1;
          const height = 0.5 + Math.random() * 2;
          positions.push({
            x: position.x + Math.cos(angle) * radius,
            y: position.y + height,
            z: position.z + Math.sin(angle) * radius
          });
        });
        break;
        
      default:
        // Linear positioning
        birds.forEach((bird, index) => {
          positions.push({
            x: position.x + (index - birds.length/2) * 1.5,
            y: position.y + 1,
            z: position.z
          });
        });
    }
    
    return positions;
  };
  
  // Material configurations for each environment
  const environmentMaterials = {
    water: {
      base: {
        color: 0x006994,
        transparent: true,
        opacity: 0.7,
        shininess: 100
      },
      surface: {
        color: 0x4A90E2,
        transparent: true,
        opacity: 0.8,
        shininess: 150
      }
    },
    sky: {
      platform: {
        color: 0xF0F8FF,
        transparent: true,
        opacity: 0.6
      },
      birds: {
        emissive: 0x222244,
        shininess: 30
      }
    },
    tree: {
      trunk: {
        color: 0x8B4513,
        shininess: 10
      },
      branches: {
        color: 0x654321,
        shininess: 5
      },
      foliage: {
        color: 0x228B22,
        transparent: true,
        opacity: 0.8
      }
    },
    ground: {
      terrain: {
        color: 0x8B7355,
        shininess: 1
      },
      grass: {
        color: 0x556B2F,
        shininess: 5
      }
    }
  };
  
  // Animation configurations
  const animationSettings = {
    water: {
      bobbing: {
        amplitude: 0.3,
        frequency: 0.8,
        phase: 0
      }
    },
    sky: {
      floating: {
        amplitude: 0.5,
        frequency: 0.3,
        drift: 0.1
      }
    },
    tree: {
      perching: {
        amplitude: 0.1,
        frequency: 1.2,
        sway: 0.05
      }
    },
    ground: {
      pecking: {
        amplitude: 0.2,
        frequency: 2.0,
        randomness: 0.8
      }
    }
  };
  
  // Lighting setup for different environments
  const environmentLighting = {
    water: {
      ambient: { color: 0x404080, intensity: 0.4 },
      directional: { color: 0x87CEEB, intensity: 0.8, position: [5, 8, 3] }
    },
    sky: {
      ambient: { color: 0x606080, intensity: 0.6 },
      directional: { color: 0xFFFFFF, intensity: 1.0, position: [0, 10, 0] }
    },
    tree: {
      ambient: { color: 0x404040, intensity: 0.5 },
      directional: { color: 0xFFF8DC, intensity: 0.7, position: [3, 8, 5] }
    },
    ground: {
      ambient: { color: 0x403020, intensity: 0.4 },
      directional: { color: 0xFFE4B5, intensity: 0.6, position: [8, 6, 4] }
    }
  };
  
  // Utility function to get all birds with their environment data
  const getAllBirdsWithEnvironments = (birdFamilies) => {
    const environments = createEnvironmentData(birdFamilies);
    const allBirds = [];
    
    Object.keys(environments).forEach(envKey => {
      const env = environments[envKey];
      const positions = calculateBirdPositions(env, env.birds);
      
      env.birds.forEach((bird, index) => {
        allBirds.push({
          ...bird,
          position: positions[index],
          environment: envKey,
          environmentData: env,
          materials: environmentMaterials[envKey],
          animation: animationSettings[envKey]
        });
      });
    });
    
    return { environments, allBirds };
  };
  
  // Debug function to log environment setup
  const debugEnvironmentSetup = (birdFamilies) => {
    const { environments, allBirds } = getAllBirdsWithEnvironments(birdFamilies);
    
    console.log('🏗️  Environment Setup Debug:');
    console.log('==============================');
    
    Object.keys(environments).forEach(envKey => {
      const env = environments[envKey];
      console.log(`\n🌍 ${env.name}:`);
      console.log(`  📍 Position: (${env.position.x}, ${env.position.y}, ${env.position.z})`);
      console.log(`  📏 Size: ${env.size.width}×${env.size.height}×${env.size.depth}`);
      console.log(`  🐦 Birds: ${env.birdCount}`);
      console.log(`  🎯 Layout: ${env.birdPositions}`);
      console.log(`  ✨ Animation: ${env.animationType}`);
    });
    
    console.log(`\n📊 Total Birds: ${allBirds.length}`);
    
    return { environments, allBirds };
  };
  
  export { 
    getBirdHabitat, 
    groupBirdsByHabitat, 
    testBirdClassification,
    environmentConfig,
    createEnvironmentData,
    calculateBirdPositions,
    environmentMaterials,
    animationSettings,
    environmentLighting,
    getAllBirdsWithEnvironments,
    debugEnvironmentSetup
  };