// src/components/PostsCacheOnly.tsx
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";

export default function PostsCacheOnly() {
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: { page: 1, limit: 5 },
    fetchPolicy: "cache-only",
  });

  // With cache-only, loading will be false and there is no network
  if (error) return <p style={{ color: "red" }}>Error</p>;
  if (!data) return <p>No data in cache (as expected for cache-only)</p>;
  return (
    <ul>
      {data.posts.data.map((p: any) => (
        <li key={p.id}>
          <strong>{p.title}</strong> — {p.body}
        </li>
      ))}
    </ul>
  );
}