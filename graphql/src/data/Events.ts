import moment, { Moment } from 'moment';
import raw_rows from './events_data.js';

export type LocationFilter = {
  city?: string;
  state?: string;
  country?: string;
}

export type EventFilter = {
  title?: string;
  location?: LocationFilter;
  timeBefore?: string;
  timeAfter?: string;
}

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
  time: Moment,
  location: Location;
  availableSeats?: Seat[];
}

// Pulling rows from file and converting them to something useable.
const rows: Event[] = raw_rows.map(row => {
  return {
    ...row,
    time: moment(row.time),
  }
});

// Helper function for filtering text.
const textFilter = (keyword: string, text: string) => {
  return text.toLowerCase().includes(keyword.trim().toLowerCase())
}

// Helper function for location filter.
const locationFilters = (filter?: LocationFilter) => {
  return [
    filter?.city && (row => textFilter(filter.city, row.location.city)),
    filter?.state && (row => textFilter(filter.state, row.location.state)),
    filter?.country && (row => textFilter(filter.country, row.location.country)),
  ]
}

/**
 * This function will list out the events in the system, applying the given filter.
 * @param filter The filter to use for the events.
 */
const list = async (filter?: EventFilter): Promise<Event[]> => {
  console.log("Filtering events with %j", filter);

  // Create a set of filter functions to reduce the set of events.
  const filters = [
    filter?.title && (row => textFilter(filter.title, row.title)),

    filter?.timeAfter && ((row: Event) => {
      return row.time.isAfter(moment(filter.timeAfter, true));
    }),
    filter?.timeBefore && ((row: Event) => {
      return row.time.isSameOrBefore(moment(filter.timeBefore, true));
    }),

    ...locationFilters(filter?.location),
  ].filter(v => !!v);

  // Apply the filters.
  return rows.filter(row => {
    return !filters.find(filter => !filter(row));
  });
}

export default {
  list,
}