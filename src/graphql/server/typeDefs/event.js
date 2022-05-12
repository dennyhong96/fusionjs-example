module.exports = `
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  createdBy: User
  bookings: [Booking!]!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}
`;
