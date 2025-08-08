import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/', // your Apollo Server
  cache: new InMemoryCache(),
  name: 'refeching client',
  version: '1.0',
});

export default client;