import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { DatePicker } from "baseui/datepicker";
import { ListItemLabel, MenuAdapter } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ParagraphMedium } from "baseui/typography";
import { Heading, HeadingLevel } from "baseui/heading";

import { Modal, Map, Typeahead } from "../../../library/common/components";
import {
  useDebounceValue,
  useSafeDispatch,
} from "../../../library/common/hooks";
import {
  useCreateEvent,
  useEventLocationList,
  useSearchEventLocation,
} from "../../../services/event";

const SEARCH_DEBOUNCE_DELAY = 300;

export function CreateEventModal() {
  const [css] = useStyletron();

  const [dateTime, unsafeSetDateTime] = useState(new Date());
  const setDateTime = useSafeDispatch(unsafeSetDateTime);

  const [locationQuery, unsafeSetLocationQuery] = useState("");
  const setLocationQuery = useSafeDispatch(unsafeSetLocationQuery);
  const debouncedLocationQuery = useDebounceValue(
    locationQuery,
    SEARCH_DEBOUNCE_DELAY
  );

  const { createEvent } = useCreateEvent();
  const { locations } = useEventLocationList({
    locationSearchQuery: debouncedLocationQuery,
  });
  const { searchLocation, locationLoading } = useSearchEventLocation({
    locationSearchQuery: debouncedLocationQuery,
  });

  useEffect(() => {
    searchLocation();
  }, [debouncedLocationQuery]);

  const [selectedLocation, unsafeSetSelectedLocation] = useState(null);
  const setSelectedLocation = useSafeDispatch(unsafeSetSelectedLocation);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const priceRef = useRef(null);
  const createEventModal = useRef(null);
  const closeCreateEventModal = () => createEventModal.current?.handleClose?.();

  const handleCreateEvent = async (evt) => {
    evt.preventDefault();
    const title = titleRef.current?.value?.trim() ?? "";
    const description = descRef.current?.value;
    const price = Number(priceRef.current?.value?.trim());

    if (
      !title ||
      !description ||
      !isFinite(price) ||
      !dateTime ||
      !selectedLocation
    ) {
      console.error({
        title,
        description,
        "isFinite(price)": isFinite(price),
        dateTime,
        selectedLocation,
      });
      return;
    }

    await createEvent({
      title,
      description,
      price,
      date: new Date(dateTime).toISOString(),
      address: selectedLocation.address,
      coordinates: {
        latitude: selectedLocation.coordinates.latitude,
        longitude: selectedLocation.coordinates.longitude,
      },
    });
    closeCreateEventModal();
  };

  return (
    <Modal
      ref={createEventModal}
      trigger={<Button>Create an event</Button>}
      renderHeader={
        <HeadingLevel>
          <Heading $as="h4">Create your event</Heading>
        </HeadingLevel>
      }
      renderActions={
        <Fragment>
          <Button
            onClick={closeCreateEventModal}
            type="button"
            kind="secondary"
            overrides={{
              Root: {
                style: {
                  marginRight: "1rem",
                },
              },
            }}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleCreateEvent}>
            Confirm
          </Button>
        </Fragment>
      }
    >
      <div
        className={css({
          maxHeight: "min(60vh, 600px)",
          overflow: "auto",
        })}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <FormControl label="Title" caption="Required">
            <Input id="create-event-email" inputRef={titleRef} type="text" />
          </FormControl>
          <FormControl label="Description" caption="Required">
            <Textarea id="create-event-description" inputRef={descRef} />
          </FormControl>
          <FormControl label="Price" caption="Required">
            <Input id="create-event-price" inputRef={priceRef} type="text" />
          </FormControl>
          <FormControl label="Date" caption="Required">
            <DatePicker
              id="create-event-date"
              timeSelectStart
              value={dateTime}
              onChange={({ date }) =>
                setDateTime(Array.isArray(date) ? date : [date])
              }
            />
          </FormControl>
          <FormControl label="Address" caption="Required">
            <Fragment>
              {selectedLocation ? (
                <Fragment>
                  <Map
                    address={selectedLocation.address}
                    longitude={selectedLocation.coordinates.longitude}
                    latitude={selectedLocation.coordinates.latitude}
                  />
                  <FlexGrid
                    flexGridColumnCount={2}
                    alignItems="center"
                    paddingTop="1rem"
                  >
                    <FlexGridItem>
                      <ParagraphMedium>
                        {selectedLocation.address}
                      </ParagraphMedium>
                    </FlexGridItem>
                    <FlexGridItem
                      overrides={{
                        Block: {
                          style: {
                            flexGrow: "0",
                            width: "max-content",
                          },
                        },
                      }}
                    >
                      <Button
                        type="button"
                        onClick={setSelectedLocation.bind(null, null)}
                      >
                        Edit
                      </Button>
                    </FlexGridItem>
                  </FlexGrid>
                </Fragment>
              ) : (
                <Typeahead
                  id="create-event-address"
                  isLoading={locationLoading}
                  query={locationQuery}
                  onQueryChange={(e) => setLocationQuery(e.target.value)}
                  onClearQuery={() => setLocationQuery("")}
                  items={locations}
                  onItemSelect={(location) => {
                    setSelectedLocation(location);
                    setLocationQuery("");
                  }}
                  renderListItem={(props, ref) => (
                    <MenuAdapter {...props} ref={ref}>
                      <ListItemLabel
                        description={`Lat: ${props.item.coordinates.latitude}, Lng: ${props.item.coordinates.longitude}`}
                      >
                        {props.item.address}
                      </ListItemLabel>
                    </MenuAdapter>
                  )}
                  listStyles={{
                    height: "250px",
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              )}
            </Fragment>
          </FormControl>
        </form>
      </div>
    </Modal>
  );
}
