import React, { Component } from "react";
import "App.css";
import { Timer } from "components/timer";
import { Options } from "components/options";
import { Button } from "components/common";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: false,
    };

    this.toggleShowTimer = this.toggleShowTimer.bind(this);
  }

  toggleShowTimer() {
    this.setState({ showTimer: !this.state.showTimer });
  }

  render() {
    const { showTimer } = this.state;
    return (
      <div id="App">
        {showTimer ? (
          <Timer toggleShowTimer={this.toggleShowTimer} />
        ) : (
          <Options toggleShowTimer={this.toggleShowTimer} />
        )}
      </div>
    );
  }
}
