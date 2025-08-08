// server.js or index.js
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
const OPERATION_SCHEDULED = 'OPERATION_SCHEDULED';

const typeDefs = `
  type Query {
    foo: String!
  }

  type Mutation {
    scheduleOperation(name: String!): String!
  }

  type Subscription {
    operationScheduled: String!
  }
`;

const resolvers = {
  Query: {
    foo: () => 'foo',
  },
  Mutation: {
    scheduleOperation: (_, { name }) => {
      const message = `Operation: ${name} scheduled!`;
      pubsub.publish(OPERATION_SCHEDULED, { operationScheduled: message });
      return message;
    },
  },
  Subscription: {
    operationScheduled: {
      subscribe: () => pubsub.asyncIterator([OPERATION_SCHEDULED]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

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
app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));

httpServer.listen(port, () => {
  console.log(`🚀 Query endpoint:     http://localhost:${port}/graphql`);
  console.log(`📡 Subscription endpoint: ws://localhost:${port}/graphql`);
});

// subscription {
//   operationScheduled
// }


// mutation {
//   scheduleOperation(name: "It's working bro!!!!!!!!!!")
// }
