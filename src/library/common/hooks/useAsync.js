import { useSafeDispatch } from ".";

const STATUS = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

const defaultState = { status: STATUS.idle, data: null, error: null };

export function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data) => safeSetState({ data, status: STATUS.resolved }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error) => safeSetState({ error, status: STATUS.rejected }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: STATUS.pending });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === STATUS.idle,
    isLoading: status === STATUS.pending,
    isError: status === STATUS.rejected,
    isSuccess: status === STATUS.resolved,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
