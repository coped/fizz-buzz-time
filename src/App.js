import React, { Component } from "react";
import "App.css";
import { Timer } from "components/timer";
import { Options } from "components/options";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimer: false,
    };

    this.toggleShowTimer = this.toggleShowTimer.bind(this);
    this.main = this.main.bind(this);
  }

  toggleShowTimer() {
    this.setState({ showTimer: !this.state.showTimer });
  }

  main() {
    if (this.state.showTimer) {
      return <Timer toggleShowTimer={this.toggleShowTimer} />;
    } else {
      return <Options toggleShowTimer={this.toggleShowTimer} />;
    }
  }

  render() {
    return (
      <div id="App">
        {this.main()}
      </div>
    );
  }
}
