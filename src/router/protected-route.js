import { useSelector } from "react-redux";
import { Navigate, useLocation } from "fusion-plugin-react-router";

import Loader from "../components/Loader";

export default function ProtectedRoute({ children }) {
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  // if (!isAuthChecked) return <Loader />;
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
