const DataLoader = require("dataloader");

const { formatDate } = require("../../helpers");
const Event = require("../../models/event");
const user = require("../../models/user");

// Dataloaders for batching DB calls
const eventLoader = new DataLoader(loadEvents);
const userLoader = new DataLoader(loadUsers);

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

async function loadUsers(userIds) {
  const users = await user.find({ _id: { $in: userIds } }).select("-password");
  users.sort(
    (u1, u2) =>
      userIds.indexOf(u1._id.toString()) - userIds.indexOf(u2._id.toString())
  );
  return users.map((user) => transformUser(user));
}

async function loadUser(userId) {
  return await userLoader.load(userId.toString());
}

// Resovler return type transformers
const transformUser = ({ _doc: user }) => {
  return {
    ...user,
    createdEvents: () =>
      eventLoader.loadMany(user.createdEvents.map((oid) => oid.toString())),
  };
};

const transformEvent = ({ _doc: event }) => {
  // accepts a rich mongo "event" object with metadata
  // destrcture arg  in-place to get the raw "event" object
  return {
    ...event,
    date: formatDate(event.date),

    // when a response object's field value is a Function
    // GraphQL invokes it when that field is selected by the client
    createdBy: loadUser.bind(null, event.createdBy),
  };
};

const transformBooking = ({ _doc: booking }) => {
  return {
    ...booking,
    event: loadEvent.bind(null, booking.event._id),
    user: loadUser.bind(null, booking.user._id),
    createdAt: formatDate(booking.createdAt),
    updatedAt: formatDate(booking.updatedAt),
  };
};

module.exports = {
  loadUser,
  loadEvent,
  loadEvents,
  transformUser,
  transformEvent,
  transformBooking,
};
