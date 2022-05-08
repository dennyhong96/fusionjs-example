import { useRef, useState } from "react";
import { useMutation } from "react-apollo";
import { useDispatch } from "react-redux";

import Form from "../components/Form";
import { loginUserAction } from "../store/actions";
import { CREATE_USER, LOGIN } from "../graphql/user";
import useSafeDispatch from "../hooks/useSafeDispath";

export default function AuthPage({}) {
  const [isRegisterMode, unsafeSetIsRegisterMode] = useState(false);
  const setIsRegisterMode = useSafeDispatch(unsafeSetIsRegisterMode);
  const [createUser] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN);
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current?.value?.trim() ?? "";
    const password = passwordRef.current?.value?.trim() ?? "";
    if (!email || !password) return;
    if (isRegisterMode) {
      await createUser({ variables: { email, password } });
    }
    const {
      data: { login: credential },
    } = await login({
      variables: { email: email, password: password },
    });
    emailRef.current.value = "";
    passwordRef.current.value = "";
    dispatch(loginUserAction(credential));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <span>Email:</span>
        <input ref={emailRef} type="text" />
      </Form.Field>
      <Form.Field>
        <span>Password:</span>
        <input ref={passwordRef} type="password" />
      </Form.Field>
      <button type="submit">{!isRegisterMode ? "Sign In" : "Register"}</button>
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
  );
}
