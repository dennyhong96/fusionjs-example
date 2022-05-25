import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { LabelMedium, ParagraphMedium } from "baseui/typography";

export const InfoItem = ({ title, titleWidth = "auto", children }) => {
  return (
    <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale400">
      <FlexGridItem
        overrides={{
          Block: {
            style: { width: titleWidth, flexGrow: "0" },
          },
        }}
      >
        <LabelMedium>{title}:</LabelMedium>
      </FlexGridItem>
      <FlexGridItem>
        <ParagraphMedium>{children}</ParagraphMedium>
      </FlexGridItem>
    </FlexGrid>
  );
};
