import React, { Component } from "react";
import { Button } from "components/common";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "something",
    };
  }
  render() {
    const { toggleShowTimer } = this.props;
    return (
      <div id="Timer">
        <Button onClick={toggleShowTimer}>{"< Set times"}</Button>
        <p>I am a timer!</p>
      </div>
    );
  }
}
