import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Fragment } from "react";

import Modal from "../../components/Modal";

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
  return (
    <Fragment>
      <Modal trigger={<button>Modal</button>}>This is a test</Modal>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </Fragment>
  );
}
