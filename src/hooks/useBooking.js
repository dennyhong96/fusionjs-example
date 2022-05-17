import { useCallback } from "react";
import { useMutation, useQuery } from "react-apollo";

import {
  CANCEL_BOOKING,
  CREATE_BOOKING,
  GET_BOOKINGS,
} from "../graphql/client/booking";
import useApolloCache from "./useApolloCache";
import useAuth from "./useAuth";

const useBooking = () => {
  const { updateCache } = useApolloCache(GET_BOOKINGS);
  const { isLoggedIn } = useAuth();

  const { data } = useQuery(GET_BOOKINGS, {
    fetchPolicy: "cache-and-network",
    skip: !isLoggedIn,
  });
  const [createMutation] = useMutation(CREATE_BOOKING);
  const [cancelMutation] = useMutation(CANCEL_BOOKING);

  const createBooking = useCallback(
    async ({ eventId }) => {
      const {
        data: { createBooking: newBooking },
      } = await createMutation({
        variables: { eventId },
      });
      updateCache((bookings) => [...bookings, newBooking]);
    },
    [createMutation, updateCache]
  );

  const cancelBooking = useCallback(
    async ({ bookingId }) => {
      await cancelMutation({
        variables: { bookingId },
      });
      updateCache((bookings) => bookings.filter((b) => b._id !== bookingId));
    },
    [cancelMutation, updateCache]
  );

  return {
    bookings: data?.bookings ?? [],
    createBooking,
    cancelBooking,
  };
};

export default useBooking;
