import { useSelector } from "react-redux";

export function useStatic() {
  return useSelector((state) => state.static);
}
