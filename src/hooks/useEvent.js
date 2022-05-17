import { useCallback } from "react";
import { useMutation, useQuery } from "react-apollo";

import { CREATE_EVENT, GET_EVENTS } from "../graphql/client/event";
import useApolloCache from "./useApolloCache";

const useEvent = () => {
  const { updateCache } = useApolloCache(GET_EVENTS);

  const { data } = useQuery(GET_EVENTS, {
    fetchPolicy: "cache-and-network",
  });
  const [createMutation] = useMutation(CREATE_EVENT);

  const createEvent = useCallback(
    async ({ title, description, price, date }) => {
      const {
        data: { createEvent: newEvent },
      } = await createEvent({
        variables: {
          eventInput: {
            title,
            description,
            price,
            date: new Date(date).toISOString(),
          },
        },
      });
      updateCache((events) => [...events, newEvent]);
    },
    [createMutation, updateCache]
  );

  return {
    events: data?.events ?? [],
    createEvent,
  };
};

export default useEvent;
