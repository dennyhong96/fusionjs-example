import { Fragment, useEffect, useState } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { useMutation, useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import { useSearchParams } from "fusion-plugin-react-router";
import { Helmet } from "fusion-plugin-react-helmet-async";

import useApolloCache from "../hooks/useApolloCache";
import Modal from "./Modal";
import { CREATE_BOOKING, GET_BOOKINGS } from "../graphql/client/booking";
import { GET_EVENTS } from "../graphql/client/event";
import { formatDate, formatPrice, formatTime, formatUsername } from "../utils";
import useSafeDispatch from "../hooks/useSafeDispath";

const Details = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

export function EventDetailsModal() {
  const [event, unsafeSetEvent] = useState(null);
  const setEvent = useSafeDispatch(unsafeSetEvent);
  const { data } = useQuery(GET_EVENTS);
  const [createBooking] = useMutation(CREATE_BOOKING);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.auth.user);
  const { updateCachedData } = useApolloCache({
    query: GET_BOOKINGS,
    cacheKey: "bookings",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get("eventId");
    const events = data?.events;
    if (events && events.length && eventId) {
      const event = events.find((e) => e._id === eventId);
      if (!event) return setEvent(null);
      setEvent(event);
    } else {
      setEvent(null);
    }
  }, [searchParams, data]);

  const isMyEvent =
    event && isLoggedIn && event.createdBy._id === loggedInUser?._id;

  const handleBooking = async (eventId) => {
    const {
      data: { createBooking: newBooking },
    } = await createBooking({
      variables: { eventId },
    });
    updateCachedData((bookings) => [...bookings, newBooking]);
    handleClose();
  };

  const handleClose = () => {
    setSearchParams({});
  };

  return (
    <Modal open={!!event} onClose={handleClose} $maxWidth="600px">
      {event && (
        <Fragment>
          <Helmet>
            <title>{event.title} | EasyEvents</title>
          </Helmet>
          <Details>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <p>Date: {formatDate(event.date)}</p>
            <p>Time: {formatTime(event.date)}</p>
            <p>Host: {formatUsername(event.createdBy.email)}</p>
            <p>Price: {formatPrice(event.price)}</p>
            <Actions>
              <button onClick={handleClose}>Go back</button>
              <button
                disabled={!isLoggedIn || isMyEvent}
                onClick={handleBooking.bind(null, event._id)}
              >
                Book event
              </button>
            </Actions>
          </Details>
        </Fragment>
      )}
    </Modal>
  );
}
