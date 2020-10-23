import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Schema from './graphql/Schema';

/**
 * Creates the GraphQL server.
 */
export default (port?: number) => {
  // Attach the schema to the server, enabling playground.
  const server = new ApolloServer({
    schema: Schema,
    playground: true,
  });

  // Create express app and bind the apollo server to it.
  const app = express();
  server.applyMiddleware({
    app
  });
  const _port = port || 80;
  app.listen(_port, () => {
    console.log("Listening on port %d", _port);
  });
}