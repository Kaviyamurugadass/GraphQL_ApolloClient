import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    body
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [createPost, { data, loading, error }] = 
    useMutation<CreatePostResponse,{ input: CreatePostInput }>(CREATE_POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost({
      variables: {
        input: {
          title,
          body    }
      }
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create Post (Mutation)</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body"
          style={{ display: 'block', marginBottom: '1rem', width: '300px', height: '100px' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <p style={{ color: 'green' }}>
          ✅ Created Post #{data.createPost.id}: {data.createPost.title} @ {data.createPost.body}
        </p>
      )}
    </div>
  );
}

export default App;
