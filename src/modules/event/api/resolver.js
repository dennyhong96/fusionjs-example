const { Event } = require("./model");
const { transformEvent } = require("../../../library/api/loaders");
const { User } = require("../../auth/api");

// Resolvers

// Queries
async function events() {
  const events = await Event.find();
  return events.map((event) => transformEvent(event));
}

// Mutations
async function createEvent(
  _,
  { eventInput },
  {
    request: {
      headers: { isAuthenticated, userId },
    },
  }
) {
  if (!isAuthenticated) {
    throw new Error(`Unauthenticated`);
  }
  if (!(await User.findById(userId))) {
    throw new Error(`User doesn't exist`);
  }
  const newEvent = await Event.create({
    ...eventInput,
    date: new Date(eventInput.date),
    createdBy: userId,
  });
  await User.findByIdAndUpdate(userId, {
    $push: { createdEvents: newEvent },
  });
  return transformEvent(newEvent);
}

module.exports = {
  eventQueries: {
    events,
  },
  eventMutations: {
    createEvent,
  },
};
