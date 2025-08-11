// src/graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
      }
    }
  }
`;


export const GET_CHARACTERS_INFINITE_SCROLL = gql`
  query ($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        image
      }
    }
  }
`;
