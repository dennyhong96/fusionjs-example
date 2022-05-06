import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { loginUserAction } from "../../store/actions";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
      password
      createdEvents {
        _id
        title
        description
        price
        date
      }
      __typename
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
    <form onSubmit={handleSubmit}>
      <label>
        <span>Email:</span>
        <input ref={emailRef} type="text" />
      </label>
      <label>
        <span>Password:</span>
        <input ref={passwordRef} type="password" />
      </label>
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
    </form>
  );
}
