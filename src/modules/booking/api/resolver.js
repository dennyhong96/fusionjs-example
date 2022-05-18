import { Booking, transformBooking } from ".";
import { Event, transformEvent } from "../../event/api";
import { User } from "../../auth/api";

// Resolvers

// Queries
async function bookings(
  _,
  arg,
  {
    request: {
      headers: { isAuthenticated, userId },
    },
  }
) {
  if (!isAuthenticated) throw new Error(`Unauthenticated`);
  const user = await User.findById(userId);
  if (!user) throw new Error(`User doesn't exist`);
  const bookings = await Booking.find({ user });
  return bookings.map((booking) => transformBooking(booking));
}

// Mutations
async function createBooking(
  _,
  { eventId },
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
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error(`Event doesn't exist`);
  }
  let booking = await Booking.findOne({
    user: userId,
    event: eventId,
  });
  if (booking) {
    throw new Error("You have already booked this event");
  }
  booking = await Booking.create({
    user: userId,
    event,
  });
  return transformBooking(booking);
}

async function removeBooking(
  _,
  { bookingId },
  {
    request: {
      headers: { isAuthenticated, userId },
    },
  }
) {
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
  await Booking.findByIdAndRemove(bookingId);
  return transformEvent(booking.event);
}

export const bookingQueries = {
  bookings,
};

export const bookingMutations = {
  createBooking,
  removeBooking,
};
