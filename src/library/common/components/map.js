import React from "react";
import MapBox, { Marker } from "react-map-gl";

import { useStatic } from "../hooks";

export const Map = ({ latitude, longitude, zoom = 14 }) => {
  const {
    keys: { mapBox: token },
  } = useStatic();

  return (
    <MapBox
      initialViewState={{
        latitude,
        longitude,
        zoom,
      }}
      style={{ width: "100%", height: 300, flexShrink: 0 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={token}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
    </MapBox>
  );
};
