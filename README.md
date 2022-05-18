## FUSION.JS Universal App Demo

### Environment variables

Add a `.env` file under the root directory and fill in the environment variables specified in the `.env.example` file.

```
MONGO_URI="..."
JWT_PRIVATE_KEY="..."
```

### Development

```
npm install && npm run dev
```

### Folder structure

- src/main file: This is the Fusion.js entry file

- src/app/ folder: This folder is for main configurations such as Redux Create Store, Axios Instance and Routes
  ```
  - src/app/
    - routes
      - index.js
      - protected-route.js
      - public-route.js
      - router.config.js
    - store/
      - index.js
      - reducer.ts
      - init.js
  ```
- src/modules/ folder: This folder is for Modules/Features of our app, we can treat this as containers. Each module/feature will have all its related files in same folder. We may have some module related components which we will be placing inside frames folder and components which are used in more than one module we will keep in common/components to share across the application. Reason for keeping all related files in same folder to increase maintainability and searchability.
  ```
  - src/modules/
  - dashboard/
    - index.js
    - styles.js
    - actions.js
    - constants.js
    - reducer.js
    - frames/
      - header/
        - index.js
        - styles.js
  ```
- src/library/ folder: This folder will keep all our helpers and common files which will be shared across the application. We have 2 major folder in this common and utilities. If you want to create some api services you can keep it in api folder inside library folder.

  ```
  - src/library/
  - common
    - components
      - Header
        - index.jsx
        - styles.scss
      - Dropdown
        - index.jsx
        - styles.scss
    - actions
      - AuthActions.js
    - constants
      - StoreConstant.js
      - ImagesConstants.js
      - URLConstants.js
    - reducers
      - AuthReducer.js
  - utilities
    - Validators.js
    - Storage.js
  - api - (optional folder as per requirement create this)
    - AuthApiService.js
  ```

- src/resources/ folder: This folder will be used to keep all our static resources such as images, styles (mixins, variable etc), seeds, fonts etc. In current starter pack fonts and seed folder is not created, you can add them as per your need.
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
