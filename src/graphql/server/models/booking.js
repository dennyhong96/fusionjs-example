const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Booking", bookingSchema);

/*
Event.findById
Event.find
Event.create
Event.find({_id: {$in: eventIds}})

User.findById
User.findByIdAndUpdate
Event.find({_id: {$in: userIds}})
User.findOne({email})
User.create

Booking.findById
Booking.find({user})
Booking.findOne({user, event})
*/
