import React from "react";

export default function Options(props) {
  const { toggleShowTimer, handleChange, fizz, buzz } = props;
  return (
    <div id="Options">
      <p>
        Please enter a fizz and buzz time in seconds.{" "}
        <span className="bold">Values should be 2 to 10, inclusive</span>.
      </p>
      <div>
        <label id="fizz-label" htmlFor="fizz">
          Fizz:
        </label>
        <input
          id="fizz"
          name="fizz"
          type="text"
          value={fizz}
          onChange={handleChange}
        />
        <label id="buzz-label" htmlFor="buzz">
          Buzz:
        </label>
        <input
          id="buzz"
          name="buzz"
          type="text"
          value={buzz}
          onChange={handleChange}
        />
      </div>
      <button id="to-timer" onClick={toggleShowTimer} type="button">
        Go to timer >
      </button>
    </div>
  );
}
