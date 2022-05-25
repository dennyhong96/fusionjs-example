import React, { Fragment, useEffect, useRef, useState } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { DatePicker } from "baseui/datepicker";
import { StatefulMenu } from "baseui/menu";
import { ListItemLabel, MenuAdapter } from "baseui/list";
import { Spinner, SIZE } from "baseui/spinner";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ParagraphMedium } from "baseui/typography";
import { Heading, HeadingLevel } from "baseui/heading";
import Delete from "baseui/icon/delete";

import { Modal, Map } from "../../../library/common/components";
import {
  useDebounceValue,
  useSafeDispatch,
} from "../../../library/common/hooks";
import {
  useCreateEvent,
  useEventLocationList,
  useSearchEventLocation,
} from "../../../services/event";

const Warpper = styled("div", {
  maxHeight: "min(75vh, 600px)",
  overflow: "auto",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

const SEARCH_DEBOUNCE_DELAY = 300;

export function CreateEventModal() {
  const [dateTime, setDateTime] = useState(new Date());

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

  const [selectedLocation, setSelectedLocation] = useState(null);

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
    console.log({ title, description, price, dateTime, selectedLocation });
    if (
      !title ||
      !description ||
      !isFinite(price) ||
      !dateTime ||
      !selectedLocation
    ) {
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

  // TODO: Refactor JSX, extract typeahead component
  return (
    <Modal
      $maxWidth="600px"
      ref={createEventModal}
      trigger={<Button>Create an event</Button>}
    >
      <Warpper>
        <form onSubmit={handleCreateEvent}>
          <HeadingLevel>
            <Heading $as="h4">Create your event</Heading>
          </HeadingLevel>
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
                    <FlexGridItem
                      overrides={{
                        Block: {
                          style: {
                            flex: "1",
                          },
                        },
                      }}
                    >
                      <ParagraphMedium>
                        {selectedLocation.address}
                      </ParagraphMedium>
                    </FlexGridItem>
                    <FlexGridItem
                      overrides={{
                        Block: {
                          style: {
                            flex: "0",
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
                <Input
                  id="create-event-address"
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  endEnhancer={
                    <Fragment>
                      {locationLoading ? (
                        <Spinner $color="#000" $size={SIZE.small} />
                      ) : (
                        <Button
                          size="compact"
                          onClick={() => {
                            setLocationQuery("");
                          }}
                          kind="secondary"
                        >
                          <Delete />
                        </Button>
                      )}
                    </Fragment>
                  }
                />
              )}
              {locations.length > 0 && (
                <StatefulMenu
                  items={locations}
                  onItemSelect={({ item: location }) => {
                    setSelectedLocation(location);
                    setLocationQuery("");
                  }}
                  overrides={{
                    List: {
                      style: {
                        height: "250px",
                        width: "90%",
                        margin: "auto",
                      },
                    },
                    Option: {
                      props: {
                        overrides: {
                          ListItem: {
                            component: React.forwardRef((props, ref) => (
                              <MenuAdapter {...props} ref={ref}>
                                <ListItemLabel
                                  description={`Lat: ${props.item.coordinates.latitude}, Lng: ${props.item.coordinates.longitude}`}
                                >
                                  {props.item.address}
                                </ListItemLabel>
                              </MenuAdapter>
                            )),
                          },
                        },
                      },
                    },
                  }}
                />
              )}
            </Fragment>
          </FormControl>
          <Actions>
            <Button
              onClick={closeCreateEventModal}
              type="button"
              kind="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </Actions>
        </form>
      </Warpper>
    </Modal>
  );
}
