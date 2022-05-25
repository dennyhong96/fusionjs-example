import { Fragment, useRef, useState } from "react";
import { Helmet } from "fusion-plugin-react-helmet-async";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import { useSafeDispatch, useAuth } from "../../../library/common/hooks";

export function AuthContainer() {
  const [css] = useStyletron();
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
      <form
        className={css({
          width: "100%",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        })}
        onSubmit={handleSubmit}
      >
        <FormControl label="Email" caption="Required">
          <Input id="auth-email" inputRef={emailRef} type="text" />
        </FormControl>
        <FormControl label="Password" caption="Required">
          <Input id="auth-password" inputRef={passwordRef} type="password" />
        </FormControl>

        <Button
          type="submit"
          overrides={{
            BaseButton: { style: { width: "100%" } },
          }}
        >
          {!isRegisterMode ? "Sign In" : "Register"}
        </Button>

        {isRegisterMode ? (
          <div className={css({ paddingTop: "1rem" })}>
            Already have an account?{" "}
            <Button
              size="compact"
              kind="tertiary"
              type="button"
              onClick={() => setIsRegisterMode((prev) => !prev)}
            >
              Sign in
            </Button>
          </div>
        ) : (
          <div className={css({ paddingTop: "1rem" })}>
            Don't have an account?{" "}
            <Button
              size="compact"
              kind="tertiary"
              type="button"
              onClick={() => setIsRegisterMode((prev) => !prev)}
            >
              Register
            </Button>
          </div>
        )}
      </form>
    </Fragment>
  );
}

export default AuthContainer;
