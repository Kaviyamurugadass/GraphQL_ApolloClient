// src/App.tsx
import React from "react";
import Characters from "./components/Characters";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Characters />
    </ApolloProvider>
  );
}

export default App;
