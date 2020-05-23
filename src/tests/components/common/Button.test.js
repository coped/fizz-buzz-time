import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "components/common";

Enzyme.configure({ adapter: new Adapter() });

describe("Button", () => {
  const text = "I'm a button";
  const props = {
    className: "test",
    onClick: () => console.log("Clicked"),
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("properly renders children", () => {
    const wrapper = mount(<Button>{text}</Button>);
    expect(wrapper.find("button").text()).toEqual(text);
  });

  it("properly handles props", () => {
    const wrapper = shallow(<Button {...props}></Button>);
    expect(wrapper.find("button").hasClass(props.className)).toEqual(true);
  });

  it("has a valid snapshot", () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has a valid snapshot with props", () => {
    const component = renderer.create(<Button {...props}>{text}</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
