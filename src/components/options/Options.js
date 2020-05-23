import React, { Component } from "react";
import { Button } from "components/common";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "something",
    };
  }

  render() {
    const { toggleShowTimer } = this.props;
    return (
      <div id="Options">
        <p>I am options!</p>
        <Button onClick={toggleShowTimer}>Go to timer ></Button>
      </div>
    );
  }
}
