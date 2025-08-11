import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
    }
  }
`;

export default function App() {
  const [code, setCode] = useState("IN");

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
    fetchPolicy: "cache-first" // ✅ default but making explicit
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Country Lookup</h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        maxLength={2}
        style={{ padding: "8px", fontSize: "16px" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error fetching country</p>}

      {data && (
        <div style={{ marginTop: "20px" }}>
          <strong>{data.country.name}</strong> {data.country.emoji}
        </div>
      )}
    </div>
  );
}
