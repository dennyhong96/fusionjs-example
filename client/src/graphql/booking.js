import gql from "graphql-tag";

// Queries
export const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
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
        email
      }
    }
  }
`;
