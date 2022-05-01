import { useState, Fragment, useEffect } from "react";
import fetch from "isomorphic-fetch";
import { Helmet } from "fusion-plugin-react-helmet-async";

const Root = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const handleOnKeydown = async (e) => {
    e.preventDefault();
    if (!inputText) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: inputText }),
    });
    setInputText("");
    setTodos([...todos, inputText]);
  };

  const handleOnChange = (e) => {
    setInputText(e.currentTarget.value);
  };

  return (
    <Fragment>
      <Helmet>
        <style>
          {`
            body {
              background-color: #f5f5f5;
              font: 24px 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            h1 {
              color: rgba(175, 47, 47, 0.15);
              font-size: 100px;
              font-weight: 100;
              text-align: center;
            }
            .container {
              background: #ffffff;
              border: 1px solid #ededed;
              margin: 0 auto;
              width: 550px;
            }
            input {
              border: none;
              font-size: 24px;
              font-weight: 300;
              padding: 15px;
              width: 520px;
            }
            input::placeholder {
              color: #e6e6e6;
              font-style: italic;
              font-weight: 100;
            }
            .todo {
              border-top: 1px solid #ededed;
              padding: 15px;
            }
            .todo-text {
              font-weight: 300;
            }
          `}
        </style>
      </Helmet>
      <h1>todos</h1>
      <form className="container" onSubmit={handleOnKeydown}>
        <input
          onChange={handleOnChange}
          placeholder="What needs to be done?"
          value={inputText}
          type="text"
        />
        {todos.map((todo) => (
          <div key={todo} className="todo">
            <div className="todo-text">{todo}</div>
          </div>
        ))}
      </form>
    </Fragment>
  );
};

export default Root;
