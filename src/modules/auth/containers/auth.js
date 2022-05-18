import { Fragment, useRef, useState } from "react";
import { Helmet } from "fusion-plugin-react-helmet-async";
import { styled } from "styletron-react";

import { Form, useSafeDispatch, useAuth } from "../../../library";

const FormContainer = styled("div", {
  width: "100%",
  maxWidth: "400px",
  margin: "auto",
});

export function AuthContainer() {
  const [isRegisterMode, unsafeSetIsRegisterMode] = useState(false);
  const setIsRegisterMode = useSafeDispatch(unsafeSetIsRegisterMode);

  const { login, register } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current?.value?.trim() ?? "";
    const password = passwordRef.current?.value?.trim() ?? "";
    if (!email || !password) return;
    if (isRegisterMode) {
      await register({ email, password });
    }
    await login({ email, password });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Login/Signup | EasyEvents</title>
      </Helmet>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <span>Email:</span>
            <input ref={emailRef} type="text" />
          </Form.Field>
          <Form.Field>
            <span>Password:</span>
            <input ref={passwordRef} type="password" />
          </Form.Field>
          <button type="submit">
            {!isRegisterMode ? "Sign In" : "Register"}
          </button>
          {isRegisterMode ? (
            <small>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegisterMode((prev) => !prev)}
              >
                Sign in
              </button>
            </small>
          ) : (
            <small>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegisterMode((prev) => !prev)}
              >
                Register
              </button>
            </small>
          )}
        </Form>
      </FormContainer>
    </Fragment>
  );
}
