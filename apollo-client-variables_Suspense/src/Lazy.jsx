import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import React from "react";

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
    }
  }
`;


export default function Lazy() {
  const [code, setCode] = useState("IN");
  const [getCountry, { loading, data, error, called }] = useLazyQuery(GET_COUNTRY_BY_CODE);

  const handleSearch = () => {
    getCountry({ variables: { code: code.toUpperCase() } });
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter country code"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {called && !loading && data && (
        <div>
          <p><strong>Name:</strong> {data.country.name}</p>
          <p><strong>Code:</strong> {data.country.code}</p>
          <p><strong>Emoji:</strong> {data.country.emoji}</p>
        </div>
      )}
    </div>
  );
}
