import React from "react";
import "./Options.scss";

export default function Options(props) {
  const { toggleShowTimer, handleChange, fizz, buzz, count } = props;
  const isDisabled = count > 0 ? true : false;
  return (
    <div id="Options">
      <p className="description">
        Please enter a fizz and buzz time in seconds.{" "}
        <strong>Values should be 2 to 10, inclusive.</strong>
      </p>
      <div className="fizz-buzz-fields">
        <label id="fizz-label" htmlFor="fizz" className="label">
          Fizz:
        </label>
        <input
          id="fizz"
          className="input"
          name="fizz"
          type="text"
          value={fizz}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <label id="buzz-label" htmlFor="buzz" className="label">
          Buzz:
        </label>
        <input
          id="buzz"
          className="input"
          name="buzz"
          type="text"
          value={buzz}
          onChange={handleChange}
          disabled={isDisabled}
        />
      </div>
      <button
        id="to-timer"
        onClick={toggleShowTimer}
        type="button"
        className="button"
      >
        Go to timer >
      </button>
    </div>
  );
}
