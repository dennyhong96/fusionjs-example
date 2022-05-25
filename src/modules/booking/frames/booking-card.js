import { Card, StyledBody, StyledAction } from "baseui/card";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

import {
  ConfirmationModal,
  InfoItem,
} from "../../../library/common/components";
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
    <Card title={booking.event.title}>
      <StyledBody>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale800">
          <FlexGridItem
            display="flex"
            flexDirection="column"
            gridGap="scale100"
          >
            <InfoItem title="Date" titleWidth="90px">
              {formatDate(booking.event.date)}
            </InfoItem>
            <InfoItem title="Time" titleWidth="90px">
              {formatTime(booking.event.date)}
            </InfoItem>
            <InfoItem title="Price" titleWidth="90px">
              {formatPrice(booking.event.price)}
            </InfoItem>
          </FlexGridItem>
          <FlexGridItem
            display="flex"
            flexDirection="column"
            overrides={{
              Block: { style: { width: "30%", flexGrow: "0" } },
            }}
            gridGap="scale100"
          >
            <InfoItem title="Host" titleWidth="90px">
              {formatUsername(booking.event.createdBy.email)}
            </InfoItem>
            <InfoItem title="Booked on" titleWidth="90px">
              {formatDate(booking.createdAt)}
            </InfoItem>
          </FlexGridItem>
        </FlexGrid>
      </StyledBody>
      <StyledAction>
        <ConfirmationModal
          triggerText="Cancel booking"
          title="Cancel booking"
          description="Are you sure you want to cancel this booking?"
          onConfirm={handleCancelEvent.bind(null, booking._id)}
          cancelText="Go back"
          confirmText="Yes, cancel"
        />
      </StyledAction>
    </Card>
  );
}
