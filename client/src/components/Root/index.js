import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { Router } from "../../router";
import { loginUserFromStorage } from "../../store/actions";

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginUserFromStorage());
  }, []);
  return (
    <Fragment>
      <Helmet>
        <style>
          {`
            html,
            body,
            #root {
              height: 100%;
              width: 100%;
              font-family: sans-serif;
            }

            *,
            *::before,
            *::after {
              padding: 0;
              margin: 0;
              box-sizing: border-box;
            }
          `}
        </style>
      </Helmet>
      <Router />
    </Fragment>
  );
};

export default Root;
