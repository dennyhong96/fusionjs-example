import { styled } from "fusion-plugin-styletron-react";

const Card = styled("div", {
  width: "100%",
  display: "flex",
  border: "3px solid #333",
  padding: "1rem",
  minHeight: "8rem",
});

Card.Column = styled(
  "div",
  ({ $w, $justify = "center", $align = "start" }) => ({
    width: $w,
    flex: `0 0 ${$w}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: $justify,
    alignItems: $align,
    gap: "0.5rem",
  })
);

export default Card;
