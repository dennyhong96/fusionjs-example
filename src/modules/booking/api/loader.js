const { Booking } = require("./model");
const { transformDate } = require("../../../library");
const { loadEvent } = require("../../event/api/loader");
const { loadUser } = require("../../auth/api/loader");

async function loadBookings(eventId) {
  const bookings = await Booking.find({ event: eventId });
  return bookings.map((booking) => transformBooking(booking));
}

const transformBooking = ({ _doc: booking }) => {
  return {
    ...booking,
    event: loadEvent.bind(null, booking.event._id),
    user: loadUser.bind(null, booking.user._id),
    createdAt: transformDate(booking.createdAt),
    updatedAt: transformDate(booking.updatedAt),
  };
};

module.exports = {
  loadBookings,
  transformBooking,
};
