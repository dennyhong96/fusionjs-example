import AuthPage from "../pages/Auth";
import BookingsPage from "../pages/Bookings";
import HomePage from "../pages/Home";

export const routes = [
  {
    component: HomePage,
    name: "home",
    path: "/",
    title: "Home",
    exact: true,
  },
  {
    component: AuthPage,
    name: "authenticate",
    path: "/auth",
    title: "Authenticate",
    exact: true,
    isPublic: true,
  },
  {
    component: BookingsPage,
    name: "bookings",
    path: "/bookings",
    title: "Bookings",
    exact: true,
    isProtected: true,
  },
];
