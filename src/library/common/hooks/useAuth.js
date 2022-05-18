import { useCallback } from "react";
import { useMutation } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";

import {
  CREATE_USER,
  LOGIN,
  loginUserAction,
  loginUserFromStorage,
  logoutUserAction,
} from "../../../modules";

// TODO: Move to modules?
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [registerMutation] = useMutation(CREATE_USER);
  const [loginMutation] = useMutation(LOGIN);

  const register = useCallback(async ({ email, password }) => {
    await registerMutation({ variables: { email, password } });
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      const {
        data: { login: credential },
      } = await loginMutation({
        variables: { email, password },
      });
      dispatch(loginUserAction(credential));
    },
    [loginMutation]
  );

  const silentLogin = useCallback(
    () => dispatch(loginUserFromStorage()),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(logoutUserAction()));

  return {
    ...auth,
    register,
    login,
    silentLogin,
    logout,
  };
};
