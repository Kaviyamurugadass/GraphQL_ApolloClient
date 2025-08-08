import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import React, { Suspense } from 'react';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(), //cache: Apollo stores data locally to avoid refetching
   defaultOptions: {
    watchQuery: {
      suspense: true,
    },
  },

});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <ErrorBoundary>
    <Suspense fallback={<p>Loading countries...</p>}>
      <App />
    </Suspense>
    </ErrorBoundary>
  </ApolloProvider>
); // This wraps your whole app inside ApolloProvider so all components can use GraphQL.


// ApolloClient: creates a client to talk to the GraphQL API.

// InMemoryCache: stores responses in memory so we don't fetch again.

// ApolloProvider: like context, it lets the whole app use Apollo.

// createRoot: React 18 way of rendering your app.