// src/App.tsx
import React from "react";
import Characters from "./components/Characters";
import CursorPagination from './components/CursorPagination';
import InfiniteScrollCharacters from "./components/InfiniteScrollCharacters";
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
         <h1 className="text-2xl font-bold text-center my-4">Rick & Morty API</h1>

       {/* <CursorPagination /> */}
      <InfiniteScrollCharacters /> 
      {/* <Characters /> */}
    </ApolloProvider>
  );
}

export default App;
