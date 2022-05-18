import { useCallback } from "react";
import { useMutation, useQuery } from "react-apollo";

import {
  CREATE_EVENT,
  EVENT_LOCATIONS,
  GET_EVENTS,
  SEARCH_EVENT_LOCATIONS,
} from "../../../modules";
import { useApolloCache } from ".";

// TODO: Move to modules?
export const useEvent = ({ locationSearchQuery: query } = {}) => {
  const { data: eventsData } = useQuery(GET_EVENTS, {
    fetchPolicy: "cache-and-network",
  });
  const { updateCache: updateEventCache } = useApolloCache(GET_EVENTS);
  const [createMutation] = useMutation(CREATE_EVENT);

  const { data: eventLocationsData } = useQuery(EVENT_LOCATIONS, {
    fetchPolicy: "cache-only",
    variables: { query },
  });
  const { getCache, updateCache: updateLocationCache } = useApolloCache(
    EVENT_LOCATIONS,
    {
      variables: { query },
    }
  );
  const [searchLocationMutation, { loading: locationLoading }] = useMutation(
    SEARCH_EVENT_LOCATIONS
  );

  const createEvent = useCallback(
    async ({ title, description, price, date, address, coordinates }) => {
      const {
        data: { createEvent: newEvent },
      } = await createMutation({
        variables: {
          eventInput: {
            title,
            description,
            price,
            date: new Date(date).toISOString(),
            address,
            coordinates,
          },
        },
      });
      updateEventCache((events) => [...events, newEvent]);
    },
    [createMutation, updateEventCache]
  );

  const searchLocation = useCallback(async () => {
    if (!query) return;
    const cachedResults = getCache();
    if (cachedResults.length) return;
    const {
      data: { searchEventLocations: locations },
    } = await searchLocationMutation({
      variables: { query },
    });
    updateLocationCache(() => locations);
  }, [query, searchLocationMutation, updateLocationCache]);

  return {
    events: eventsData?.events ?? [],
    createEvent,
    locations: eventLocationsData?.eventLocations ?? [],
    locationLoading,
    searchLocation,
  };
};
