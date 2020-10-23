import React from 'react';
import moment from 'moment';

import { Event, cleanEvent } from '../data/Events';

import clsx from 'clsx';
import styles from './EventList.module.scss';
import Text from '../ui/Text';
import Panel from '../ui/Panel';
import Tag from '../ui/Tag';

type EventProps = {
  event: Event;
} & React.HTMLAttributes<HTMLElement>;

const EventItem = ({ event, className, ...props }: EventProps) => {
  const eventTime = moment(event.time);
  const startsIn = eventTime.fromNow(false);
  const seats = event.availableSeats?.length || "0";

  return <Tag tag={`/events/${encodeURIComponent(event.title)}`}>
    <Panel
      {...props}
      className={clsx(
        className,
        styles.eventItem,
      )}
    >
      <img className={styles.eventImage} src={event.image} alt={''} />
      <div className={styles.eventInfo}>
        <Text small capitalize>{event.title}</Text>
        <Text mini>{`Starts, ${eventTime.format('MM/DD/YYYY HH:mm:ss')}`}</Text>
        <Text mini capitalize>{`${event.location.city}, ${event.location.state}, ${event.location.country}`}</Text>
      </div>
      <div className={styles.eventExtras}>
        <Text small>{`Starts ${startsIn}`}</Text>
        <Text small capitalize>{`${seats} seats`}</Text>
      </div>
    </Panel>
  </Tag>
}

type Props = {
  events: Event[];
} & React.HTMLAttributes<HTMLElement>;
export default ({ events, ...props }: Props) => {
  return <ul {...props}>
    {events.map((event, i) => {
      return <li key={i}>
        <EventItem
          event={cleanEvent(event)}
        />
      </li>
    })}
  </ul>
}