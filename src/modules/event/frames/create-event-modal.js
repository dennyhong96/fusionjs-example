import { Fragment, useEffect, useRef, useState } from "react";
import { styled } from "fusion-plugin-styletron-react";

import {
  Modal,
  Form,
  useEvent,
  useDebounceValue,
  useSafeDispatch,
  Loader,
  Map,
} from "../../../library";

const Warpper = styled("div", {
  maxHeight: "min(75vh, 600px)",
  overflow: "auto",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

const Row = styled("div", {
  width: "100%",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

const Addy = styled("p", {
  flex: 1,
});

const InputBox = styled("div", {
  flex: 1,
  position: "relative",
});

const Input = styled("input", {
  width: "100%",
  display: "block",
  paddingRight: "2rem",
});

const LoaderWrapper = styled("div", {
  position: "absolute",
  right: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
});

const ResultList = styled("ul", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const ResultButton = styled("button", {
  display: "block",
  width: "100%",
  textAlign: "start",
  background: "initial",
});

const Button = styled("button", {
  height: "40px",
});

const SEARCH_DEBOUNCE_DELAY = 250;

export function CreateEventModal() {
  const [locationQuery, unsafeSetLocationQuery] = useState("");
  const setLocationQuery = useSafeDispatch(unsafeSetLocationQuery);
  const debouncedLocationQuery = useDebounceValue(
    locationQuery,
    SEARCH_DEBOUNCE_DELAY
  );

  const { createEvent, searchLocation, locations, locationLoading } = useEvent({
    locationSearchQuery: debouncedLocationQuery,
  });
  useEffect(() => {
    searchLocation();
  }, [debouncedLocationQuery]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);
  const createEventModal = useRef(null);
  const closeCreateEventModal = () => createEventModal.current?.handleClose?.();

  const handleCreateEvent = async (evt) => {
    evt.preventDefault();
    const title = titleRef.current?.value?.trim() ?? "";
    const description = descRef.current?.value;
    const price = Number(priceRef.current?.value?.trim());
    const date = dateRef.current?.value?.trim() ?? "";
    if (
      !title ||
      !description ||
      !isFinite(price) ||
      !date ||
      !selectedLocation
    ) {
      return;
    }
    await createEvent({
      title,
      description,
      price,
      date,
      address: selectedLocation.address,
      coordinates: {
        latitude: selectedLocation.coordinates.latitude,
        longitude: selectedLocation.coordinates.longitude,
      },
    });
    closeCreateEventModal();
  };

  // TODO: Refactor JSX, extract typeahead component
  return (
    <Modal
      $maxWidth="600px"
      ref={createEventModal}
      trigger={<button>Create your event</button>}
    >
      <Warpper>
        <Form onSubmit={handleCreateEvent}>
          <h4>Create your event</h4>
          <Form.Field>
            <span>Title:</span>
            <input ref={titleRef} type="text" />
          </Form.Field>
          <Form.Field>
            <span>Description:</span>
            <textarea ref={descRef} rows={3} />
          </Form.Field>
          <Form.Field>
            <span>Price:</span>
            <input ref={priceRef} type="text" />
          </Form.Field>
          <Form.Field>
            <span>Date:</span>
            <input ref={dateRef} type="datetime-local" />
          </Form.Field>
          <Form.Field>
            <span>Address:</span>
            {selectedLocation ? (
              <Fragment>
                <Map
                  longitude={selectedLocation.coordinates.longitude}
                  latitude={selectedLocation.coordinates.latitude}
                />
                <Row>
                  <Addy>{selectedLocation.address}</Addy>
                  <Button
                    type="button"
                    onClick={setSelectedLocation.bind(null, null)}
                  >
                    Edit
                  </Button>
                </Row>
              </Fragment>
            ) : (
              <Row>
                <InputBox>
                  <Input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                  {locationLoading && (
                    <LoaderWrapper>
                      <Loader size="sm" />
                    </LoaderWrapper>
                  )}
                </InputBox>
                <Button
                  type="button"
                  onClick={() => {
                    setLocationQuery("");
                  }}
                >
                  x
                </Button>
              </Row>
            )}
          </Form.Field>
          <ResultList>
            {locations.map((location) => (
              <li key={location._id}>
                <ResultButton
                  type="button"
                  onClick={() => {
                    setSelectedLocation(location);
                    setLocationQuery("");
                  }}
                >
                  {location.address}
                </ResultButton>
              </li>
            ))}
          </ResultList>
          <Actions>
            <button onClick={closeCreateEventModal} type="button">
              Cancel
            </button>
            <button type="submit">Confirm</button>
          </Actions>
        </Form>
      </Warpper>
    </Modal>
  );
}
