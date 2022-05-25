import { Fragment } from "react";
import { Helmet } from "fusion-plugin-react-helmet-async";
import { Card, StyledBody } from "baseui/card";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

import { useAuth } from "../../../library/common/hooks";
import { CreateEventModal, EventCard, EventDetailsModal } from "../frames";
import { useEventList } from "../../../services/event";
import { useStyletron } from "baseui";

export function EventContainer() {
  const [css] = useStyletron();
  const { events } = useEventList();
  const { isLoggedIn } = useAuth();

  return (
    <Fragment>
      <Helmet>
        <title>Events | EasyEvents</title>
      </Helmet>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
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
        <ul
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          {events.length === 0 && <p>No events listed</p>}
          {events.map((event) => (
            <li key={event._id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
      <EventDetailsModal />
      {/* <img src={assetUrl("../static/images/logo.png")} /> */}
    </Fragment>
  );
}

export default EventContainer;
