// server.js (Node.js with ESModules)
// Add "type": "module" in your package.json

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { PubSub } from 'graphql-subscriptions';
import cors from 'cors';

const app = express();
// ✅ Allow CORS from frontend (localhost:3001)
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true, // optional if you use cookies or auth headers
    }));

const httpServer = createServer(app);
const port = 3000;
const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

const typeDefs = `
  type Message {
    id: ID!
    content: String!
    sender: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(content: String!, sender: String!): Message!
  }

  type Subscription {
    messageSent: Message!
  }
`;

let messages = [];
let idCounter = 1;

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { content, sender }) => {
      const message = { id: idCounter++, content, sender };
      messages.push(message);
      pubsub.publish(MESSAGE_SENT, { messageSent: message });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_SENT]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Set up WebSocket for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

// Start Apollo Server
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();

// Express middleware for GraphQL endpoint
app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));

// Start HTTP + WS server
httpServer.listen(port, () => {
  console.log(`🚀 Query endpoint:     http://localhost:${port}/graphql`);
  console.log(`📡 Subscription endpoint: ws://localhost:${port}/graphql`);
});

// subscription {
//   messageSent {
//     id
//     content
//     sender
//   }
// }

// mutation {
//   sendMessage(content: "Hello., jnxc solli da", sender: "Alice") {
//     id
//     content
//     sender
//   }
// }
// This is a simple GraphQL server with subscriptions using Apollo Server and WebSocket.