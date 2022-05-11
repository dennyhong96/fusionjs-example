import { Fragment } from "react";
import { useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import { styled } from "fusion-plugin-styletron-react";
import { Helmet } from "fusion-plugin-react-helmet-async";

import Card from "../components/Card";
import { CreateEventModal } from "../components/CreateEventModal";
import EventCard from "../components/EventCard";
import { EventDetailsModal } from "../components/EventDetailsModal";
import { GET_EVENTS } from "../graphql/client/event";
import { assetUrl } from "fusion-core";

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

export default function HomePage({}) {
  const { data } = useQuery(GET_EVENTS, {
    fetchPolicy: "cache-and-network",
  });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
        {!!data?.events && (
          <EventList>
            {data.events.length === 0 && <p>No events listed</p>}
            {data.events.map((event) => (
              <li key={event._id}>
                <EventCard event={event} />
              </li>
            ))}
          </EventList>
        )}
      </PageWrapper>
      <EventDetailsModal />
      {/* <img src={assetUrl("../static/images/logo.png")} /> */}
    </Fragment>
  );
}
