import { Navigate, useLocation } from "fusion-plugin-react-router";

import { Loader } from "../../library/common/components";
import { useAuth } from "../../library/common/hooks";

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
