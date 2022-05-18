import { Event, transformEvent } from ".";
import { User } from "../../auth/api";

// Resolvers

// Queries
async function events() {
  const events = await Event.find();
  return events.map((event) => transformEvent(event));
}

// Mutations
async function createEvent(
  _,
  { eventInput },
  {
    request: {
      headers: { isAuthenticated, userId },
    },
  }
) {
  if (!isAuthenticated) {
    throw new Error(`Unauthenticated`);
  }
  if (!(await User.findById(userId))) {
    throw new Error(`User doesn't exist`);
  }
  const newEvent = await Event.create({
    ...eventInput,
    date: new Date(eventInput.date),
    createdBy: userId,
  });
  await User.findByIdAndUpdate(userId, {
    $push: { createdEvents: newEvent },
  });
  return transformEvent(newEvent);
}

async function searchEventLocations(
  _,
  { query },
  {
    request: {
      headers: { isAuthenticated },
    },
  }
) {
  if (!isAuthenticated) {
    throw new Error(`Unauthenticated`);
  }
  if (!query) {
    throw new Error("Query cannot be an empty string");
  }
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${process.env.GEOAPIFY_KEY}`
  );
  if (!res.ok) throw new Error("Failed to search places");
  const { features } = await res.json();
  return features.map((place) => ({
    _id: place.properties.place_id,
    address: place.properties.formatted,
    coordinates: {
      latitude: place.properties.lat,
      longitude: place.properties.lon,
    },
  }));
}

export const eventQueries = {
  events,
};

export const eventMutations = {
  createEvent,
  searchEventLocations,
};
