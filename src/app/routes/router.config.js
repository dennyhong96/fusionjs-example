import { split } from "fusion-react";

import { Error, Loader } from "../../library/common/components";

export const routes = [
  {
    component: split({
      load: () => import("../../modules/event/containers/event"),
      LoadingComponent: () => <Loader />,
      ErrorComponent: () => <Error />,
    }),
    name: "home",
    path: "/",
    title: "Home",
    exact: true,
  },
  {
    component: split({
      load: () => import("../../modules/auth/containers/auth"),
      LoadingComponent: () => <Loader />,
      ErrorComponent: () => <Error />,
    }),
    name: "authenticate",
    path: "/auth",
    title: "Authenticate",
    exact: true,
    isPublic: true,
  },
  {
    component: split({
      load: () => import("../../modules/booking/containers/booking"),
      LoadingComponent: () => <Loader />,
      ErrorComponent: () => <Error />,
    }),
    name: "bookings",
    path: "/bookings",
    title: "Bookings",
    exact: true,
    isProtected: true,
  },
  {
    component: split({
      load: () => import("../../modules/not-found/containers/not-found"),
      LoadingComponent: () => <Loader />,
      ErrorComponent: () => <Error />,
    }),
    name: "notFound",
    path: "*",
    title: "NotFound",
    exact: true,
  },
];
