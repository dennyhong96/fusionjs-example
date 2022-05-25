import { Spinner } from "baseui/spinner";
import { Navigate, useLocation } from "fusion-plugin-react-router";

import { useAuth } from "../../library/common/hooks";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthChecked, isLoggedIn } = useAuth();

  if (!isAuthChecked) return <Spinner $size="medium" $color="#000" />;
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
