import { styled } from "fusion-plugin-styletron-react";

const Wrapper = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  flexDirection: "column",
  gap: "1rem",
});

export function Error() {
  return (
    <Wrapper title="Error" aria-label="Error">
      <p>Failed to load, please try refresh.</p>
      <button onClick={() => location.assign(location)}>Refresh</button>
    </Wrapper>
  );
}
