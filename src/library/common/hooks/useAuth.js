import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUserAction,
  loginUserFromStorage,
  logoutUserAction,
} from "../../../modules/auth/slice";
import { useLoginUser, useRegisterUser } from "../../../services/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { register } = useRegisterUser();
  const { login: loginMutation } = useLoginUser();

  const login = useCallback(
    async ({ email, password }) => {
      const credentials = await loginMutation({ email, password });
      dispatch(loginUserAction(credentials));
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
