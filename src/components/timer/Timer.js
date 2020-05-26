import React from "react";
import "./Timer.scss";

export default function Timer(props) {
  const timerOutput = (count) => {
    return formattedTime(count);
  };

  const formattedTime = (totalSeconds) => {
    const time = secondsToTime(totalSeconds);
    return (
      pad(time.hours, 1) +
      ":" +
      pad(time.minutes, 2) +
      ":" +
      pad(time.seconds, 2)
    );
  };

  const secondsToTime = (totalSeconds) => {
    const secondsIn = {
      anHour: 3600,
      aMinute: 60,
    };

    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (totalSeconds >= secondsIn.anHour) {
      hours = Math.floor(totalSeconds / secondsIn.anHour);
      totalSeconds -= secondsIn.anHour * hours;
    }
    if (totalSeconds >= secondsIn.aMinute) {
      minutes = Math.floor(totalSeconds / secondsIn.aMinute);
      totalSeconds -= secondsIn.aMinute * minutes;
    }
    seconds = totalSeconds;
    return { hours, minutes, seconds };
  };

  const pad = (s, n) => {
    return s.toString().padStart(n, "0");
  };

  const fizzBuzzOutput = (fizz, buzz, count) => {
    let output = "";
    if (count !== 0) {
      if (count % fizz === 0) output += "Fizz";
      if (count % buzz === 0) output += "Buzz";
    }
    return output;
  };

  const { toggleShowTimer, startTimer, stopTimer, count, fizz, buzz } = props;

  return (
    <div id="Timer">
      <button
        id="to-options"
        onClick={toggleShowTimer}
        type="button"
        className="button"
      >
        {"< Set times"}
      </button>
      <div className="timer">
        <p className="description">Time Elapsed</p>
        <div className="timer-container">
          <p id="timer-output">{timerOutput(count)}</p>
        </div>
        <div className="timer-buttons">
          <button
            id="start-timer"
            onClick={startTimer}
            type="button"
            className="timer-button start"
          >
            Start
          </button>
          <button
            id="stop-timer"
            onClick={stopTimer}
            type="button"
            className="timer-button stop"
          >
            Stop / reset
          </button>
        </div>
        <p id="fizz-buzz-output" className="bold">
          {fizzBuzzOutput(fizz, buzz, count)}
        </p>
      </div>
    </div>
  );
}
