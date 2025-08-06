import { gql, useQuery } from '@apollo/client';
import './App.css'; // Assuming you have a CSS file for styling
import React, { useState } from 'react';
import Variable from './Variables';




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
  const { loading, error, data} = useQuery(GET_COUNTRIES);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Variable />
    <ul className="countries-list" style={{ listStyleType: 'none', padding: 0, margin: 0, backgroundColor: 'rgba(188, 194, 185, 1)' }}>
      {data.countries.map((country) => (
        <li key={country.code}>
          {country.name} {country.emoji} - {country.currency}
        </li>
      ))}
    </ul>
    </>
  );
}
// gql → parses the query

// useQuery(GET_COUNTRIES) → fetches data

// loading, error, data → state provided by Apollo

// data.countries.map(...) → shows the list of countries