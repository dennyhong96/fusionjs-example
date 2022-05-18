import { EventContainer, AuthContainer, BookingContainer } from "../../modules";

export const routes = [
  {
    component: EventContainer,
    name: "home",
    path: "/",
    title: "Home",
    exact: true,
  },
  {
    component: AuthContainer,
    name: "authenticate",
    path: "/auth",
    title: "Authenticate",
    exact: true,
    isPublic: true,
  },
  {
    component: BookingContainer,
    name: "bookings",
    path: "/bookings",
    title: "Bookings",
    exact: true,
    isProtected: true,
  },
];
