import React, { Component } from "react";
import "App.scss";
import { Timer } from "components/timer";
import { Options } from "components/options";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimer: false,
      count: 0,
      counting: false,
      fizz: "",
      buzz: "",
    };

    this.toggleShowTimer = this.toggleShowTimer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.incrementCount = this.incrementCount.bind(this);
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

  toggleShowTimer() {
    this.setState({ showTimer: !this.state.showTimer });
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value.replace(/\D/, ""),
    });
  }

  showTimerOrOptions(showTimer) {
    const { count, counting, fizz, buzz } = this.state;
    if (showTimer) {
      return (
        <Timer
          key="timer"
          toggleShowTimer={this.toggleShowTimer}
          count={count}
          counting={counting}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          fizz={fizz}
          buzz={buzz}
        />
      );
    } else {
      return (
        <Options
          key="options"
          toggleShowTimer={this.toggleShowTimer}
          handleChange={this.handleChange}
          count={count}
          fizz={fizz}
          buzz={buzz}
        />
      );
    }
  }
  render() {
    return <div id="App">{this.showTimerOrOptions(this.state.showTimer)}</div>;
  }
}
