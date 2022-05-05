const userResolvers = require("./user");
const eventResolvers = require("./event");
const bookingResolvers = require("./booking");

// Resolvers
module.exports = {
  ...userResolvers,
  ...eventResolvers,
  ...bookingResolvers,
};
