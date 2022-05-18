import { Booking } from ".";
import { loadUser } from "../../auth/api";
import { loadEvent } from "../../event/api";
import { transformDate } from "../../../library";

export async function loadBookings(eventId) {
  const bookings = await Booking.find({ event: eventId });
  return bookings.map((booking) => transformBooking(booking));
}

export const transformBooking = ({ _doc: booking }) => {
  return {
    ...booking,
    event: loadEvent.bind(null, booking.event._id),
    user: loadUser.bind(null, booking.user._id),
    createdAt: transformDate(booking.createdAt),
    updatedAt: transformDate(booking.updatedAt),
  };
};
