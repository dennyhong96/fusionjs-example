import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // set up a relation, model name is referenced here
  },

  // TODO: Seperate into own model?
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
});

export const Event = model("Event", eventSchema);
