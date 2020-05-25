import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      counting: false,
    };

    this.formattedTime = this.formattedTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.incrementCount = this.incrementCount.bind(this);
    this.pad = this.pad.bind(this);
    this.timerOutput = this.timerOutput.bind(this);
    this.fizzBuzzOutput = this.fizzBuzzOutput.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
  }

  // Lifecycle methods

  componentWillUnmount() {
    clearInterval(this.countInterval);
  }

  // Component methods

  startTimer() {
    if (!this.state.counting) {
      this.countInterval = setInterval(this.incrementCount, 1000);
      this.setState({ counting: true });
    }
  }

  stopTimer() {
    if (this.state.counting) {
      clearInterval(this.countInterval);
      this.setState({ counting: false });
    } else {
      this.setState({ count: 0 });
    }
  }

  incrementCount() {
    if (this.state.count >= 35999) this.setState({ count: 0 });
    this.setState({ count: this.state.count + 1 });
  }

  formattedTime(totalSeconds) {
    const time = this.secondsToTime(totalSeconds);
    return (
      this.pad(time.hours, 1) +
      ":" +
      this.pad(time.minutes, 2) +
      ":" +
      this.pad(time.seconds, 2)
    );
  }

  secondsToTime(totalSeconds) {
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
  }

  pad(s, n) {
    return s.toString().padStart(n, "0");
  }

  timerOutput() {
    return this.formattedTime(this.state.count);
  }

  fizzBuzzOutput() {
    const { fizzBuzzValues } = this.props;
    let output = "";
    if (fizzBuzzValues && this.state.count !== 0) {
      const { fizz, buzz } = fizzBuzzValues;
      if (this.state.count % fizz === 0) output += "Fizz";
      if (this.state.count % buzz === 0) output += "Buzz";
    }
    return output;
  }

  render() {
    const { toggleShowTimer } = this.props;
    return (
      <div id="Timer">
        <button id="to-options" onClick={toggleShowTimer} type="button">
          {"< Set times"}
        </button>
        <h1 id="timer-output">{this.timerOutput()}</h1>
        <h1 id="fizz-buzz-output">{this.fizzBuzzOutput()}</h1>
        <button id="start-timer" onClick={this.startTimer} type="button">
          Start timer
        </button>
        <button id="stop-timer" onClick={this.stopTimer} type="button">
          Stop / reset timer
        </button>
      </div>
    );
  }
}
