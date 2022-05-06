import { useQuery, useMutation, useLazyQuery } from "react-apollo";
import gql from "graphql-tag";
import { useRef } from "react";

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
        email
      }
      token
      tokenExp
      __typename
    }
  }
`;

export default function AuthPage({}) {
  const [createUser] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) return;
    await createUser({ variables: { email, password } });
    const result = await login({
      variables: { email: email, password: password },
    });
    console.log({ result });
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
      <button type="submit">Sign In</button>
    </form>
  );
}
