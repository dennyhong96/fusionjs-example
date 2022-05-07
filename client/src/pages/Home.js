import { styled } from "fusion-plugin-styletron-react";
import { useMutation, useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import gql from "graphql-tag";

import Card from "../components/Card";
import ConfirmationModal from "../components/ConfirmationModal";
import { formatDate, formatPrice, formatUsername } from "../utils";
import { CreateEventModal } from "../components/CreateEventModal";

const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      price
      date
      createdBy {
        email
      }
    }
  }
`;

const CREATE_EVENT = gql`
  mutation CreatEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id
      title
      description
      price
      date
      createdBy {
        email
      }
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($eventId: ID!) {
    createBooking(eventId: $eventId) {
      _id
      createdAt
      event {
        _id
        title
        price
        date
        createdBy {
          email
        }
      }
    }
  }
`;

const PageWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const EventsList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function HomePage({}) {
  const { data, loading } = useQuery(GET_EVENTS, {
    fetchPolicy: "cache-and-network",
  });
  const [createBooking] = useMutation(CREATE_BOOKING);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleBooking = async (eventId, evt) => {
    await createBooking({
      variables: { eventId },
    });
  };

  return (
    <PageWrapper>
      {isLoggedIn && (
        <Card>
          <Card.Column $w="100%" $align="center">
            <CreateEventModal />
          </Card.Column>
        </Card>
      )}
      {loading && <p>Loading...</p>}
      {!loading && (
        <EventsList>
          {data.events.length === 0 && <p>No events listed</p>}
          {data.events.map((event) => (
            <li key={event._id}>
              <Card>
                <Card.Column $w="70%">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>Price: {formatPrice(event.price)}</p>
                </Card.Column>
                <Card.Column $w="30%" $align="end" $justify="center">
                  <p>Date: {formatDate(event.date)}</p>
                  <p>Host: {formatUsername(event.createdBy.email)}</p>
                  {isLoggedIn && (
                    <ConfirmationModal
                      triggerText="Book this event"
                      title="Book event"
                      description="Are you sure you want to book this event?"
                      onConfirm={handleBooking.bind(null, event._id)}
                    />
                  )}
                </Card.Column>
              </Card>
            </li>
          ))}
        </EventsList>
      )}
    </PageWrapper>
  );
}
