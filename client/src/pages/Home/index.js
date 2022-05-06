import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const GET_EVENTS = gql`
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
        password
        createdEvents {
          title
          description
        }
        __typename
      }
      __typename
    }
  }
`;

export default function HomePage({}) {
  const { data: events } = useQuery(GET_EVENTS);
  return <pre>{JSON.stringify(events, null, 2)}</pre>;
}
