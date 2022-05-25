import { Fragment } from "react";
import { Link } from "fusion-plugin-react-router";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Heading, HeadingLevel } from "baseui/heading";

import { useAuth } from "../hooks";
import { Container } from "./container";
import { useStyletron } from "baseui";

export function Layout({ children }) {
  const [css] = useStyletron();
  const { isLoggedIn, logout } = useAuth();

  return (
    <Fragment>
      <header>
        <Container>
          <HeaderNavigation
            overrides={{
              Root: {
                style: () => ({
                  borderBottomColor: "initial",
                  borderBottomWidth: "0",
                }),
              },
            }}
          >
            <StyledNavigationList $align={ALIGN.left}>
              <StyledNavigationItem style={{ paddingLeft: 0 }}>
                <StyledLink
                  $as={Link}
                  to={"/"}
                  style={{ textDecoration: "none" }}
                >
                  <HeadingLevel>
                    <Heading $as="h4">EasyEvents</Heading>
                  </HeadingLevel>
                </StyledLink>
              </StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center} />
            <StyledNavigationList $align={ALIGN.right}>
              <StyledNavigationItem>
                <StyledLink $as={Link} to={"/"}>
                  Events
                </StyledLink>
              </StyledNavigationItem>
              {isLoggedIn ? (
                <Fragment>
                  <StyledNavigationItem>
                    <StyledLink $as={Link} to={"/bookings"}>
                      My Bookings
                    </StyledLink>
                  </StyledNavigationItem>
                  <StyledNavigationItem>
                    <StyledLink
                      as="button"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </StyledLink>
                  </StyledNavigationItem>
                </Fragment>
              ) : (
                <StyledNavigationItem>
                  <StyledLink $as={Link} to={"/auth"}>
                    Login/Signup
                  </StyledLink>
                </StyledNavigationItem>
              )}
            </StyledNavigationList>
          </HeaderNavigation>
        </Container>
      </header>

      <main
        className={css({
          paddingTop: "3rem",
          paddingBottom: "3rem",
        })}
      >
        <Container>{children}</Container>
      </main>

      <footer
        className={css({
          background: "#000",
          color: "#fff",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        })}
      >
        <Container>
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
            })}
          >
            EasyEvents | {new Date().getFullYear()}
          </div>
        </Container>
      </footer>
    </Fragment>
  );
}
