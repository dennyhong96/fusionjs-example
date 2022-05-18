module.exports = {
  bookingTypeDef: `
  type Booking {
    _id: ID!
    user: User!
    event: Event!
    createdAt: String!
    updatedAt: String!
  }
  `,
};
