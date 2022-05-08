import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { Router } from "../router";
import { loginUserFromStorage } from "../store/actions";

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

            button {
              font: inherit;
              border: initial;
              padding: 0.5rem 1rem;
              cursor: pointer;
            }
            button:disabled {
              opacity: 0.9;
              cursor: not-allowed;
            }

            input,
            textarea {
              font: inherit;
              padding: 0.5rem;
              border-radius: 0;
              border: 1px solid #333;
            }

            ul,
            ol {
              list-style: none;
            }
          `}
        </style>
      </Helmet>
      <Router />
    </Fragment>
  );
};

export default Root;
