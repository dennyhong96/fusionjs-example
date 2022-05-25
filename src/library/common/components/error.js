import { useStyletron } from "baseui";

export function Error() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        flexDirection: "column",
        gap: "1rem",
      })}
      title="Error"
      aria-label="Error"
    >
      <p>Failed to load, please try refresh.</p>
      <button onClick={() => location.assign(location)}>Refresh</button>
    </div>
  );
}

export default Error;
