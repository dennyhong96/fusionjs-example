const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

// Dynamic Relationship loaders
const loadUser = async (userId) => {
  const { _doc: user } = await User.findById(userId).select("-password");
  return {
    ...user,
    createdEvents: loadEvents.bind(null, user.createdEvents),
  };
};

const loadEvents = async (eventIds) => {
  const events = await Event.find({ _id: { $in: eventIds } });
  return events.map(({ _doc: event }) => ({
    ...event,
    date: new Date(event.date).toISOString(),
    createdBy: loadUser.bind(null, event.createdBy),
  }));
};

const loadEvent = async (eventId) => {
  const { _doc: event } = await Event.findById(eventId);
  return {
    ...event,
    date: new Date(event.date).toISOString(),
    createdBy: loadUser.bind(null, event.createdBy),
  };
};

// Resolvers
module.exports = {
  // Queries
  async events() {
    const events = await Event.find();
    return events.map(({ _doc: event }) => ({
      ...event,
      date: new Date(event.date).toISOString(),

      // when a response object's field value is a Function
      // GraphQL invokes it when that field is selected by the client
      createdBy: loadUser.bind(null, event.createdBy),
    }));
  },

  async users() {
    const users = await User.find().select("-password");
    return users.map(({ _doc: user }) => ({
      ...user,
      createdEvents: loadEvents.bind(null, user.createdEvents),
    }));
  },

  async bookings() {
    const bookings = await Booking.find();
    return bookings.map(({ _doc: booking }) => ({
      ...booking,
      event: loadEvent.bind(null, booking.event),
      user: loadUser.bind(null, booking.user),
      createdAt: new Date(booking.createdAt).toISOString(),
      updatedAt: new Date(booking.updatedAt).toISOString(),
    }));
  },

  // Mutations
  async createEvent({ eventInput }) {
    const userId = "6272be39e77a5e630f848334"; // TODO: retrieve from header
    if (!(await User.findById(userId))) {
      throw new Error(`User doesn't exist`);
    }
    const { _doc: newEvent } = await Event.create({
      ...eventInput,
      date: new Date(eventInput.date),
      createdBy: userId,
    });
    await User.findByIdAndUpdate(userId, {
      $push: { createdEvents: newEvent },
    });
    return {
      ...newEvent,
      date: new Date(newEvent.date).toISOString(),
      createdBy: loadUser.bind(null, newEvent.createdBy),
    };
  },

  async createUser({ userInput }) {
    const { email, password } = userInput;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }
    const passwordSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    const { _doc: newUser } = await User.create({
      ...userInput,
      password: hashedPassword,
    });
    delete newUser.password; // hide password from response
    return {
      ...newUser,
      createdEvents: loadEvents.bind(null, newUser.createdEvents),
    };
  },

  async createBooking({ eventId }) {
    const userId = "6272be39e77a5e630f848334"; // TODO: retrieve from header
    if (!(await User.findById(userId))) {
      throw new Error(`User doesn't exist`);
    }
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error(`Event doesn't exist`);
    }
    const { _doc: booking } = await Booking.create({
      user: userId,
      event,
    });
    return {
      ...booking,
      event: loadEvent.bind(null, booking.event),
      user: loadUser.bind(null, booking.user),
      createdAt: new Date(booking.createdAt).toISOString(),
      updatedAt: new Date(booking.updatedAt).toISOString(),
    };
  },

  async removeBooking({ bookingId }) {
    const booking = await Booking.findById(bookingId).populate("event");
    if (!booking) {
      throw new Error("Booking doesn't exist");
    }
    await Booking.deleteOne({ id: bookingId });
    const event = booking.event._doc;
    return {
      ...event,
      date: new Date(event.date).toISOString(),
      createdBy: loadUser.bind(null, event.createdBy),
    };
  },
};
