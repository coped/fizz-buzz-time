import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Options } from "components/options";

Enzyme.configure({ adapter: new Adapter() });

describe("Options", () => {
  const selectors = {
    fizz: "#fizz",
    buzz: "#buzz",
    fizzLabel: "#fizz-label",
    buzzLabel: "#buzz-label",
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Options />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders a fizz label", () => {
    const wrapper = shallow(<Options />);
    expect(wrapper.find(selectors.fizzLabel).length).toEqual(1);
  });

  it("renders a fizz input field", () => {
    const wrapper = shallow(<Options />);
    expect(wrapper.find(selectors.fizz).length).toEqual(1);
  });

  it("renders a buzz label", () => {
    const wrapper = shallow(<Options />);
    expect(wrapper.find(selectors.buzzLabel).length).toEqual(1);
  });

  it("renders a buzz input field", () => {
    const wrapper = shallow(<Options />);
    expect(wrapper.find(selectors.buzz).length).toEqual(1);
  });

  // it("has a valid snapshot", () => {
  //   const component = renderer.create(<Options />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
