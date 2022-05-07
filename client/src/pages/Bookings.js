import { useQuery, useMutation } from "react-apollo";
import gql from "graphql-tag";
import { styled } from "fusion-plugin-styletron-react";

import Card from "../components/Card";
import ConfirmationModal from "../components/ConfirmationModal";
import { formatDate, formatPrice, formatUsername } from "../utils";

const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      _id
      createdAt
      event {
        _id
        title
        price
        date
        createdBy {
          email
        }
      }
    }
  }
`;

const CANCEL_BOOKING = gql`
  mutation RemoveBooking($bookingId: ID!) {
    removeBooking(bookingId: $bookingId) {
      _id
      title
      price
      date
      createdBy {
        email
      }
    }
  }
`;

const BookingsList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function BookingsPage({}) {
  const { data, loading } = useQuery(GET_BOOKINGS, {
    fetchPolicy: "cache-and-network",
  });
  const [cancelBooking] = useMutation(CANCEL_BOOKING);

  const handleCancelEvent = async (bookingId) => {
    await cancelBooking({
      variables: { bookingId },
    });
  };

  if (loading) return <p>Loading...</p>;
  return data.bookings.length === 0 ? (
    <p>You have no bookings</p>
  ) : (
    <BookingsList>
      {data.bookings.map((booking) => (
        <li key={booking._id}>
          <Card>
            <Card.Column $w="70%">
              <h3>{booking.event.title}</h3>
              <p>Date: {formatDate(booking.event.date)}</p>
              <p>Host: {formatUsername(booking.event.createdBy.email)}</p>
              <p>Price: {formatPrice(booking.event.price)}</p>
            </Card.Column>
            <Card.Column $w="30%" $align="end">
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
        </li>
      ))}
    </BookingsList>
  );
}
