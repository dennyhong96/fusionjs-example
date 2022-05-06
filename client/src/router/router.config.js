import AuthLayout from "../layout/default.layout";
import AuthPage from "../pages/Auth";

export const authRouters = [
  {
    component: AuthLayout,
    isLayout: true,
    name: "auth",
    path: "/auth",
    title: "Auth",
    exact: true,
  },
  {
    component: AuthPage,
    isLayout: false,
    name: "authenticate",
    path: "authenticate",
    title: "Authenticate",
    exact: true,
  },
];
