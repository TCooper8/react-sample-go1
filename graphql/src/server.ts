import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Schema from './graphql/Schema';


export default (port?: number) => {
  const server = new ApolloServer({
    schema: Schema,
    playground: true,
  });

  const app = express();
  server.applyMiddleware({
    app
  });
  const _port = port || 80;
  app.listen(_port, () => {
    console.log("Listening on port %d", _port);
  });
}