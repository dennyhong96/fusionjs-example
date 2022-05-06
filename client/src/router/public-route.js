import { useSelector } from "react-redux";
import { Navigate, useLocation } from "fusion-plugin-react-router";

export default function PublicRoute({ children }) {
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const fromPathname = location.state?.from?.pathname ?? "/";
  if (!isAuthChecked) return "Loading...";
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
