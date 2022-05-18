import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event", // set up a relation, model name is referenced here
    },
  ], // a list of event ids
});

export const User = model("User", userSchema);
