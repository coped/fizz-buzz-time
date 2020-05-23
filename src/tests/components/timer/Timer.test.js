import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Timer } from "components/timer";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Timer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it("has a valid snapshot", () => {
  //   const component = renderer.create(<Timer />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
