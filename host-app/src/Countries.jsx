import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      currency
    }
  }
`;

export default function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.countries.map((country) => (
        <li key={country.code}>
          {country.name} {country.emoji} - {country.currency}
        </li>
      ))}
    </ul>
  );
}
// gql → parses the query

// useQuery(GET_COUNTRIES) → fetches data

// loading, error, data → state provided by Apollo

// data.countries.map(...) → shows the list of countries