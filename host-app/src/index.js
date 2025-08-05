import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache()
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
