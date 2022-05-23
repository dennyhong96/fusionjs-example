import { useCallback } from "react";
import { useMutation } from "react-apollo";

import { CREATE_USER, LOGIN } from "./graphql";

export const useLoginUser = () => {
  const [loginMutation] = useMutation(LOGIN);

  const login = useCallback(
    async ({ email, password }) => {
      const {
        data: { login: credential },
      } = await loginMutation({
        variables: { email, password },
      });
      return credential;
    },
    [loginMutation]
  );

  return {
    login,
  };
};

export const useRegisterUser = () => {
  const [registerMutation] = useMutation(CREATE_USER);

  const register = useCallback(
    async ({ email, password }) => {
      await registerMutation({ variables: { email, password } });
    },
    [registerMutation]
  );

  return {
    register,
  };
};
