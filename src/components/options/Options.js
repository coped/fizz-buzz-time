import React, { Component } from "react";

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
        <button onClick={toggleShowTimer} type="button">
          Go to timer >
        </button>
      </div>
    );
  }
}
