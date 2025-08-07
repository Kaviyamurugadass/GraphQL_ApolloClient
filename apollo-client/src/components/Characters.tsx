// src/components/Characters.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql_quries/queries";

export default function Characters() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = data.characters.results;
  const pageInfo = data.characters.info;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rick and Morty Characters</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char: any) => (
          <div key={char.id} className="border rounded p-2 shadow">
            <img src={char.image} alt={char.name} className="w-full rounded" />
            <p className="font-semibold">{char.name}</p>
            <p className="text-sm text-gray-600">{char.status}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={!pageInfo.prev}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-medium">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={!pageInfo.next}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
