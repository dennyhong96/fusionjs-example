const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./models/event");

const app = express();
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),

    // Resolvers
    rootValue: {
      async events() {
        const events = await Event.find();
        return events;
      },

      async createEvent({ eventInput }) {
        const newEvent = await Event.create({
          ...eventInput,
          date: new Date(eventInput.date),
        });
        return newEvent;
      },
    },

    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI ?? "")
  .then(() => {
    const port = process.env.PORT ?? 8000;
    app.listen(port, () => {
      console.log(`Server up on port ${port}...`);
    });
  })
  .catch(console.error);
