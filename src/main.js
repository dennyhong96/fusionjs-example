__NODE__ && require("dotenv").config();
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
import isomorphicFetch from "isomorphic-fetch";
import {
  ApolloRenderEnhancer,
  ApolloClientPlugin,
  ApolloClientToken,
  ApolloClientCredentialsToken,
  GetApolloClientLinksToken,
  GraphQLSchemaToken,
} from "fusion-plugin-apollo";
import { makeExecutableSchema } from "graphql-tools";
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from "fusion-plugin-react-redux";
import ReduxActionEmitterEnhancer from "fusion-plugin-redux-action-emitter-enhancer";

import Root from "./components/Root";
import rootReducer from "./store/client/reducers";
import errorLink from "./graphql/client/links/errorLink";

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
  if (__BROWSER__) {
    app.register(GetApolloClientLinksToken, (links) => [errorLink, ...links]);
  }
  app.register(ApolloClientToken, ApolloClientPlugin);
  if (__NODE__) {
    const mongoose = require("mongoose");
    const auth = require("./plugins/auth");
    const typeDefs = require("./graphql/server/typeDefs");
    const resolvers = require("./graphql/server/resolvers");
    await mongoose.connect(process.env.MONGO_URI);
    app.middleware(auth);
    app.register(
      GraphQLSchemaToken,
      makeExecutableSchema({
        typeDefs,
        resolvers,
      })
    );
  }

  // Redux
  app.register(ReduxToken, Redux);
  app.register(ReducerToken, rootReducer);
  app.register(EnhancerToken, ReduxActionEmitterEnhancer);
  if (__NODE__) {
    const setInitialState = require("./store/server/init");
    app.register(GetInitialStateToken, setInitialState); // Set initial redux state on the server, then hydrate on the client
  }

  return app;
}
