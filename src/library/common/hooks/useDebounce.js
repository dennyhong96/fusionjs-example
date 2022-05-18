import { useCallback } from "react";

import { debounce } from "../../utilities";

export function useDebounce(wait) {
  // eslint-disable-next-line
  return useCallback(
    debounce((callback) => callback(), wait),
    []
  );
}
