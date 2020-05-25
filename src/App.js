import React, { Component } from "react";
import "App.css";
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

  render() {
    const { count, counting, fizz, buzz } = this.state;
    return (
      <div id="App">
        {this.state.showTimer ? (
          <Timer
            toggleShowTimer={this.toggleShowTimer}
            count={count}
            counting={counting}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            fizz={fizz}
            buzz={buzz}
          />
        ) : (
          <Options
            toggleShowTimer={this.toggleShowTimer}
            handleChange={this.handleChange}
            fizz={this.state.fizz}
            buzz={this.state.buzz}
          />
        )}
      </div>
    );
  }
}
