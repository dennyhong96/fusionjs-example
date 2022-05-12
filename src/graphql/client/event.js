import gql from "graphql-tag";

// Queries
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      price
      date
      createdBy {
        _id
        email
      }
      bookings {
        _id
        user {
          email
        }
      }
    }
  }
`;

// Mutations
export const CREATE_EVENT = gql`
  mutation CreatEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id
      title
      description
      price
      date
      createdBy {
        _id
        email
      }
      bookings {
        _id
        user {
          email
        }
      }
    }
  }
`;
