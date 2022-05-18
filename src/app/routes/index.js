import { Fragment } from "react";
import { Route, Routes } from "fusion-plugin-react-router";

import { routes } from "./router.config";
import { PublicRoute } from "./public-route";
import { ProtectedRoute } from "./protected-route";
import { Layout as DefaultLayout } from "../../library";

const getRouteElement = (route) => {
  const Guard = route.isProtected
    ? ProtectedRoute
    : route.isPublic
    ? PublicRoute
    : Fragment;
  const Component = route.component;
  const Layout = Component.Layout ?? DefaultLayout;
  return (
    <Guard>
      <Layout>
        <Component />
      </Layout>
    </Guard>
  );
};

export function Router() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          caseSensitive={true}
          element={getRouteElement(route)}
        />
      ))}
    </Routes>
  );
}
