## FUSION.JS Universal App Demo

### Environment variables

Add a `.env` file under the root directory and fill in the environment variables specified in the `.env.example` file.

```
MONGO_URI="..."         # Mongo DB connection URI
GEOAPIFY_KEY="..."      # geoapify API key https://www.geoapify.com/get-started-with-maps-api
MAPBOX_TOKEN="..."      # Mapbox access token https://docs.mapbox.com/help/getting-started/access-tokens/
JWT_PRIVATE_KEY="..."   # A strin secret for JWT verification

```

### Development

```
npm install && npm run dev
```

### Folder structure

- src/main file: This is the Fusion.js entry file

- src/app/ folder: This folder is for main configurations such as Redux Create Store, GraphQL client configuration, and Routes

  ```
  - src/app/
    - graphql/
      - links/
    - routes
      - protected-route.js
      - public-route.js
      - router.config.js
    - store/
  ```

- src/library/ folder: This folder will keep all our helpers and common files which will be shared across the application.

  ```
  - src/library/
    - api/
      - init.js (Set redux initial state on the server)
      - resovlers.js (GraphQL resolvers)
      - typeDefs.js (GraphQL typeDefs)
    - common/
      - components/
      - constants/
      - hooks/
      - slices/
    - plugins/ (Contains Fusion.js plugins)
    - utilities/
  ```

- src/modules/ folder: This folder is for Modules/Features of the app, we can treat this as containers. Each module/feature will have all its related files in same folder. We may have some module related components which we will be placing inside frames folder and components which are used in more than one module we will keep in common/components to share across the application. Reason for keeping all related files in same folder to increase maintainability and searchability. Files in one module should NOT ever import from another module

  ```
  - src/modules/
    - booking/
      - api/
        - loader.js (Data loaders for the feature's GraphQL api)
        - model.js (DB modal for the feature's GraphQL api)
        - resovler.js (Resolvers for the feature's GraphQL api)
        - typeDef.js (TypeDefs for the feature's GraphQL api)
      - containers/
        - booking.js (Feature's route level container component)
      - frames/
        - booking-card.js (Feature related children/reusable components)
  ```

- src/services/ folder: This folder Ccntains reusable code for interacting with an API, often in the form of hooks. Server-cache/server-state is managed with Apollo client. Inspired by [RTK Query’s recommendation](https://redux-toolkit.js.org/tutorials/rtk-query) to keep the API definition in a central location. This is the only example of where we purposely break the local-first rule. I like to think of API definitions as their own modular feature.

  ```
  - src/services/
    - graphql/
      - mutations/
      - queries/
    - index.js (Contains the hooks that uses Apollo client to execute the mutations and queries)
  ```

- src/resources/ folder: This folder will be used to keep all our static resources such as images, styles (mixins, variable etc), seeds, fonts etc.
  ```
  - src/resources/
    - images/
      - logo.svg
    - styles/
      - variables.scss
      - mixins.scss
    - fonts/
      - Roboto.ttf
    - seed/
      - country.json
  ```
