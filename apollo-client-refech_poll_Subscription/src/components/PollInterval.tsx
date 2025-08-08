import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default function UserList() {
  const { data, loading, error } = useQuery(GET_USERS, {
    pollInterval: 50000, // Poll every 5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.users.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
