import { gql, IResolvers } from "apollo-server-express";
import EventResolvers, { eventTypes } from "./EventResolvers";

import { makeExecutableSchema } from 'apollo-server-express';

export const typeDefs = gql`
${eventTypes}

type Query {
  version: String!
}
`;

const Query = {
  ...EventResolvers.Query,
  version: async () => {
    return "0.1.0";
  },
};

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: {
    Query,
  },
});