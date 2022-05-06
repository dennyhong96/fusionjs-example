import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Router } from "../../router";
import { loginUserFromStorage } from "../../store/actions";

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginUserFromStorage());
  }, []);
  return <Router />;
};

export default Root;
