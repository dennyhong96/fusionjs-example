const { Schema, model } = require("mongoose");

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
});

module.exports = model("Event", eventSchema);

// class Event {
//   constructor(title, description, price, date, createdBy) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.date = new Date(date).toISOString();
//     this.createdBy = createdBy;
//   }
// }

// export default Event;
