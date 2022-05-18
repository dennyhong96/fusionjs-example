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
          _id
          email
        }
      }
    }
  }
`;
