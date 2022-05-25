import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Delete from "baseui/icon/delete";
import { LabelMedium, ParagraphMedium } from "baseui/typography";
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

const Details = styled("div", {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  gap: "0.5rem",
});

export function Toast({ title, children, onClose }) {
  return (
    <Wrapper role="alert" aria-live="assertive" aria-atomic="true">
      <Icon
        $size={36}
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
        <FlexGrid flexGridColumnCount={2} alignItems="center">
          <FlexGridItem>
            <LabelMedium>{title}</LabelMedium>
          </FlexGridItem>
          <FlexGridItem
            overrides={{
              Block: {
                style: {
                  width: "max-content",
                  flexGrow: 0,
                },
              },
            }}
          >
            <Button
              type="button"
              data-dismiss="toast"
              aria-label="Close"
              size="mini"
              onClick={onClose}
            >
              <Delete />
            </Button>
          </FlexGridItem>
        </FlexGrid>
        <ParagraphMedium>{children}</ParagraphMedium>
      </Details>
    </Wrapper>
  );
}
