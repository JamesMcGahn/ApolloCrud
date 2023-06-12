import express from 'express';
import { consola } from 'consola';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typedefs.mjs';
import resolvers from './graphql/resolvers.mjs';
import 'dotenv/config';
import connectDB from './config/db.mjs';
import protect from './middleware/protect.mjs';

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);

// connect DB
connectDB();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ user: await protect(req) }),
  }),
);

// trunk-ignore(eslint/no-promise-executor-return)
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve)).then(
  () => consola.success({ badge: true, message: `Listening on port: ${PORT}` }),
);
