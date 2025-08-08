import { ApolloClient,InMemoryCache,HttpLink,split} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link for queries & mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql', // 👈 Your Apollo Server URL
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql', // 👈 Use ws:// not wss:// for local dev
  })
);

// Use split to send data to correct link
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
