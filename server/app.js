const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const Event = require("./models/event");
const User = require("./models/user");

// Dynamic Relations
const loadUser = async (userId) => {
  const { _doc: user } = await User.findById(userId).select("-password");
  return {
    ...user,
    createdEvents: loadEvents.bind(null, user.createdEvents),
  };
};

const loadEvents = async (eventIds) => {
  const events = await Event.find({ _id: { $in: eventIds } });
  return events.map(({ _doc: event }) => ({
    ...event,
    createdBy: loadUser.bind(null, event.createdBy),
  }));
};

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
        createdBy: User
      }

      type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
        users: [User!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),

    // Resolvers
    rootValue: {
      // Queries
      async events() {
        const events = await Event.find();
        return events.map(({ _doc: event }) => ({
          ...event,

          // when a response object's field value is a Function
          // GraphQL invokes it when that field is selected by the client
          createdBy: loadUser.bind(null, event.createdBy),
        }));
      },

      async users() {
        const users = await User.find().select("-password");
        return users.map(({ _doc: user }) => ({
          ...user,
          createdEvents: loadEvents.bind(null, user.createdEvents),
        }));
      },

      // Mutations
      async createEvent({ eventInput }) {
        const userId = "6272be39e77a5e630f848334"; // TODO: retrieve from header
        if (!(await User.findById(userId))) {
          throw new Error(`User doesn't exist`);
        }
        const { _doc: newEvent } = await Event.create({
          ...eventInput,
          date: new Date(eventInput.date),
          createdBy: userId,
        });
        await User.findByIdAndUpdate(userId, {
          $push: { createdEvents: newEvent },
        });
        return {
          ...newEvent,
          createdBy: loadUser.bind(null, newEvent.createdBy),
        };
      },

      async createUser({ userInput }) {
        const { email, password } = userInput;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error(`User with email ${email} already exists`);
        }
        const passwordSalt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, passwordSalt);
        const { _doc: newUser } = await User.create({
          ...userInput,
          password: hashedPassword,
        });
        delete newUser.password; // hide password from response
        return {
          ...newUser,
          createdEvents: loadEvents.bind(null, newUser.createdEvents),
        };
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
