import { styled } from "fusion-plugin-styletron-react";

export const Form = styled("form", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  gap: "1rem",
});

Form.Field = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});
