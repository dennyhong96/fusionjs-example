import { Fragment } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { BookingCard } from "../frames";
import { useBooking } from "../../../library";

const BookingList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export function BookingContainer() {
  const { bookings } = useBooking();

  return (
    <Fragment>
      <Helmet>
        <title>My bookings | EasyEvents</title>
      </Helmet>
      {bookings.length === 0 ? (
        <p>You have no bookings</p>
      ) : (
        <BookingList>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </BookingList>
      )}
    </Fragment>
  );
}

export default BookingContainer;
