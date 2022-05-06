import { Fragment } from "react";

import { Outlet } from "fusion-plugin-react-router";
import { styled } from "fusion-plugin-styletron-react";

const Header = styled("header", {
  fontSize: "1.5rem",
  color: "blue",
});

export default function AuthLayout() {
  return (
    <Fragment>
      <Header>Header</Header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </Fragment>
  );
}
