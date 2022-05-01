const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ Hello: "World" });
});

app.listen(8000);
