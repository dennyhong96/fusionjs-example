import { useMutation } from "react-apollo";

import useApolloCache from "../hooks/useApolloCache";
import Card from "../components/Card";
import ConfirmationModal from "../components/ConfirmationModal";
import { CANCEL_BOOKING, GET_BOOKINGS } from "../graphql/client/booking";
import { formatDate, formatPrice, formatTime, formatUsername } from "../utils";

export default function BookingCard({ booking }) {
  const [cancelBooking] = useMutation(CANCEL_BOOKING);
  const { updateCachedData } = useApolloCache({
    query: GET_BOOKINGS,
    cacheKey: "bookings",
  });

  const handleCancelEvent = async (bookingId) => {
    await cancelBooking({
      variables: { bookingId },
    });
    updateCachedData((bookings) =>
      bookings.filter((b) => b._id !== booking._id)
    );
  };

  return (
    <Card>
      <Card.Column $w="70%">
        <h3>{booking.event.title}</h3>
        <p>Date: {formatDate(booking.event.date)}</p>
        <p>Time: {formatTime(booking.event.date)}</p>
        <p>Price: {formatPrice(booking.event.price)}</p>
      </Card.Column>
      <Card.Column $w="30%" $align="end">
        <p>Host: {formatUsername(booking.event.createdBy.email)}</p>
        <p>Booked on: {formatDate(booking.createdAt)}</p>
        <ConfirmationModal
          triggerText="Cancel booking"
          title="Cancel booking"
          description="Are you sure you want to cancel this booking?"
          onConfirm={handleCancelEvent.bind(null, booking._id)}
          cancelText="Go back"
          confirmText="Yes, cancel"
        />
      </Card.Column>
    </Card>
  );
}
