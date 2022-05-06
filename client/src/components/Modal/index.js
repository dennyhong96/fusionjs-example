import {
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "fusion-plugin-styletron-react";

const FOCUSABLE_EL_SELECTORS =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)';

const Wrapper = styled("div", {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  isolation: "isolate",
});

const Backdrop = styled("div", {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.2)",
});

const Content = styled("div", {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  width: "100%",
  maxWidth: "500px",
  background: "rgba(255, 255, 255, 1)",
  padding: "2rem",
  borderRadius: "5px",
  ":foucs": {
    outline: "2px solid -webkit-focus-ring-color",
  },
});

const Close = styled("button", {
  width: "30px",
  height: "30px",
  borderRadius: "4px",
  position: "absolute",
  right: "0.5rem",
  top: "0.5rem",
  display: "grid",
  placeContent: "center",
  border: "initial",
  cursor: "pointer",
});

export default function Modal({
  open: externalOpen,
  onOpen,
  onClose,
  initialOpen = false,
  trigger,
  returnFocusRef,
  children,
}) {
  // states
  const [internalOpen, setInternalOpen] = useState(initialOpen);

  // derived states
  const isExternalControll = externalOpen !== undefined;
  const open = isExternalControll ? externalOpen : internalOpen;

  // refs
  const prevOpenRef = useRef(false);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // effect
  useEffect(() => {
    if (!prevOpenRef.current && open) {
      // changed from close to open
      modalRef.current.focus();
    } else if (prevOpenRef.current && !open) {
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

  const handleTrapFocus = (evt) => {
    const target = evt.target;
    const focusables = [
      ...modalRef.current.querySelectorAll(FOCUSABLE_EL_SELECTORS),
    ];
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];
    if (target === firstFocusable || !focusables.includes(target)) {
      if (evt.key === "Tab" && evt.shiftKey) {
        evt.preventDefault();
        lastFocusable.focus();
      }
    } else if (target === lastFocusable || !focusables.includes(target)) {
      if (evt.key === "Tab" && !evt.shiftKey) {
        evt.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      handleClose();
      return;
    }
    handleTrapFocus(evt);
  };

  return (
    <Fragment>
      {trigger && isValidElement(trigger) && trigger}
      {open && (
        <Wrapper>
          <Backdrop onClick={handleClose} />
          <Content
            aria-modal="true"
            role="dialog"
            ref={modalRef}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            <Close onClick={handleClose}>x</Close>
            {children}
          </Content>
        </Wrapper>
      )}
    </Fragment>
  );
}
