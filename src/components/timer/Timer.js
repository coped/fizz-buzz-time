import React, { Component } from "react";
import { Button } from "components/common";

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
    }
    this.setState({ counting: true });
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
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }
    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }
    seconds = totalSeconds;
    return { hours, minutes, seconds };
  }

  pad(s, n) {
    return s.toString().padStart(n, "0");
  }

  timerOutput() {
    let output = "";
    output += this.formattedTime(this.state.count);
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
