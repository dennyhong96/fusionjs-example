const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./loaders");

// Resolvers
module.exports = {
  // Queries
  async bookings() {
    const bookings = await Booking.find();
    return bookings.map((booking) => transformBooking(booking));
  },

  // Mutations
  async createBooking({ eventId }) {
    const userId = "62735c6afa89de39e8560f45"; // TODO: retrieve from header
    if (!(await User.findById(userId))) {
      throw new Error(`User doesn't exist`);
    }
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error(`Event doesn't exist`);
    }
    const booking = await Booking.create({
      user: userId,
      event,
    });
    return transformBooking(booking);
  },

  async removeBooking({ bookingId }) {
    const booking = await Booking.findById(bookingId).populate("event");
    if (!booking) {
      throw new Error("Booking doesn't exist");
    }
    await Booking.deleteOne({ id: bookingId });
    return transformEvent(booking.event);
  },
};
