const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const { transformUser } = require("./loaders");

// Resolvers
module.exports = {
  // Queries
  async users() {
    const users = await User.find().select("-password");
    return users.map((user) => transformUser(user));
  },

  // Mutations
  async createUser({ userInput }) {
    const { email, password } = userInput;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }
    const passwordSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    const newUser = await User.create({
      ...userInput,
      password: hashedPassword,
    });
    delete newUser.password; // hide password from response
    return transformUser(newUser);
  },
};
