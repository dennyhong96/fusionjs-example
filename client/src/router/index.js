import { Navigate, Route, Routes } from "fusion-plugin-react-router";

import AuthLayout from "../layout/default.layout";
import { authRouters } from "./router.config";

const PageNotFound = () => (
  <div>
    <div>404</div>
  </div>
);

export function Router({}) {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        {authRouters
          .filter((r) => !r.isLayout)
          .map((r, i) => (
            <Route
              key={i}
              path={r.path}
              exact={r.exact}
              caseSensitive={true}
              element={<r.component />}
            />
          ))}
        <Route
          path="*"
          element={<Navigate to="/auth/authenticate" replace />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
