import { useMutation } from "react-apollo";
import { useSelector } from "react-redux";

import useApolloCache from "../hooks/useApolloCache";
import Card from "../components/Card";
import ConfirmationModal from "../components/ConfirmationModal";
import { CREATE_BOOKING, GET_BOOKINGS } from "../graphql/booking";
import { formatDate, formatPrice, formatTime, formatUsername } from "../utils";

export default function EventCard({ event }) {
  const [createBooking] = useMutation(CREATE_BOOKING);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { updateCache } = useApolloCache({
    query: GET_BOOKINGS,
    cacheKey: "bookings",
  });

  const handleBooking = async (eventId) => {
    const {
      data: { createBooking: newBooking },
    } = await createBooking({
      variables: { eventId },
    });
    updateCache((bookings) => [...bookings, newBooking]);
  };

  return (
    <Card>
      <Card.Column $w="70%">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>Price: {formatPrice(event.price)}</p>
        <p>Host: {formatUsername(event.createdBy.email)}</p>
      </Card.Column>
      <Card.Column $w="30%" $align="end" $justify="center">
        <p>Date: {formatDate(event.date)}</p>
        <p>Time: {formatTime(event.date)}</p>
        {isLoggedIn && (
          <ConfirmationModal
            triggerText="Book this event"
            title="Book event"
            description="Are you sure you want to book this event?"
            onConfirm={handleBooking.bind(null, event._id)}
          />
        )}
      </Card.Column>
    </Card>
  );
}
