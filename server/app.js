const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
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
