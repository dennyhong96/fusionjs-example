import { Navigate, useLocation } from "fusion-plugin-react-router";

import { useAuth } from "../../library";

export function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const fromPathname = location.state?.from?.pathname ?? "/";
  if (isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: fromPathname,
          state: { from: location.pathname },
        }}
      />
    );
  }
  return children;
}
