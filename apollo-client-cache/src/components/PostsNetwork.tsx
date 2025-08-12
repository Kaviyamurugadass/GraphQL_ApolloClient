// src/components/PostsNetwork.tsx
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";

export default function PostsNetwork() {
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: { page: 1, limit: 5 },
    fetchPolicy: "network-only", // or "cache-first" (default)
  });

  if (loading) return <p>Loading (network)...</p>;
  if (error) return <p style={{ color: "red" }}>Error</p>;
  return (
    <ul>
      {data?.posts?.data?.map((p: any) => (
        <li key={p.id}>
          <strong>{p.title}</strong> — {p.body}
        </li>
      ))}
    </ul>
  );
}