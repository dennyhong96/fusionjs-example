import { useSearchParams } from "fusion-plugin-react-router";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

import {
  formatDate,
  formatTime,
  formatPrice,
  formatUsername,
} from "../../../library/utilities";
import { InfoItem } from "../../../library/common/components";

export function EventCard({ event }) {
  const [, setSearchParams] = useSearchParams();

  const handleViewDetails = () => {
    setSearchParams({ eventId: event._id });
  };

  return (
    <Card title={event.title}>
      <StyledBody>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale800">
          <FlexGridItem
            display="flex"
            flexDirection="column"
            gridGap="scale100"
          >
            <InfoItem title="Description" titleWidth="90px">
              {event.description}
            </InfoItem>
            <InfoItem title="Price" titleWidth="90px">
              {formatPrice(event.price)}
            </InfoItem>
            <InfoItem title="Host" titleWidth="90px">
              {formatUsername(event.createdBy.email)}
            </InfoItem>
          </FlexGridItem>
          <FlexGridItem
            display="flex"
            flexDirection="column"
            overrides={{
              Block: { style: { width: "20%", flexGrow: 0 } },
            }}
            gridGap="scale100"
          >
            <InfoItem title="Date" titleWidth="40px">
              {formatDate(event.date)}
            </InfoItem>
            <InfoItem title="Time" titleWidth="40px">
              {formatTime(event.date)}
            </InfoItem>
          </FlexGridItem>
        </FlexGrid>
      </StyledBody>
      <StyledAction>
        <Button
          overrides={{
            Root: { style: { width: "100%" } },
          }}
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </StyledAction>
    </Card>
  );
}
