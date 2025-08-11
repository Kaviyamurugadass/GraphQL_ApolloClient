import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
