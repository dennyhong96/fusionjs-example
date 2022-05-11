import { styled } from "fusion-plugin-styletron-react";

const Wrapper = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
});

export default function Loader() {
  return (
    <Wrapper title="Loading..." aria-label="Loading...">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="30"
        x="0"
        y="0"
        enableBackground="new 0 0 50 50"
        version="1.1"
        viewBox="0 0 24 30"
        xmlSpace="preserve"
      >
        <path fill="#333" d="M0 0H4V10H0z">
          <animateTransform
            attributeName="transform"
            attributeType="xml"
            begin="0"
            dur="0.6s"
            repeatCount="indefinite"
            type="translate"
            values="0 0; 0 20; 0 0"
          ></animateTransform>
        </path>
        <path fill="#333" d="M10 0H14V10H10z">
          <animateTransform
            attributeName="transform"
            attributeType="xml"
            begin="0.2s"
            dur="0.6s"
            repeatCount="indefinite"
            type="translate"
            values="0 0; 0 20; 0 0"
          ></animateTransform>
        </path>
        <path fill="#333" d="M20 0H24V10H20z">
          <animateTransform
            attributeName="transform"
            attributeType="xml"
            begin="0.4s"
            dur="0.6s"
            repeatCount="indefinite"
            type="translate"
            values="0 0; 0 20; 0 0"
          ></animateTransform>
        </path>
      </svg>
    </Wrapper>
  );
}
