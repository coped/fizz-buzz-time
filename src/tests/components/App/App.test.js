import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "App";
import { Options } from "components/options";
import { Timer } from "components/timer";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders options", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Options).length).toEqual(1);
  });

  it("toggles between options and timer", () => {
    const wrapper = mount(<App />);
    wrapper.find("button").simulate("click");
    expect(wrapper.find(Timer).length).toEqual(1);
  });

  // it("has a valid snapshot", () => {
  //   const component = renderer.create(<App />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
