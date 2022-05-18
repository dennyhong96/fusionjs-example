const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("./model");
const { transformDate } = require("../../../library");
const { transformUser } = require("../../../library/api/loaders");

const hashPassword = async (password) => {
  const passwordSalt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, passwordSalt);
};

// Resolvers

// Queries
async function users() {
  const users = await User.find().select("-password");
  return users.map((user) => transformUser(user));
}

// Mutations
async function createUser(_, { userInput }) {
  const { email, password } = userInput;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(`User with email ${email} already exists`);
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    ...userInput,
    password: hashedPassword,
  });
  // delete newUser.password; // hide password from response
  return transformUser(newUser);
}

async function login(_, { email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 3; // 3hr out
  return {
    user: transformUser(user),
    token: jwt.sign({ exp, data: user._doc }, process.env.JWT_PRIVATE_KEY),
    tokenExp: transformDate(exp * 1000),
  };
} // login has no side effect but is considered a mutation because it's an operation that result from user actions

module.exports = {
  userQueries: {
    users,
  },
  userMutations: {
    createUser,
    login,
  },
};
