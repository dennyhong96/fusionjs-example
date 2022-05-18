const DataLoader = require("dataloader");

const { User } = require("./model");
const { eventLoader } = require("../../event/api/loader");

// Dataloaders for batching DB calls
const userLoader = new DataLoader(loadUsers);

// Dynamic Relationship loaders
async function loadUsers(userIds) {
  const users = await User.find({ _id: { $in: userIds } }).select("-password");
  users.sort(
    (u1, u2) =>
      userIds.indexOf(u1._id.toString()) - userIds.indexOf(u2._id.toString())
  );
  return users.map((user) => transformUser(user));
}

async function loadUser(userId) {
  return await userLoader.load(userId.toString());
}

// Resovler return type transformers
const transformUser = ({ _doc: user }) => {
  return {
    ...user,
    createdEvents: () =>
      eventLoader.loadMany(user.createdEvents.map((oid) => oid.toString())),
  };
};

module.exports = {
  userLoader,
  loadUsers,
  loadUser,
  transformUser,
};
