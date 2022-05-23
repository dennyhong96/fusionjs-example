import { useEffect, useState } from "react";
import { styled } from "styletron-react";

import { Toast } from ".";
import { apolloErrorEmitter } from "../../../app/graphql";
import { randomId } from "../../utilities";

const Wrapper = styled("ul", {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export function ToastContiner({ duration = 5000 }) {
  // TODO: Switch to shared redux state
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    apolloErrorEmitter.on("APOLLO_ERROR", (errMessage) => {
      const id = randomId("toast");
      setToasts((prev) => [
        ...prev,
        {
          id,
          title: "Something went wrong",
          text: errMessage,
          onClose: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        },
      ]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    });
  }, [duration]);

  return (
    <Wrapper>
      {toasts.map((t, i) => (
        <li key={`${t.title}-${i}`}>
          <Toast title={t.title} onClose={t.onClose}>
            {t.text}
          </Toast>
        </li>
      ))}
    </Wrapper>
  );
}
