import { Route, Routes } from "fusion-plugin-react-router";
import { Fragment } from "react";

import PublicRoute from "./public-route";
import { routes } from "./router.config";
import ProtectedRoute from "./protected-route";
import DefaultLayout from "../layout/DefaultLayout";
import PageNotFound from "../components/PageNotFound";

export function Router() {
  return (
    <Routes>
      {routes.map((r, i) => (
        <Route
          key={i}
          path={r.path}
          exact={r.exact}
          caseSensitive={true}
          element={(() => {
            const Guard = r.isProtected
              ? ProtectedRoute
              : r.isPublic
              ? PublicRoute
              : Fragment;

            const Component = r.component;
            const Layout = Component.Layout ?? DefaultLayout;
            return (
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            );
          })()}
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
