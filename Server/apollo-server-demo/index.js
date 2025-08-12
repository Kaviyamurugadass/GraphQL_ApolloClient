// node index.js
const { ApolloServer, gql } = require('apollo-server');

// Sample data
let users = [
  { id: '1', name: 'Kaviya' },
  { id: '2', name: 'Murugadass' },
];

// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(name: String!): User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, { name }) => {
      const newUser = { id: String(users.length + 1), name };
      users.push(newUser);
      return newUser;
    },
  },
};

// Server setup
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

