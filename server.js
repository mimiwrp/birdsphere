import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { birdFamilies, getBirdById, getAllBirds } from './src/data/birds.js';

// Define GraphQL schema as string
const typeDefs = `
  enum BirdSize {
    TINY
    SMALL
    MEDIUM
    LARGE
  }

  type Bird {
    id: ID!
    name: String!
    scientificName: String!
    size: BirdSize!
    wingspan: String!
    habitat: [String!]!
    description: String!
    imageUrl: String!
    audioUrl: String!
    isEndangered: Boolean!
    funFact: String!
    family: BirdFamily!
  }

  type BirdFamily {
    id: ID!
    name: String!
    color: String!
    description: String!
    birds: [Bird!]!
  }

  type Query {
    birdFamilies: [BirdFamily!]!
    birdFamily(id: ID!): BirdFamily
    bird(id: ID!): Bird
    allBirds: [Bird!]!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    birdFamilies: () => birdFamilies,
    birdFamily: (_, { id }) => birdFamilies.find(family => family.id === id),
    bird: (_, { id }) => getBirdById(id),
    allBirds: () => getAllBirds(),
  },
  Bird: {
    family: (bird) => {
      return birdFamilies.find(family => 
        family.birds.some(b => b.id === bird.id)
      );
    }
  }
};

async function startServer() {
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4000;
  
  app.listen(PORT, () => {
    console.log(`🦅 Bird GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📊 Open GraphQL Playground at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(error => {
  console.error('❌ Error starting server:', error);
});