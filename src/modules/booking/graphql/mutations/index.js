import gql from "graphql-tag";

// Mutations
export const CREATE_BOOKING = gql`
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
          _id
          email
        }
      }
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation RemoveBooking($bookingId: ID!) {
    removeBooking(bookingId: $bookingId) {
      _id
      title
      price
      date
      createdBy {
        _id
        email
      }
    }
  }
`;
