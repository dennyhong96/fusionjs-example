const { bookingQueries, bookingMutations } = require("./booking");
const { eventQueries, eventMutations } = require("./event");
const { userQueries, userMutations } = require("./user");

module.exports = {
  Query: {
    ...bookingQueries,
    ...eventQueries,
    ...userQueries,
  },
  Mutation: {
    ...bookingMutations,
    ...eventMutations,
    ...userMutations,
  },
};
