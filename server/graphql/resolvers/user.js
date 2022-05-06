const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { transformUser } = require("./loaders");
const { formatDate } = require("../../helpers");

const hashPassword = async (password) => {
  const passwordSalt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, passwordSalt);
};

// Resolvers
module.exports = {
  // Queries
  async users() {
    const users = await User.find().select("-password");
    return users.map((user) => transformUser(user));
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 3; // 3hr out
    return {
      user: transformUser(user),
      token: jwt.sign({ exp, data: user._doc }, process.env.JWT_PRIVATE_KEY),
      tokenExp: formatDate(exp * 1000),
    };
  }, // login is a query since it doesn't mutate date in DB

  // Mutations
  async createUser({ userInput }) {
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
  },
};
