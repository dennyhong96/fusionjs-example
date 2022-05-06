import React from "react";
import App from "fusion-react";
import { RenderToken } from "fusion-core";
import { FetchToken } from "fusion-tokens";
import HelmetPlugin from "fusion-plugin-react-helmet-async";
import Router from "fusion-plugin-react-router";
import Styletron from "fusion-plugin-styletron-react";
import UniversalEvents, {
  UniversalEventsToken,
} from "fusion-plugin-universal-events";
import {
  ApolloRenderEnhancer,
  ApolloClientPlugin,
  ApolloClientToken,
  GraphQLEndpointToken,
  ApolloClientCredentialsToken,
  GetApolloClientLinksToken,
} from "fusion-plugin-apollo";
import { setContext } from "apollo-link-context";
import isomorphicFetch from "isomorphic-fetch";
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from "fusion-plugin-react-redux";
import ReduxActionEmitterEnhancer from "fusion-plugin-redux-action-emitter-enhancer";

import Root from "./components/Root";
import TodosPlugin from "./plugins/todos";
import rootReducer from "./store/reducers";

// Authorization
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN");
  console.log("run", { token });
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default async function start() {
  const app = new App(<Root />);

  app.register(UniversalEventsToken, UniversalEvents);

  __BROWSER__ && app.register(FetchToken, isomorphicFetch);
  __NODE__ && app.register(FetchToken, isomorphicFetch);

  app.register(HelmetPlugin);
  app.register(Router);
  app.register(Styletron);

  // Apollo
  app.enhance(RenderToken, ApolloRenderEnhancer);
  app.register(ApolloClientCredentialsToken, "include");
  app.register(GetApolloClientLinksToken, (links) => [authLink, ...links]);
  app.register(ApolloClientToken, ApolloClientPlugin);
  app.register(GraphQLEndpointToken, "http://localhost:8000/graphql");

  // Redux
  app.register(ReduxToken, Redux);
  app.register(ReducerToken, rootReducer);
  app.register(EnhancerToken, ReduxActionEmitterEnhancer);
  __NODE__ &&
    app.register(GetInitialStateToken, async (ctx) => {
      console.log({ ctx });
      return {};
    });

  if (__NODE__) {
    app.middleware(require("koa-bodyparser")());
    app.middleware(TodosPlugin);
  }

  return app;
}
