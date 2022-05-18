import DataLoader from "dataloader";

import { User } from ".";
import { eventLoader } from "../../event/api";

// Dataloaders for batching DB calls
export const userLoader = new DataLoader(loadUsers);

// Dynamic Relationship loaders
export async function loadUsers(userIds) {
  const users = await User.find({ _id: { $in: userIds } }).select("-password");
  users.sort(
    (u1, u2) =>
      userIds.indexOf(u1._id.toString()) - userIds.indexOf(u2._id.toString())
  );
  return users.map((user) => transformUser(user));
}

export async function loadUser(userId) {
  return await userLoader.load(userId.toString());
}

// Resovler return type transformers
export const transformUser = ({ _doc: user }) => {
  return {
    ...user,
    createdEvents: () =>
      eventLoader.loadMany(user.createdEvents.map((oid) => oid.toString())),
  };
};
