import gql from 'graphql-tag';

import airplane from '../assets/airplane.jpg';

export type Location = {
  city: string;
  state: string;
  country: string;
}

export type Seat = {
  id: string;
}

export type Event = {
  title: string;
  time: string;
  image: string;
  location: Location;
  availableSeats?: Seat[];
}

const eventInfo = `
fragment EventInfo on Event {
  title
  description
  time
  image
  location { 
    city
    state
    country
  }
  availableSeats {
    id
  }
}
`;

export const eventsQuery = gql`
${eventInfo}

query Events($filter: EventFilter) {
  events(filter: $filter) {
    ...EventInfo
  }
}
`;

export const cleanEvent = (event: Event) => {
  return {
    ...event,
    image: airplane,
  }
}