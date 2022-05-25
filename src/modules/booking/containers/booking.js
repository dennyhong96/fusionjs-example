import { Fragment } from "react";
import { useStyletron } from "baseui";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { useBookingsList } from "../../../services/booking";
import { BookingCard } from "../frames";
import { ParagraphMedium } from "baseui/typography";

export function BookingContainer() {
  const [css] = useStyletron();
  const { bookings } = useBookingsList();

  return (
    <Fragment>
      <Helmet>
        <title>My bookings | EasyEvents</title>
      </Helmet>
      {bookings.length === 0 ? (
        <ParagraphMedium>You have no bookings</ParagraphMedium>
      ) : (
        <ul
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          {bookings.map((booking) => (
            <li key={booking._id}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default BookingContainer;
