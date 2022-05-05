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
  async createEvent({ eventInput }) {
    const userId = "62735c6afa89de39e8560f45"; // TODO: retrieve from header
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
