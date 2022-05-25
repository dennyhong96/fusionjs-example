import {
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Modal as _Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
// import { KIND as ButtonKind } from "baseui/button";

import { useSafeDispatch } from "../hooks";

export const Modal = forwardRef(
  (
    {
      open: externalOpen,
      onOpen,
      onClose,
      initialOpen = false,
      trigger,
      returnFocusRef,
      children,
      renderHeader = null,
      renderActions = null,
    },
    handleRef
  ) => {
    // states
    const [internalOpen, unsafeSetInternalOpen] = useState(initialOpen);
    const setInternalOpen = useSafeDispatch(unsafeSetInternalOpen);

    // derived states
    const isExternalControll = externalOpen !== undefined;
    const open = isExternalControll ? externalOpen : internalOpen;

    // refs
    const prevOpenRef = useRef(false);
    const modalRef = useRef(null);
    const triggerRef = useRef(null);

    // Expose handleClose as an imperative API
    useImperativeHandle(handleRef, () => ({
      handleClose,
    }));

    // effect
    useEffect(() => {
      if (prevOpenRef.current && !open) {
        // changed from open to close
        triggerRef.current?.focus();
        returnFocusRef?.current?.focus();
      }
      prevOpenRef.current = open;

      // eslint-disable-next-line
    }, [open]);

    // handlers
    const handleOpen = () => {
      if (!isExternalControll) setInternalOpen(true);
      onOpen?.();
    };

    const handleClose = () => {
      if (!isExternalControll) setInternalOpen(false);
      onClose?.();
    };

    if (trigger && isValidElement(trigger)) {
      trigger = cloneElement(trigger, {
        onClick() {
          open ? handleClose() : handleOpen();
        },
        ref: triggerRef,
      });
    }

    return (
      <Fragment>
        {trigger && isValidElement(trigger) && trigger}
        <_Modal
          onClose={handleClose}
          closeable
          isOpen={open}
          animate
          autoFocus
          size={SIZE.default}
          role={ROLE.dialog}
        >
          <ModalHeader>{renderHeader}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            {/* <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
            <ModalButton>Okay</ModalButton> */}
            {renderActions}
          </ModalFooter>
        </_Modal>
      </Fragment>
    );
  }
);
