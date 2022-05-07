import { Fragment, useRef, useState } from "react";
import { styled } from "fusion-plugin-styletron-react";

import Modal from "./Modal";

const ConfirmationDialog = styled("div", {
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

export default function ConfirmationModal({
  title,
  triggerText,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
}) {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef(null);

  return (
    <Fragment>
      <button onClick={() => setOpen(true)} ref={triggerRef}>
        {triggerText}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
      >
        <ConfirmationDialog>
          <h4>{title}</h4>
          <p>{description}</p>
          <Actions>
            <button onClick={() => setOpen(false)}>{cancelText}</button>
            <button
              onClick={async () => {
                await onConfirm();
                setOpen(false);
              }}
            >
              {confirmText}
            </button>
          </Actions>
        </ConfirmationDialog>
      </Modal>
    </Fragment>
  );
}
