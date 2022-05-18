const DataLoader = require("dataloader");

const { Event } = require("./model");
const { transformDate } = require("../../../library");
const { loadUser } = require("../../auth/api/loader");
const { loadBookings } = require("../../booking/api/loader");

// Dataloaders for batching DB calls
const eventLoader = new DataLoader(loadEvents);

// Dynamic Relationship loaders
async function loadEvents(eventIds) {
  const events = await Event.find({ _id: { $in: eventIds } });
  events.sort(
    (ev1, ev2) =>
      eventIds.indexOf(ev1._id.toString()) -
      eventIds.indexOf(ev2._id.toString())
  ); // keys' order must match results' order for dataLoader to work correctly
  return events.map((event) => transformEvent(event));
}

async function loadEvent(eventId) {
  return await eventLoader.load(eventId.toString()); // Need to make sure key passed to dataLoader is a primitive, not objectId
}

const transformEvent = ({ _doc: event }) => {
  // accepts a rich mongo "event" object with metadata
  // destrcture arg  in-place to get the raw "event" object
  return {
    ...event,
    date: transformDate(event.date),

    // when a response object's field value is a Function
    // GraphQL invokes it when that field is selected by the client
    createdBy: loadUser.bind(null, event.createdBy),
    bookings: loadBookings.bind(null, event._id),
  };
};

module.exports = {
  eventLoader,
  loadEvents,
  loadEvent,
  transformEvent,
};
