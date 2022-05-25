import { useStyletron } from "baseui";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Toast } from ".";
import { getEmitter } from "../../utilities";
import { closeAlertAction, createAlertAction } from "../slices/alert";

export function ToastContiner({ duration = 2500 }) {
  const [css] = useStyletron();

  const alerts = useSelector((state) => state.alert.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    getEmitter().on(getEmitter.types.APOLLO_ERROR, (errMessage) => {
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
