import { useRef } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { useMutation } from "react-apollo";

import useApolloCache from "../hooks/useApolloCache";
import Modal from "./Modal";
import Form from "./Form";
import { CREATE_EVENT, GET_EVENTS } from "../graphql/event";

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

export function CreateEventModal() {
  const [createEvent] = useMutation(CREATE_EVENT);
  const { updateCachedData } = useApolloCache({
    query: GET_EVENTS,
    cacheKey: "events",
  });

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
    if (!title || !description || !isFinite(price) || !date) {
      return;
    }
    const {
      data: { createEvent: newEvent },
    } = await createEvent({
      variables: {
        eventInput: {
          title,
          description,
          price,
          date: new Date(date).toISOString(),
        },
      },
    });
    updateCachedData((events) => [...events, newEvent]);
    closeCreateEventModal();
  };

  return (
    <Modal ref={createEventModal} trigger={<button>Create your event</button>}>
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
        <Actions>
          <button onClick={closeCreateEventModal} type="button">
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </Actions>
      </Form>
    </Modal>
  );
}
