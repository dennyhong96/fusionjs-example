import { styled } from "styletron-react";

const Wrapper = styled("div", {
  width: "300px",
  display: "flex",
  border: "1px solid #ddd",
  padding: "1rem",
  gap: "0.5rem",
  isolation: "isolate",
  background: "#fff",
});

const Icon = styled("svg", ({ $size = 24 }) => ({
  width: `${$size}px`,
  height: `${$size}px`,
  flex: `0 0 ${$size}px`,
}));

const Close = styled("button", {
  height: "24px",
  width: "24px",
  flex: "0 0 24px",
  display: "grid",
  placeItems: "center",
  padding: 0,
});

const Details = styled("div", {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  gap: "0.5rem",
});

const TitleRow = styled("div", {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

const Title = styled("strong", {
  flex: "1",
});

export function Toast({ title, children, onClose }) {
  return (
    <Wrapper role="alert" aria-live="assertive" aria-atomic="true">
      <Icon
        $size={24}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </Icon>
      <Details>
        <TitleRow>
          <Title>{title}</Title>
          <Close
            type="button"
            data-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon
              $size={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </Icon>
          </Close>
        </TitleRow>
        <div>{children}</div>
      </Details>
    </Wrapper>
  );
}
