import { Fragment } from "react";

import { Outlet } from "fusion-plugin-react-router";

export default function AuthLayout() {
  return (
    <Fragment>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </Fragment>
  );
}
