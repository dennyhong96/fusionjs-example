import { Spinner } from "baseui/spinner";
import { split } from "fusion-react";

import { Error } from "../../library/common/components";

export const routes = [
  {
    component: split({
      load: () => import("../../modules/event/containers/event"),
      LoadingComponent: () => <Spinner $size="medium" $color="#000" />,
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
      LoadingComponent: () => <Spinner $size="medium" $color="#000" />,
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
      LoadingComponent: () => <Spinner $size="medium" $color="#000" />,
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
      LoadingComponent: () => <Spinner $size="medium" $color="#000" />,
      ErrorComponent: () => <Error />,
    }),
    name: "notFound",
    path: "*",
    title: "NotFound",
    exact: true,
  },
];
