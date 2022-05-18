import gql from "graphql-tag";

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
      address
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const SEARCH_EVENT_LOCATIONS = gql`
  mutation SearchEventLocations($query: String!) {
    searchEventLocations(query: $query) {
      _id
      address
      coordinates {
        latitude
        longitude
      }
    }
  }
`;
