import { Fragment } from "react";
import { assetUrl } from "fusion-core";
import { styled } from "fusion-plugin-styletron-react";
import { Helmet } from "fusion-plugin-react-helmet-async";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

import { useAuth } from "../../../library/common/hooks";
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
            <StyledBody>
              <FlexGrid flexGridColumnCount={1}>
                <FlexGridItem
                  minHeight="150px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CreateEventModal />
                </FlexGridItem>
              </FlexGrid>
            </StyledBody>
          </Card>
        )}
        <EventList>
          {events.length === 0 && <p>No events listed</p>}
          {events.map((event) => (
            <li key={event._id}>
              <EventCard event={event} />
            </li>
          ))}
        </EventList>
      </PageWrapper>
      <EventDetailsModal />
      {/* <img src={assetUrl("../static/images/logo.png")} /> */}
    </Fragment>
  );
}

export default EventContainer;
