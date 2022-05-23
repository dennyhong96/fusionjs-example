import { useCallback } from "react";
import { useMutation, useQuery } from "react-apollo";

import { useApolloCache, useAuth } from "../../library/common/hooks";
import { CANCEL_BOOKING, CREATE_BOOKING, GET_BOOKINGS } from "./graphql";

export const useBookingsList = () => {
  const { isLoggedIn } = useAuth();

  const { data } = useQuery(GET_BOOKINGS, {
    fetchPolicy: "cache-and-network",
    skip: !isLoggedIn,
  });

  return { bookings: data?.bookings ?? [] };
};

export const useCreateBooking = () => {
  const { updateCache } = useApolloCache(GET_BOOKINGS);

  const [createMutation] = useMutation(CREATE_BOOKING);

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

  return { createBooking };
};

export const useCancelBooking = () => {
  const { updateCache } = useApolloCache(GET_BOOKINGS);
  const [cancelMutation] = useMutation(CANCEL_BOOKING);

  const cancelBooking = useCallback(
    async ({ bookingId }) => {
      await cancelMutation({
        variables: { bookingId },
      });
      updateCache((bookings) => bookings.filter((b) => b._id !== bookingId));
    },
    [cancelMutation, updateCache]
  );

  return { cancelBooking };
};
