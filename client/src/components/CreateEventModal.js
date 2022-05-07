import { useRef } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";

import Modal from "./Modal";
import Form from "./Form";

const CREATE_EVENT = gql`
  mutation CreatEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id
      title
      description
      price
      date
      createdBy {
        email
      }
    }
  }
`;

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

export function CreateEventModal() {
  const [createEvent] = useMutation(CREATE_EVENT);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);
  const createEventModal = useRef(null);
  const closeCreateEventModal = () => createEventModal.current?.handleClose?.();

  const handleCreateEvent = async (evt) => {
    evt.preventDefault();
    const title = titleRef.current?.value;
    const description = descRef.current?.value;
    const price = Number(priceRef.current?.value);
    const date = dateRef.current?.value;
    if (!title || !description || !isFinite(price) || !date) {
      return;
    }
    await createEvent({
      variables: {
        eventInput: {
          title,
          description,
          price,
          date: new Date(date).toISOString(),
        },
      },
    });
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
          <input ref={descRef} type="text" />
        </Form.Field>
        <Form.Field>
          <span>Price:</span>
          <input ref={priceRef} type="text" />
        </Form.Field>
        <Form.Field>
          <span>Date:</span>
          <input ref={dateRef} type="date" />
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
