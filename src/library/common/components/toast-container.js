import { useStyletron } from "baseui";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Toast } from ".";
import { apolloErrorEmitter } from "../../../app/graphql";
import { closeAlertAction, createAlertAction } from "../slices/alert";

export function ToastContiner({ duration = 2500 }) {
  const [css] = useStyletron();

  const alerts = useSelector((state) => state.alert.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    apolloErrorEmitter.on("APOLLO_ERROR", (errMessage) => {
      const {
        payload: { id },
      } = dispatch(
        createAlertAction({
          title: "Something went wrong",
          message: errMessage,
        })
      );
      setTimeout(() => {
        dispatch(closeAlertAction({ id }));
      }, duration);
    });
  }, []);

  return (
    <ul
      className={css({
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      })}
    >
      {alerts.map((a) => (
        <li key={a.id}>
          <Toast
            title={a.title}
            onClose={() => dispatch(closeAlertAction({ id: a.id }))}
          >
            {a.message}
          </Toast>
        </li>
      ))}
    </ul>
  );
}
