import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Function to fetch GraphQL queries
async function fetchQuery(operation, variables) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

// Create Relay environment
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;