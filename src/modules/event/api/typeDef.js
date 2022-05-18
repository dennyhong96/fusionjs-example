export const eventTypeDef = `
type Coordinates {
  latitude: Float!
  longitude: Float!
}

input CoordinatesInput {
  latitude: Float!
  longitude: Float!
}

type EventLocationResult {
  _id: ID!
  address: String!
  coordinates: Coordinates!
}

type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  createdBy: User
  bookings: [Booking!]!
  address: String!
  coordinates: Coordinates!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
  address: String!
  coordinates: CoordinatesInput!
}
`;
