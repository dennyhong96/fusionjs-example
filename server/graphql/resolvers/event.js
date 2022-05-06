const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./loaders");

// Resolvers
module.exports = {
  // Queries
  async events() {
    const events = await Event.find();
    return events.map((event) => transformEvent(event));
  },

  // Mutations
  async createEvent({ eventInput }, { headers: { isAuthenticated, userId } }) {
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
  },
};
