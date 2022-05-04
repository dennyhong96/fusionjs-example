const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const Event = require("./models/event");
const User = require("./models/user");

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

      type User {
        _id: ID!
        email: String!
        password: String
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
        return events;
      },

      // Mutations
      async createEvent({ eventInput }) {
        const userId = "6272be39e77a5e630f848334"; // TODO: retrieve from header
        if (!(await User.findById(userId))) {
          throw new Error(`User doesn't exist`);
        }
        const newEvent = await Event.create({
          ...eventInput,
          date: new Date(eventInput.date),
          createdBy: userId,
        });
        await User.findByIdAndUpdate(userId, {
          $push: { createdEvents: newEvent },
        });
        return newEvent;
      },

      async createUser({ userInput }) {
        // console.log(this);
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
        newUser.password = null; // hide password from response
        return newUser;
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
