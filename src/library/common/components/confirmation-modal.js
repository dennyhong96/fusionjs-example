import { Fragment, useRef, useState } from "react";
import { Button } from "baseui/button";
import { useStyletron } from "styletron-react";
import { LabelMedium, ParagraphMedium } from "baseui/typography";

import { Modal } from ".";
import { useSafeDispatch } from "../hooks";

export function ConfirmationModal({
  title,
  triggerText,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
}) {
  const [css] = useStyletron();
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
        renderHeader={<LabelMedium>{title}</LabelMedium>}
        renderActions={
          <Fragment>
            <Button
              kind="secondary"
              overrides={{
                Root: {
                  style: {
                    marginRight: "1rem",
                  },
                },
              }}
              onClick={() => setOpen(false)}
            >
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
          </Fragment>
        }
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
      >
        <div
          className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          <ParagraphMedium>{description}</ParagraphMedium>
        </div>
      </Modal>
    </Fragment>
  );
}
