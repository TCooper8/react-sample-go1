import Events, { Event } from "./Events"
import { assert, expect } from "chai";
import _ from 'lodash';
import moment, { Moment } from 'moment';

describe('Events', () => {
  it('Should list events', async () => {
    const events = await Events.list();
    assert.notEqual(events, undefined);
    expect(events.length).to.be.greaterThan(0);
  });

  it('Should test EventFilter title', async () => {
    const allEvents = await Events.list();
    // Pick an event and use that title for the filter.
    const events = await Events.list({
      title: allEvents[0].title,
    });
    assert.notEqual(events, undefined);
    expect(events.length).to.be.greaterThan(0);
  });

  it('Should test EventFilter timeBefore and timeAfter', async () => {
    const allEvents = await Events.list();

    let events = await Events.list({
      timeAfter: '2022',
    });
    expect(events.length).to.be.equal(0);

    events = await Events.list({
      timeBefore: '2019',
    });
    expect(events.length).to.be.equal(0);

    events = await Events.list({
      timeBefore: '2022',
    });
    expect(events.length).to.be.equal(allEvents.length);

    events = await Events.list({
      timeAfter: '2019',
    });
    expect(events.length).to.be.equal(allEvents.length);

    events = await Events.list({
      timeAfter: '2019',
      timeBefore: '2022',
    });
    expect(events.length).to.be.equal(allEvents.length);
  });

  it('Should test EventFilter location', async () => {
    let events = await Events.list({
      location: {
        city: 'city that doesn\'t exist',
      },
    });
    expect(events.length).to.be.equal(0);

    events = await Events.list({
      location: {
        state: 'state that doesn\'t exist',
      },
    });
    expect(events.length).to.be.equal(0);

    events = await Events.list({
      location: {
        country: 'country that doesn\'t exist',
      },
    });
    expect(events.length).to.be.equal(0);
  })
})