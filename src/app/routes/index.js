import { Fragment } from "react";
import { Route, Routes } from "fusion-plugin-react-router";

import { routes } from "./router.config";
import { PublicRoute } from "./public-route";
import { ProtectedRoute } from "./protected-route";
import { Layout as DefaultLayout, PageNotFound } from "../../library";

// TODO: Lazy load routes
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
