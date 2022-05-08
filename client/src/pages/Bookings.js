import { Fragment } from "react";
import { useQuery } from "react-apollo";
import { styled } from "fusion-plugin-styletron-react";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { GET_BOOKINGS } from "../graphql/booking";
import BookingCard from "../components/BookingCard";
import Loader from "../components/Loader";

const BookingList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function BookingsPage({}) {
  const { data, loading } = useQuery(GET_BOOKINGS, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <Fragment>
      <Helmet>
        <title>My bookings | EasyEvents</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        (data.bookings.length === 0 ? (
          <p>You have no bookings</p>
        ) : (
          <BookingList>
            {data.bookings.map((booking) => (
              <li key={booking._id}>
                <BookingCard booking={booking} />
              </li>
            ))}
          </BookingList>
        ))}
    </Fragment>
  );
}
