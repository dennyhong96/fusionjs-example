import { styled } from "fusion-plugin-styletron-react";
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

import { useSafeDispatch } from "../hooks";

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

const ContentWrapper = styled("div", ({ $maxWidth }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  padding: "2rem",
  width: "100%",
  maxWidth: $maxWidth,
}));

const Content = styled("div", {
  position: "relative",
  background: "rgba(255, 255, 255, 1)",
  padding: "2rem",
  ":focus": {
    outline: "2px solid -webkit-focus-ring-color",
  },
  width: "100%",
});

const Close = styled("button", {
  position: "absolute",
  right: "0.5rem",
  top: "0.5rem",
  height: "36px",
  width: "36px",
  display: "grid",
  placeContent: "center",
});

const CloseIcon = styled("svg", {
  height: "24px",
  width: "24px",
});

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
      $maxWidth = "600px",
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
            <ContentWrapper $maxWidth={$maxWidth}>
              <Content
                aria-modal="true"
                role="dialog"
                ref={modalRef}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
              >
                <Close onClick={handleClose}>
                  <CloseIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </CloseIcon>
                </Close>
                {children}
              </Content>
            </ContentWrapper>
          </Wrapper>
        )}
      </Fragment>
    );
  }
);
