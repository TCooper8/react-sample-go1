import Events from "../data/Events";
import EventResolvers from "./EventResolvers";
import { assert } from "chai";

describe('EventResolver Query', () => {
  it('should list the events', async () => {
    const actual = await Events.list();
    const events = await EventResolvers.Query.events(null, {});
    assert.deepEqual(actual, events);
  });
});