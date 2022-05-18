const { userQueries, userMutations } = require("../../modules/auth/api");
const { eventQueries, eventMutations } = require("../../modules/event/api");
const {
  bookingQueries,
  bookingMutations,
} = require("../../modules/booking/api");

module.exports = {
  resolvers: {
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
  },
};
