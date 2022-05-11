import { Fragment } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { NavLink } from "fusion-plugin-react-router";
import { useDispatch, useSelector } from "react-redux";

import { logoutUserAction } from "../store/actions";
import Container from "../components/Container";

const Header = styled("header", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "5rem",
  background: "#fff",
  borderBottom: "1px solid #eee",
});

const Spacer = styled("div", {
  height: "5rem",
  width: "100%",
});

const Nav = styled("nav", {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "auto",
});

const NavItems = styled("ul", {
  display: "flex",
  listStyle: "none",
  gap: "1rem",
});

const Link = styled(NavLink, {
  textDecoration: "none",
  color: "initial",
  ":hover": {
    textDecoration: "underline",
  },
});

const Button = styled("button", {
  background: "initial",
  padding: "0",
  ":hover": {
    textDecoration: "underline",
  },
});

const Main = styled("main", {
  paddingTop: "3rem",
  paddingBottom: "3rem",
});

const Footer = styled("footer", {
  background: "#fff",
  borderTop: "1px solid #eee",
  paddingTop: "3rem",
  paddingBottom: "3rem",
});

export default function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Header>
        <Container>
          <Nav>
            <Link to={"/"}>
              <h4>EasyEvents</h4>
            </Link>
            <NavItems>
              <li>
                <Link to={"/"}>Events</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to={"/auth"}>Login/Signup</Link>
                </li>
              )}
              {isLoggedIn && (
                <Fragment>
                  <li>
                    <Link to={"/bookings"}>My Bookings</Link>
                  </li>
                  <li>
                    <Button onClick={() => dispatch(logoutUserAction())}>
                      Logout
                    </Button>
                  </li>
                </Fragment>
              )}
            </NavItems>
          </Nav>
        </Container>
      </Header>
      <Spacer />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer>
        <Container>EasyEvents | {new Date().getFullYear()}</Container>
      </Footer>
    </Fragment>
  );
}
