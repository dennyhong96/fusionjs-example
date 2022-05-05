const { formatDate } = require("../../helpers");

const Event = require("../../models/event");
const User = require("../../models/user");

// Dynamic Relationship loaders
const loadUser = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return transformUser(user);
};

const loadEvent = async (eventId) => {
  const event = await Event.findById(eventId);
  return transformEvent(event);
};

const loadEvents = async (eventIds) => {
  const events = await Event.find({ _id: { $in: eventIds } });
  return events.map((event) => transformEvent(event));
};

// Resovler return type transformers
const transformUser = ({ _doc: user }) => {
  return {
    ...user,
    createdEvents: loadEvents.bind(null, user.createdEvents),
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
    event: loadEvent.bind(null, booking.event),
    user: loadUser.bind(null, booking.user),
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
