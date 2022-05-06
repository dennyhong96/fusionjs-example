const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./loaders");

// Resolvers
module.exports = {
  // Queries
  async bookings(arg, { headers: { isAuthenticated } }) {
    if (!isAuthenticated) {
      throw new Error(`Unauthenticated`);
    }
    const bookings = await Booking.find();
    return bookings.map((booking) => transformBooking(booking));
  },

  // Mutations
  async createBooking({ eventId }, { headers: { isAuthenticated, userId } }) {
    if (!isAuthenticated) {
      throw new Error(`Unauthenticated`);
    }
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

  async removeBooking({ bookingId }, { headers: { isAuthenticated, userId } }) {
    if (!isAuthenticated) {
      throw new Error(`Unauthenticated`);
    }
    const booking = await Booking.findById(bookingId).populate("event");
    if (!booking) {
      throw new Error("Booking doesn't exist");
    }
    if (booking.user.toString() !== userId) {
      throw new Error("Insufficient permissions");
    }
    await Booking.deleteOne({ id: bookingId });
    return transformEvent(booking.event);
  },
};