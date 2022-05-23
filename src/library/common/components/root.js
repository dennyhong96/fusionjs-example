import { Fragment, useEffect } from "react";
import { Helmet } from "fusion-plugin-react-helmet-async";

import { Router } from "../../../app/routes";
import { ToastContiner } from ".";
import { useAuth } from "../hooks";

export const Root = () => {
  const { silentLogin } = useAuth();
  useEffect(() => {
    silentLogin();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css"
          rel="stylesheet"
        />
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

            input {
              height: 40px;
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

            :root {
            --code-color: darkred;
            --code-bg-color: #aaaaaa;
            --code-font-size: 14px;
            --code-line-height: 1.4;
            --scroll-bar-color: #c5c5c5;
            --scroll-bar-bg-color: #f6f6f6;
            }

            pre {
                color: var(--code-color);
                font-size: var(--code-font-size);
                line-height: var(--code-line-height);
                background-color: var(--code-bg-color);
            }

            .code-block {
                max-height: 100px;
                overflow: auto;
                padding: 8px 7px 5px 15px;
                margin: 0px 0px 0px 0px;
                border-radius: 7px;
            }

            ::-webkit-scrollbar-corner { background: rgba(0,0,0,0.5); }

            * {
                scrollbar-width: thin;
                scrollbar-color: var(--scroll-bar-color) var(--scroll-bar-bg-color);
            }

            /* Works on Chrome, Edge, and Safari */
            *::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            *::-webkit-scrollbar-track {
                background: var(--scroll-bar-bg-color);
            }

            *::-webkit-scrollbar-thumb {
                background-color: var(--scroll-bar-color);
                border-radius: 20px;
                border: 3px solid var(--scroll-bar-bg-color);
            }
          `}
        </style>
      </Helmet>
      <Router />
      <ToastContiner />
    </Fragment>
  );
};
