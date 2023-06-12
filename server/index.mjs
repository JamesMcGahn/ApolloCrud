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

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve)).then(
  () => consola.success({ badge: true, message: `Listening on port: ${PORT}` }),
);
