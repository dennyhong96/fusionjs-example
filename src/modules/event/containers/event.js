import { Fragment } from "react";
import { assetUrl } from "fusion-core";
import { styled } from "fusion-plugin-styletron-react";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { useAuth } from "../../../library/common/hooks";
import { Card } from "../../../library/common/components";
import { CreateEventModal, EventCard, EventDetailsModal } from "../frames";
import { useEventList } from "../../../services/event";

const PageWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const EventList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export function EventContainer() {
  const { events } = useEventList();
  const { isLoggedIn } = useAuth();

  return (
    <Fragment>
      <Helmet>
        <title>Events | EasyEvents</title>
      </Helmet>
      <PageWrapper>
        {isLoggedIn && (
          <Card>
            <Card.Column $w="100%" $align="center">
              <CreateEventModal />
            </Card.Column>
          </Card>
        )}
        {
          <EventList>
            {events.length === 0 && <p>No events listed</p>}
            {events.map((event) => (
              <li key={event._id}>
                <EventCard event={event} />
              </li>
            ))}
          </EventList>
        }
      </PageWrapper>
      <EventDetailsModal />
      {/* <img src={assetUrl("../static/images/logo.png")} /> */}
    </Fragment>
  );
}

export default EventContainer;
