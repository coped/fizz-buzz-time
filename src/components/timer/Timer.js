import React from "react";

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
      <button id="to-options" onClick={toggleShowTimer} type="button">
        {"< Set times"}
      </button>
      <h1 id="timer-output">{timerOutput(count)}</h1>
      <h1 id="fizz-buzz-output">{fizzBuzzOutput(fizz, buzz, count)}</h1>
      <button id="start-timer" onClick={startTimer} type="button">
        Start timer
      </button>
      <button id="stop-timer" onClick={stopTimer} type="button">
        Stop / reset timer
      </button>
    </div>
  );
}
