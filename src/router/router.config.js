import AuthPage from "../pages/Auth";
import BookingsPage from "../pages/Bookings";
import HomePage from "../pages/Home";

export const routes = [
  {
    component: require("../pages/Home").default,
    name: "home",
    path: "/",
    title: "Home",
    exact: true,
  },
  {
    component: require("../pages/Auth").default,
    name: "authenticate",
    path: "/auth",
    title: "Authenticate",
    exact: true,
    isPublic: true,
  },
  {
    component: require("../pages/Bookings").default,
    name: "bookings",
    path: "/bookings",
    title: "Bookings",
    exact: true,
    isProtected: true,
  },
];
