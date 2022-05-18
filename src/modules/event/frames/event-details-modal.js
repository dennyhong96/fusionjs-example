import { Fragment, useEffect, useState } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { useSearchParams } from "fusion-plugin-react-router";
import { Helmet } from "fusion-plugin-react-helmet-async";

import {
  Modal,
  formatDate,
  formatPrice,
  formatTime,
  formatUsername,
  useSafeDispatch,
  useBooking,
  useEvent,
  useAuth,
  Map,
} from "../../../library";

const Details = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AttendeeContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const Attendee = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const Icon = styled("svg", ({ $size = 24 }) => ({
  width: `${$size}px`,
  height: `${$size}px`,
  flex: `0 0 ${$size}px`,
}));

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

export function EventDetailsModal() {
  const { events } = useEvent();
  const { createBooking } = useBooking();
  const { user, isLoggedIn } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [event, unsafeSetEvent] = useState(null);
  const setEvent = useSafeDispatch(unsafeSetEvent);

  useEffect(() => {
    const eventId = searchParams.get("eventId");
    if (events.length && eventId) {
      const event = events.find((e) => e._id === eventId);
      if (!event) return setEvent(null);
      setEvent(event);
    } else {
      setEvent(null);
    }
  }, [searchParams, events]);

  const isMyEvent = event && isLoggedIn && event.createdBy._id === user?._id;

  const handleBooking = async (eventId) => {
    await createBooking({ eventId });
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
            <p>Address: {event.address}</p>
            {!!event.bookings.length && (
              <AttendeeContainer>
                <p>Attendees: </p>
                <ul>
                  {event.bookings.map((b) => (
                    <Attendee key={b._id}>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clipRule="evenodd"
                        />
                      </Icon>
                      {formatUsername(b.user.email)}
                    </Attendee>
                  ))}
                </ul>
              </AttendeeContainer>
            )}
            <Map
              longitude={event.coordinates.longitude}
              latitude={event.coordinates.latitude}
            />
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
