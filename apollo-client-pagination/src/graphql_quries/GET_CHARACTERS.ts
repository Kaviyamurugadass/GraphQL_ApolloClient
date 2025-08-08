// src/graphql/GET_CHARACTERS.ts
import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
        prev
        count
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;
