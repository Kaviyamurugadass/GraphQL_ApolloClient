import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      
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
