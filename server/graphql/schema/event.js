module.exports = `
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  createdBy: User
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}
`;
