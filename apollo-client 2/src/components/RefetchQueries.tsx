import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, ADD_USER } from '../graphql/requestreponse';

export default function RefetchQueries() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [name, setName] = useState('');
  
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }], // 👈 KEY POINT
  });

  const handleAdd = () => {
    if (name.trim()) {
      addUser({ variables: { name } });
      setName('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Users</h2>
      <ul>
        {data.users.map((user: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add User</button>
    </div>
  );
}
