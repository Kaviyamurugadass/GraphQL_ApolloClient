import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { GET_POSTS } from "./queries";
import { CREATE_POST } from "./mutations";

/**
 * Demo:
 * - load posts (network -> stored in cache)
 * - create a post (mutation -> server call)
 * - update cache in the mutation `update` callback so UI updates w/o re-fetch
 * - Read from cache-only (no network) to show cached data
 */


export default function App() {
  const PAGE = 1;
  const LIMIT = 5;

  // standard query (cache-first)
  const { data, loading, error, refetch } = useQuery(GET_POSTS, {
    variables: { page: PAGE, limit: LIMIT },
    fetchPolicy: "cache-first", // default
  });

  // mutation
  const [createPost, { loading: creating }] = useMutation(CREATE_POST, {
    // after createPost returns, update local cache so the list shows new post without refetch
    update(cache, { data: mutationData }) {
      if (!mutationData?.createPost) return;
      const newPost = mutationData.createPost;

      try {
        // read existing posts from cache
        const existing: any = cache.readQuery({
          query: GET_POSTS,
          variables: { page: PAGE, limit: LIMIT },
        });

        // write back with new post prepended
        cache.writeQuery({
          query: GET_POSTS,
          variables: { page: PAGE, limit: LIMIT },
          data: {
            posts: {
              ...existing.posts,
              data: [newPost, ...existing.posts.data],
            },
          },
        });
      } catch (e) {
        // if cache has nothing yet, just write a new shape
        cache.writeQuery({
          query: GET_POSTS,
          variables: { page: PAGE, limit: LIMIT },
          data: { posts: { data: [newPost] } },
        });
      }
    },
  });

  const client = useApolloClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cachedSnapshot, setCachedSnapshot] = useState<any[]>([]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await createPost({
      variables: { input: { title, body } },
    });
    setTitle("");
    setBody("");
  };

  // read from cache (no network)
  const showCacheOnly = () => {
    const cached = client.readQuery({
      query: GET_POSTS,
      variables: { page: PAGE, limit: LIMIT },
    }) as any;
    setCachedSnapshot(cached?.posts?.data ?? []);
    console.log("Cached posts:", cached);
  };

  // force network refetch
  const fetchFromNetwork = async () => {
    await refetch({ page: PAGE, limit: LIMIT });
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20, maxWidth: 700, margin: "0 auto" }}>
      <h1>Apollo Cache Demo</h1>

      <section style={{ marginBottom: 20 }}>
        <form onSubmit={handleCreate}>
          <h3>Create Post (calls mutation)</h3>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "60%", padding: 8, marginRight: 8 }}
          />
          <input
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: "30%", padding: 8, marginRight: 8 }}
          />
          <button type="submit" disabled={creating}>
            {creating ? "Creating..." : "Create"}
          </button>
        </form>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>Posts (cache-first)</h3>
        <div style={{ marginBottom: 8 }}>
          <button onClick={showCacheOnly} style={{ marginRight: 8 }}>
            Read from cache only (no network)
          </button>
          <button onClick={fetchFromNetwork}>Refetch from network</button>
        </div>

        {loading && <p>Loading posts...</p>}
        {error && <p style={{ color: "red" }}>Error loading posts</p>}

        <ul>
          {data?.posts?.data?.map((p: any) => (
            <li key={p.id}>
              <strong>{p.title}</strong> — {p.body}
            </li>
          ))}

          {/* fallback if no data yet */}
          {!data?.posts?.data?.length && !loading && <li>No posts loaded yet.</li>}
        </ul>
      </section>

      <section>
        <h3>Cached snapshot (read via client.readQuery)</h3>
        <ul>
          {cachedSnapshot.map((p: any) => (
            <li key={p.id}>
              <em>{p.id}</em>: {p.title}
            </li>
          ))}
        </ul>
      </section>

      <small style={{ color: "#666", display: "block", marginTop: 20 }}>
        Open DevTools → Network & Apollo tab to inspect requests and cache.
      </small>
    </div>
  );
}
