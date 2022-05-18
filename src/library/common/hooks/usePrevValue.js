import { useEffect, useRef } from "react";

export function usePrevValue(value) {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
}
