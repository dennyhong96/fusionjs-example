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
      address
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

// Local cache only
export const EVENT_LOCATIONS = gql`
  query EventLocations($query: String!) {
    eventLocations(query: $query) {
      _id
      address
      coordinates {
        latitude
        longitude
      }
    }
  }
`;
