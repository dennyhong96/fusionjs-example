import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      _id
      createdAt
      updatedAt
      user {
        email
        createdEvents {
          title
          description
        }
      }
      event {
        title
        description
        price
        createdBy {
          email
        }
      }
      __typename
    }
  }
`;

export default function BookingsPage({}) {
  const { data: bookings } = useQuery(GET_BOOKINGS);

  return <pre>{JSON.stringify(bookings, null, 2)}</pre>;
}
