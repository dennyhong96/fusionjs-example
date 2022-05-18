import gql from "graphql-tag";

import { userTypeDef } from "../../modules/auth/api";
import { bookingTypeDef } from "../../modules/booking/api";
import { eventTypeDef } from "../../modules/event/api";

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

export const typeDefs = gql`
  ${userTypeDef}
  ${bookingTypeDef}
  ${eventTypeDef}
  ${rootTypeDef}
`;
