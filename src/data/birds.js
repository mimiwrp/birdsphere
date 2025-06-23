export const birdFamilies = [
  {
    id: "raptors",
    name: "Raptors",
    color: "#e74c3c",
    description: "Birds of prey with sharp talons and keen eyesight",
    birds: [
      {
        id: "red-tailed-hawk",
        name: "Red-tailed Hawk",
        scientificName: "Buteo jamaicensis",
        size: "LARGE",
        wingspan: "114-133 cm",
        habitat: ["Forest", "Desert", "Urban"],
        description: "A large hawk with broad wings and a distinctive rust-colored tail. Found across North America.",
        imageUrl: "/images/birds/red-tailed-hawk.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1015.mp3",
        isEndangered: false,
        funFact: "Can spot a mouse from 100 feet away!"
      },
      {
        id: "bald-eagle",
        name: "Bald Eagle",
        scientificName: "Haliaeetus leucocephalus",
        size: "LARGE",
        wingspan: "180-230 cm",
        habitat: ["Wetland", "Coast"],
        description: "America's national bird, known for its white head and tail feathers. Impressive wingspan up to 8 feet.",
        imageUrl: "/images/birds/bald-eagle.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1016.mp3",
        isEndangered: false,
        funFact: "Can live up to 30 years in the wild!"
      },
      {
        id: "peregrine-falcon",
        name: "Peregrine Falcon",
        scientificName: "Falco peregrinus",
        size: "MEDIUM",
        wingspan: "74-120 cm",
        habitat: ["Urban", "Cliff", "Coast"],
        description: "The fastest bird in the world, reaching speeds over 240 mph in hunting dives.",
        imageUrl: "/images/birds/peregrine-falcon.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1017.mp3",
        isEndangered: false,
        funFact: "Fastest animal on Earth when diving!"
      }
    ]
  },
  {
    id: "songbirds",
    name: "Songbirds",
    color: "#f39c12",
    description: "Melodious birds known for their beautiful songs",
    birds: [
      {
        id: "american-robin",
        name: "American Robin",
        scientificName: "Turdus migratorius",
        size: "SMALL",
        wingspan: "31-40 cm",
        habitat: ["Urban", "Forest", "Garden"],
        description: "A common songbird with a bright red breast. Often seen hopping on lawns looking for worms.",
        imageUrl: "/images/birds/american-robin.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1018.mp3",
        isEndangered: false,
        funFact: "First bird to sing in the morning!"
      },
      {
        id: "northern-cardinal",
        name: "Northern Cardinal",
        scientificName: "Cardinalis cardinalis",
        size: "SMALL",
        wingspan: "25-31 cm",
        habitat: ["Forest", "Garden", "Urban"],
        description: "Brilliant red male cardinals are a favorite backyard bird. Non-migratory species.",
        imageUrl: "/images/birds/northern-cardinal.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1019.mp3",
        isEndangered: false,
        funFact: "Both males and females sing year-round!"
      },
      {
        id: "blue-jay",
        name: "Blue Jay",
        scientificName: "Cyanocitta cristata",
        size: "MEDIUM",
        wingspan: "34-43 cm",
        habitat: ["Forest", "Urban", "Garden"],
        description: "Intelligent and noisy, blue jays are known for their bright blue coloring and loud calls.",
        imageUrl: "/images/birds/blue-jay.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1020.mp3",
        isEndangered: false,
        funFact: "Can mimic the calls of hawks to scare other birds!"
      },
      {
        id: "house-sparrow",
        name: "House Sparrow",
        scientificName: "Passer domesticus",
        size: "TINY",
        wingspan: "19-25 cm",
        habitat: ["Urban", "Garden", "Farm"],
        description: "Small, social birds that live closely with humans in cities and towns worldwide.",
        imageUrl: "/images/birds/house-sparrow.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1021.mp3",
        isEndangered: false,
        funFact: "One of the most widespread bird species!"
      }
    ]
  },
  {
    id: "waterfowl",
    name: "Waterfowl",
    color: "#3498db",
    description: "Swimming birds adapted for life on water",
    birds: [
      {
        id: "mallard-duck",
        name: "Mallard Duck",
        scientificName: "Anas platyrhynchos",
        size: "MEDIUM",
        wingspan: "81-98 cm",
        habitat: ["Wetland", "Lake", "River"],
        description: "The most common duck species, males have distinctive green heads. Found in wetlands worldwide.",
        imageUrl: "/images/birds/mallard-duck.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1022.mp3",
        isEndangered: false,
        funFact: "Ancestor of most domestic ducks!"
      },
      {
        id: "canada-goose",
        name: "Canada Goose",
        scientificName: "Branta canadensis",
        size: "LARGE",
        wingspan: "127-185 cm",
        habitat: ["Wetland", "Lake", "Urban"],
        description: "Large geese with distinctive black heads and white chinstrap. Known for V-formation migration.",
        imageUrl: "/images/birds/canada-goose.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1023.mp3",
        isEndangered: false,
        funFact: "Can fly over 1,000 miles in a single day!"
      },
      {
        id: "wood-duck",
        name: "Wood Duck",
        scientificName: "Aix sponsa",
        size: "SMALL",
        wingspan: "66-73 cm",
        habitat: ["Wetland", "Forest", "Swamp"],
        description: "Stunningly beautiful ducks that nest in tree cavities near water.",
        imageUrl: "/images/birds/wood-duck.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1024.mp3",
        isEndangered: false,
        funFact: "Ducklings jump from nest 50 feet high!"
      }
    ]
  },
  {
    id: "hummingbirds",
    name: "Hummingbirds",
    color: "#9b59b6",
    description: "Tiny, fast-flying birds that can hover in place",
    birds: [
      {
        id: "ruby-throated-hummingbird",
        name: "Ruby-throated Hummingbird",
        scientificName: "Archilochus colubris",
        size: "TINY",
        wingspan: "8-11 cm",
        habitat: ["Garden", "Forest", "Urban"],
        description: "The only hummingbird species in eastern North America. Can beat wings 80 times per second.",
        imageUrl: "/images/birds/ruby-throated-hummingbird.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1025.mp3",
        isEndangered: false,
        funFact: "Heart beats 1,260 times per minute!"
      },
      {
        id: "annas-hummingbird",
        name: "Anna's Hummingbird",
        scientificName: "Calypte anna",
        size: "TINY",
        wingspan: "12 cm",
        habitat: ["Garden", "Urban", "Coast"],
        description: "Year-round resident of the Pacific Coast. Males have brilliant rose-red heads.",
        imageUrl: "/images/birds/annas-hummingbird.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1026.mp3",
        isEndangered: false,
        funFact: "Can fly backwards and upside down!"
      }
    ]
  },
  {
    id: "woodpeckers",
    name: "Woodpeckers",
    color: "#2ecc71",
    description: "Tree-climbing birds that excavate insects from bark",
    birds: [
      {
        id: "downy-woodpecker",
        name: "Downy Woodpecker",
        scientificName: "Picoides pubescens",
        size: "SMALL",
        wingspan: "25-31 cm",
        habitat: ["Forest", "Urban", "Garden"],
        description: "The smallest North American woodpecker. Common at backyard feeders.",
        imageUrl: "/images/birds/downy-woodpecker.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1027.mp3",
        isEndangered: false,
        funFact: "Tongue extends 2 inches past its beak!"
      },
      {
        id: "pileated-woodpecker",
        name: "Pileated Woodpecker",
        scientificName: "Dryocopus pileatus",
        size: "LARGE",
        wingspan: "66-75 cm",
        habitat: ["Forest", "Swamp"],
        description: "Largest woodpecker in North America. Creates rectangular holes in dead trees.",
        imageUrl: "/images/birds/pileated-woodpecker.jpg",
        audioUrl: "https://www.soundjay.com/misc/sounds-1028.mp3",
        isEndangered: false,
        funFact: "Inspired the Woody Woodpecker cartoon!"
      }
    ]
  }
];

export const getBirdById = (id) => {
  for (const family of birdFamilies) {
    const bird = family.birds.find(b => b.id === id);
    if (bird) return { ...bird, family: family.name, familyColor: family.color };
  }
  return null;
};

export const getAllBirds = () => {
  return birdFamilies.flatMap(family => 
    family.birds.map(bird => ({ 
      ...bird, 
      family: family.name, 
      familyColor: family.color 
    }))
  );
};