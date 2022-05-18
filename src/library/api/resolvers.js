import { userQueries, userMutations } from "../../modules/auth/api";
import { eventQueries, eventMutations } from "../../modules/event/api";
import { bookingQueries, bookingMutations } from "../../modules/booking/api";

export const resolvers = {
  Query: {
    ...userQueries,
    ...bookingQueries,
    ...eventQueries,
  },
  Mutation: {
    ...userMutations,
    ...bookingMutations,
    ...eventMutations,
  },
};
