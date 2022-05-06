const { buildSchema } = require("graphql");

const userSchema = require("./user");
const eventSchema = require("./event");
const bookingSchema = require("./booking");

const rootSchema = `
type RootQuery {
  events: [Event!]!
  users: [User!]!
  bookings: [Booking!]!
  login(email: String!, password: String!): Auth!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event!
  createUser(userInput: UserInput): User!
  createBooking(eventId: ID!): Booking!
  removeBooking(bookingId: ID!): Event!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`;

module.exports = buildSchema(`
${userSchema}
${eventSchema}
${bookingSchema}
${rootSchema}
`);
