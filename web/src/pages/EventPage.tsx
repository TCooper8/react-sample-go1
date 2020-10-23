import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import moment from 'moment';

import { Event, eventsQuery, cleanEvent } from '../data/Events';
import errors from '../util/errors';
import Loading from '../ui/Loading';
import Text from '../ui/Text';
import Image from '../ui/Image';

import styles from './EventPage.module.scss';
import Page from '../components/Page';
import Panel from '../ui/Panel';
import Grid from '../ui/Grid';

type Props = {
  match: any;
}

export default ({ match }: Props) => {
  const client = useApolloClient();

  const [ event, setEvent ] = React.useState<Event | undefined>();
  const [ error, setError ] = React.useState<any | undefined>();
  const [ loading, setLoading ] = React.useState(true);

  const load = React.useCallback(async () => {
    setEvent(undefined);
    setLoading(true);
    setError(undefined);

    try {
      const eventTitle = match.params.eventTitle;
      const { data } = await client.query({
        query: eventsQuery,
        variables: {
          filter: {
            title: eventTitle,
          },
        },
      });
      const event = data.events[0];
      if (!event) return;
      setEvent(cleanEvent(event));
    }
    catch (err) {
      setError(errors(err));
    }
    finally {
      setLoading(false);
    }
  }, [match, client]);

  React.useEffect(() => {
    load();
  }, [match, load]);

  if (loading) return <Loading cover />
  if (error) return <Text error large center>{error}</Text>
  if (!event) return <Text large center>Sorry! Event cannot be found.</Text>

  const eventTime = moment(event.time);
  const startsIn = eventTime.fromNow(false);
  const seats = event.availableSeats?.length || "0";

  return <Page className={styles.page}>
    <Panel className={styles.infoPanel}>
      <Grid>
        <Image className={styles.mainImage} src={event.image} />
        <div className={styles.eventInfo}>
          <Text large apitalize>{event.title}</Text>
          <br />
          <Text medium >{`Starts, ${eventTime.format('MM/DD/YYYY HH:mm:ss')}`}</Text>
          <Text medium capitalize>{`${event.location.city}, ${event.location.state}, ${event.location.country}`}</Text>
          <br />
          <Text small>{`Starts ${startsIn}`}</Text>
          <Text small capitalize>{`${seats} seats`}</Text>
        </div>
      </Grid>
    </Panel>
    <br />
    <br />
    <Text large center capitalize>Seats Available</Text>
    <Grid center>
      {event.availableSeats?.map(seat => {
        return <Panel className={styles.seatCard}>
          <Text medium center capitalize>{seat.id}</Text>
        </Panel>
      })}
    </Grid>
  </Page>
}