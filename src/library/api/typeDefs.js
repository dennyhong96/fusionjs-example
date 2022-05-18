const gql = require("graphql-tag");

const { userTypeDef } = require("../../modules/auth/api");
const { bookingTypeDef } = require("../../modules/booking/api");
const { eventTypeDef } = require("../../modules/event/api");

const rootTypeDef = `
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

module.exports = {
  typeDefs: gql`
    ${userTypeDef}
    ${bookingTypeDef}
    ${eventTypeDef}
    ${rootTypeDef}
  `,
};
