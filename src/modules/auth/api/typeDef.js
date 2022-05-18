module.exports = {
  userTypeDef: `
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]!
  }
  
  type Auth {
    user: User!
    token: String!
    tokenExp: String!
  }
  
  input UserInput {
    email: String!
    password: String!
  }
  `,
};
