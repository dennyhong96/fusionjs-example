export default function Typeahead({ items }) {
  const handleCloseResults = (evt) => {
    evt.preventDefault();
    setQuery("");
    inputRef.current.focus();
    return;
  };

  const handleResultNavigation = (evt) => {
    const target = evt.target;
    const resultButtons = [...resultListRef.current.querySelectorAll("button")];
    const index = resultButtons.findIndex((el) => el === target);
    if (index < 0) return;
    if (evt.key === "ArrowUp") {
      evt.preventDefault(); // prevent default scroll behavior
      if (index === 0) {
        resultButtons[resultButtons.length - 1].focus();
      } else {
        resultButtons[index - 1].focus();
      }
    } else if (evt.key === "ArrowDown") {
      evt.preventDefault();
      if (index === resultButtons.length - 1) {
        resultButtons[0].focus();
      } else {
        resultButtons[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Escape") {
      return handleCloseResults(evt);
    }
    handleResultNavigation(evt);
  };

  return (
    <section>
      <div>
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button aria-label="Clear query" onClick={setQuery.bind(null, "")}>
          x
        </button>
      </div>
      {items.length > 0 && (
        <ul ref={resultListRef} tabIndex={-1} onKeyDown={handleKeyDown}>
          {items.map((item) => (
            <li key={item}>
              <button onClick={addToList.bind(null, item)}>{item}</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
