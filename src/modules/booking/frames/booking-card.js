import { Card, ConfirmationModal } from "../../../library/common/components";
import {
  formatDate,
  formatTime,
  formatPrice,
  formatUsername,
} from "../../../library/utilities";
import { useCancelBooking } from "../../../services/booking";

export function BookingCard({ booking }) {
  const { cancelBooking } = useCancelBooking();

  const handleCancelEvent = async (bookingId) => {
    await cancelBooking({ bookingId });
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
