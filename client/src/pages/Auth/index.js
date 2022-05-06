import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "fusion-plugin-styletron-react";

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

const Form = styled("form", {
  width: "100%",
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
  margin: "auto",
  gap: "1rem",
});

const Label = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const Input = styled("input", {
  height: "40px",
  font: "inherit",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  borderRadius: 0,
  border: "1px solid #000",
});

const Button = styled("button", {
  font: "inherit",
  border: "initial",
  padding: "0.5rem 1rem",
  cursor: "pointer",
});

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
      <Label>
        <span>Email:</span>
        <Input ref={emailRef} type="text" />
      </Label>
      <Label>
        <span>Password:</span>
        <Input ref={passwordRef} type="password" />
      </Label>
      <Button type="submit">{!isRegisterMode ? "Sign In" : "Register"}</Button>
      {isRegisterMode ? (
        <small>
          Already have an account?{" "}
          <Button
            type="button"
            onClick={() => setIsRegisterMode((prev) => !prev)}
          >
            Sign in
          </Button>
        </small>
      ) : (
        <small>
          Don't have an account?{" "}
          <Button
            type="button"
            onClick={() => setIsRegisterMode((prev) => !prev)}
          >
            Register
          </Button>
        </small>
      )}
    </Form>
  );
}
