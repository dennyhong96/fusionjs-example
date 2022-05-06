import { Fragment } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { NavLink } from "fusion-plugin-react-router";
import { useDispatch } from "react-redux";

import { logoutUserAction } from "../store/actions";

const Header = styled("header", {
  color: "blue",
});

export default function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Header>
        <NavLink to={"/"}>Events</NavLink>
        <NavLink to={"/auth"}>Login/Signup</NavLink>
        <NavLink to={"/bookings"}>My Bookings</NavLink>
        <button onClick={() => dispatch(logoutUserAction())}>Logout</button>
      </Header>
      <main>{children}</main>
      <footer>Footer</footer>
    </Fragment>
  );
}
