import { Navigate, useLocation } from "fusion-plugin-react-router";

import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
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
