import { Navigate, useLocation } from "fusion-plugin-react-router";

import { Loader } from "../../library";
import { useAuth } from "../../library";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthChecked, isLoggedIn } = useAuth();

  if (!isAuthChecked) return <Loader />;
  if (!isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: "/auth",
          state: { from: location.pathname },
        }}
      />
    );
  }
  return children;
}
