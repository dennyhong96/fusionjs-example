import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { loginUserAction } from "../store/actions";
import Form from "../components/Form";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
      password
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
      }
      token
      tokenExp
    }
  }
`;

export default function AuthPage({}) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN);
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
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
