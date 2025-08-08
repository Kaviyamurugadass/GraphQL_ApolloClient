
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
    }
  }
`;

const inputStyle = {
    padding: "8px",
    fontSize: "16px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  export default function Variable(){
     const [countryCode, setCountryCode] = useState("IN"); // default India
      const { data, loading, error } = useQuery(GET_COUNTRY_BY_CODE, {
        variables: { code: countryCode.toUpperCase() },
        skip: !countryCode,
      });
      
    return (
         <div style={containerStyle}>
      <h2>Country Lookup</h2>
      <input
        type="text"
        value={countryCode}
        placeholder="Enter country code (e.g., IN, US)"
        onChange={(e) => setCountryCode(e.target.value)}
        style={inputStyle}
      />
      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.country ? (
          <div>
            <h3>
              {data.country.name} {data.country.emoji}
            </h3>
            <p>Code: {data.country.code}</p>
          </div>
        ) : (
          !loading && <p>No country found.</p>
        )}
      </div>
    </div>)

}