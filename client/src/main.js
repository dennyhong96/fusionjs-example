import React from "react";
import App from "fusion-react";
import HelmetPlugin from "fusion-plugin-react-helmet-async";

import Root from "./components/Root";
import TodosPlugin from "./plugins/todos";

export default async function start() {
  const app = new App(<Root />);

  app.register(HelmetPlugin);

  // Only run on server
  if (__NODE__) {
    app.middleware(require("koa-bodyparser")());
    app.middleware(TodosPlugin);
  }

  return app;
}
