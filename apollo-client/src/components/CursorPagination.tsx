// src/CursorPagination.tsx
// public api only supports the offset pagination
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql_quries/GET_CHARACTERS";


const CursorPagination = () => {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.characters?.results) return null;

  const { results, info } = data.characters;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Characters - Page {page}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {results.map((char: any) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            <img src={char.image} alt={char.name} width="100%" />
            <p>{char.name}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage(info.prev)}
          disabled={!info.prev}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button onClick={() => setPage(info.next)} disabled={!info.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CursorPagination;
