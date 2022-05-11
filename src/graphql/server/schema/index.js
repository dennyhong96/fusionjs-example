const gql = require("graphql-tag");

const userSchema = require("./user");
const eventSchema = require("./event");
const bookingSchema = require("./booking");

const rootSchema = `
type Query {
  events: [Event!]!
  users: [User!]!
  bookings: [Booking!]!
}

type Mutation {
  createEvent(eventInput: EventInput): Event!
  createUser(userInput: UserInput): User!
  login(email: String!, password: String!): Auth!
  createBooking(eventId: ID!): Booking!
  removeBooking(bookingId: ID!): Event!
}
`;

// const rootSchema = `
// type RootQuery {
//   events: [Event!]!
//   users: [User!]!
//   bookings: [Booking!]!
// }

// type RootMutation {
//   createEvent(eventInput: EventInput): Event!
//   createUser(userInput: UserInput): User!
//   login(email: String!, password: String!): Auth!
//   createBooking(eventId: ID!): Booking!
//   removeBooking(bookingId: ID!): Event!
// }

// schema {
//   query: RootQuery
//   mutation: RootMutation
// }
// `;

module.exports = gql`
  ${userSchema}
  ${eventSchema}
  ${bookingSchema}
  ${rootSchema}
`;