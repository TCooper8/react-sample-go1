import { gql } from "apollo-server-express";
import Events, { EventFilter } from "../data/Events";

export const eventTypes = `

input LocationFilter {
  city: String
  state: String
  country: String
}

input EventFilter {
  title: String
  description: String
  location: LocationFilter
  timeBefore: String
  timeAfter: String
}

type Seat {
  id: String!
}

type Location {
  city: String!
  state: String!
  country: String!
}

type Event {
  title: String!
  description: String
  time: String!
  image: String!
  location: Location!
  availableSeats: [Seat!]
}

extend type Query {
  events(filter: EventFilter): [Event!]!
}
`;

type EventsArgs = {
  filter?: EventFilter;
}

const EventsQuery = {
  events: async (query: any, args: EventsArgs) => {
    // Simulated time.
    await new Promise(res => setTimeout(res, 250));
    return Events.list(args.filter);
  },
}

export default {
  Query: EventsQuery,
}