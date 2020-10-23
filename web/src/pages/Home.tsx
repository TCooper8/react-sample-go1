import React from 'react';
import moment from 'moment';

import Page from '../components/Page';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Grid from '../ui/Grid';
import { Event, eventsQuery } from '../data/Events';
import { useApolloClient } from '@apollo/react-hooks';
import Loading from '../ui/Loading';
import EventList from '../components/EventList';

import styles from './Home.module.scss';
import errors from '../util/errors';
import TextInput from '../ui/inputs/TextInput';
import Panel from '../ui/Panel';

export default () => {
  const [ events, setEvents ] = React.useState<Event[] | undefined>();
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState<any | undefined>();

  const [ titleFilter, setTitleFilter ] = React.useState<string | undefined>();
  const [ cityFilter, setCityFilter ] = React.useState<string | undefined>();
  const [ stateFilter, setStateFilter ] = React.useState<string | undefined>();
  const [ countryFilter, setCountryFilter ] = React.useState<string | undefined>();

  const [ beforeFilter, setBeforeFilter ] = React.useState<string | undefined>();
  const [ afterFilter, setAfterFilter ] = React.useState<string | undefined>();

  const client = useApolloClient();

  const loadEvents = React.useCallback(async () => {
    if (!!beforeFilter && moment(beforeFilter).isValid() === false) {
      return setError("Time After must be a valid date.");
    }
    if (!!afterFilter && moment(afterFilter).isValid() === false) {
      return setError("Time Before must be a valid date.");
    }

    setError(undefined);
    setLoading(true);

    try {
      const { data } = await client.query({
        query: eventsQuery,
        variables: {
          filter: {
            title: titleFilter,
            location: {
              city: cityFilter,
              state: stateFilter,
              country: countryFilter,
            },
            timeBefore: beforeFilter,
            timeAfter: afterFilter,
          }
        }
      });
      setEvents(data.events);
    }
    catch (err) {
      setError(errors(err));
    }
    finally {
      setLoading(false);
    }
  }, [
    afterFilter, 
    beforeFilter,
    cityFilter, 
    client, 
    countryFilter, 
    stateFilter, 
    titleFilter,
  ]);

  React.useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return <Page>
    <Panel>
      <TextInput
        placeholder="Title"
        className={styles.input}
        value={titleFilter}
        setValue={setTitleFilter}
        onEnter={loadEvents}
      />
    </Panel>
    <Panel>
      <Grid center>
      <TextInput
        placeholder="City"
        className={styles.input}
        value={cityFilter}
        setValue={setCityFilter}
        onEnter={loadEvents}
      />
      <TextInput
        placeholder="State"
        className={styles.input}
        value={stateFilter}
        setValue={setStateFilter}
        onEnter={loadEvents}
      />
      <TextInput
        placeholder="Country"
        className={styles.input}
        value={countryFilter}
        setValue={setCountryFilter}
        onEnter={loadEvents}
      />
      </Grid>
    </Panel>
    <Panel>
      <Grid center>
        <TextInput
          placeholder="Time After"
          className={styles.input}
          value={afterFilter}
          setValue={setAfterFilter}
          onEnter={loadEvents}
        />
        <TextInput
          placeholder="Time Before"
          className={styles.input}
          value={beforeFilter}
          setValue={setBeforeFilter}
          onEnter={loadEvents}
        />
      </Grid>
    </Panel>
    <br />
    <Grid center>
      <Button key={'load-events'} onClick={loadEvents}>
        <Text center medium>
          Reload
        </Text>
      </Button> 
    </Grid>
    <br />
    {error && <Text key={"error"} medium center error>{error}</Text>}
    <Grid center>
      {loading && <Loading key='events-loading' cover={false} />}
    </Grid>
    <Grid center>
      {events && <EventList key='events-grid' className={styles.events} events={events} />}
    </Grid>
  </Page>
}