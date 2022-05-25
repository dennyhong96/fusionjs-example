import { Fragment, useRef, useState } from "react";
import { styled } from "fusion-plugin-styletron-react";
import { Button } from "baseui/button";

import { Modal } from ".";
import { useSafeDispatch } from "../hooks";
import { LabelMedium, ParagraphMedium } from "baseui/typography";

const ConfirmationDialog = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

export function ConfirmationModal({
  title,
  triggerText,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
}) {
  const [open, unsafeSetOpen] = useState(false);
  const setOpen = useSafeDispatch(unsafeSetOpen);

  const triggerRef = useRef(null);

  return (
    <Fragment>
      <Button
        overrides={{
          Root: {
            style: {
              width: "100%",
            },
          },
        }}
        onClick={() => setOpen(true)}
        ref={triggerRef}
      >
        {triggerText}
      </Button>
      <Modal
        $maxWidth="450px"
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
      >
        <ConfirmationDialog>
          <LabelMedium>{title}</LabelMedium>
          <ParagraphMedium>{description}</ParagraphMedium>
          <Actions>
            <Button kind="secondary" onClick={() => setOpen(false)}>
              {cancelText}
            </Button>
            <Button
              onClick={async () => {
                await onConfirm();
                setOpen(false);
              }}
            >
              {confirmText}
            </Button>
          </Actions>
        </ConfirmationDialog>
      </Modal>
    </Fragment>
  );
}
