import { useSearchParams } from "fusion-plugin-react-router";

import Card from "../components/Card";
import { formatDate, formatPrice, formatTime, formatUsername } from "../utils";

export default function EventCard({ event }) {
  const [, setSearchParams] = useSearchParams();

  const handleViewDetails = () => {
    setSearchParams({ eventId: event._id });
  };

  return (
    <Card>
      <Card.Column $w="70%">
        <h3>{event.title}</h3>
        <p>Price: {formatPrice(event.price)}</p>
        <p>Host: {formatUsername(event.createdBy.email)}</p>
      </Card.Column>
      <Card.Column $w="30%" $align="end" $justify="center">
        <p>Date: {formatDate(event.date)}</p>
        <p>Time: {formatTime(event.date)}</p>
        <button onClick={handleViewDetails}>View Details</button>
      </Card.Column>
    </Card>
  );
}
