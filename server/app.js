const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const { auth } = require("./middlewares/auth");
const schema = require("./graphql/schema");
const rootResolver = require("./graphql/resolvers");

const app = express();
app.use(express.json());
app.use(auth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: rootResolver,
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
