import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "fusion-plugin-react-router";
import { Helmet } from "fusion-plugin-react-helmet-async";
import { Heading, HeadingLevel } from "baseui/heading";
import { ListItem, ListItemLabel } from "baseui/list";
import { Button } from "baseui/button";

import { Modal, Map, InfoItem } from "../../../library/common/components";
import { useSafeDispatch, useAuth } from "../../../library/common/hooks";
import {
  formatDate,
  formatPrice,
  formatTime,
  formatUsername,
} from "../../../library/utilities";

import { useCreateBooking } from "../../../services/booking";
import { useEventList } from "../../../services/event";
import { useStyletron } from "baseui";

export function EventDetailsModal() {
  const [css] = useStyletron();
  const [showAttendees, unsafeSetShowAttendees] = useState(false);
  const setShowAttendees = useSafeDispatch(unsafeSetShowAttendees);
  const { events } = useEventList();
  const { createBooking } = useCreateBooking();
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
    <Modal
      open={!!event}
      onClose={handleClose}
      renderHeader={
        event && (
          <HeadingLevel>
            <Heading $as="h4">{event.title}</Heading>
          </HeadingLevel>
        )
      }
      renderActions={
        event && (
          <Fragment>
            <Button
              kind="secondary"
              onClick={handleClose}
              overrides={{
                Root: {
                  style: {
                    marginRight: "1rem",
                  },
                },
              }}
            >
              Go back
            </Button>
            <Button
              disabled={!isLoggedIn || isMyEvent}
              onClick={handleBooking.bind(null, event._id)}
            >
              Book event
            </Button>
          </Fragment>
        )
      }
    >
      {event && (
        <Fragment>
          <Helmet>
            <title>{event.title} | EasyEvents</title>
          </Helmet>
          <div
            className={css({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxHeight: "min(60vh,600px)",
              overflow: "auto",
            })}
          >
            <InfoItem title="Description" titleWidth="90px">
              {event.description}
            </InfoItem>
            <InfoItem title="Date" titleWidth="90px">
              {formatDate(event.date)}
            </InfoItem>
            <InfoItem title="Time" titleWidth="90px">
              {formatTime(event.date)}
            </InfoItem>
            <InfoItem title="Host" titleWidth="90px">
              {formatUsername(event.createdBy.email)}
            </InfoItem>
            <InfoItem title="Price" titleWidth="90px">
              {formatPrice(event.price)}
            </InfoItem>
            {!!event.bookings.length && (
              <Fragment>
                <InfoItem title="Attendees" titleWidth="90px">
                  <Button
                    size="mini"
                    onClick={() => setShowAttendees((prev) => !prev)}
                  >
                    {showAttendees ? "Hide" : "Show"} {event.bookings.length}{" "}
                    Attendees
                  </Button>
                </InfoItem>
                {showAttendees && (
                  <ul>
                    {event.bookings.map((b) => (
                      <ListItem
                        key={b._id}
                        artwork={() => (
                          <svg
                            className={css({
                              width: "24px",
                              height: "24px",
                              flex: `0 0 24px`,
                            })}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      >
                        <ListItemLabel>
                          {formatUsername(b.user.email)}
                        </ListItemLabel>
                      </ListItem>
                    ))}
                  </ul>
                )}
              </Fragment>
            )}
            <InfoItem title="Address" titleWidth="90px">
              {event.address}
            </InfoItem>
            <Map
              address={event.address}
              longitude={event.coordinates.longitude}
              latitude={event.coordinates.latitude}
            />
          </div>
        </Fragment>
      )}
    </Modal>
  );
}
