import React from "react";
import App from "fusion-react";
import { RenderToken } from "fusion-core";
import { FetchToken } from "fusion-tokens";
import HelmetPlugin from "fusion-plugin-react-helmet-async";
import Router from "fusion-plugin-react-router";
import Styletron from "fusion-plugin-styletron-react";
import {
  ApolloRenderEnhancer,
  ApolloClientPlugin,
  ApolloClientToken,
  GraphQLEndpointToken,
  ApolloClientCredentialsToken,
} from "fusion-plugin-apollo";
import isomorphicFetch from "isomorphic-fetch";

import Root from "./components/Root";
import TodosPlugin from "./plugins/todos";

export default async function start() {
  const app = new App(<Root />);

  __BROWSER__ && app.register(FetchToken, isomorphicFetch);
  __NODE__ && app.register(FetchToken, isomorphicFetch);

  app.register(HelmetPlugin);
  app.register(Router);
  app.register(Styletron);

  app.enhance(RenderToken, ApolloRenderEnhancer);
  app.register(ApolloClientCredentialsToken, "include");
  app.register(ApolloClientToken, ApolloClientPlugin);
  app.register(GraphQLEndpointToken, "http://localhost:8000/graphql");

  // Only run on server
  if (__NODE__) {
    app.middleware(require("koa-bodyparser")());
    app.middleware(TodosPlugin);
  }

  return app;
}
