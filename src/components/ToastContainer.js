import { useEffect, useState } from "react";
import { styled } from "styletron-react";
import { apolloErrorEmitter } from "../graphql/client/links/errorLink";
import { randomId } from "../utils";

import Toast from "./Toast";

const Wrapper = styled("ul", {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function ToastContiner({ duration = 5000 }) {
  // TODO: Switch to redux state
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
