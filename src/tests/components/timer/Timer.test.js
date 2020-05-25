import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Timer } from "components/timer";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  const mockTimes = {
    starting: "0:00:00",
    seconds: "0:00:11",
    minutes: "0:20:17",
    hours: "2:20:19",
  };
  const selectors = {
    startTimer: "#start-timer",
    stopTimer: "#stop-timer",
    timerOutput: "#timer-output",
    fizzBuzzOutput: "#fizz-buzz-output",
  };
  const mockProps = {
    count: 0,
    counting: false,
    fizz: "",
    buzz: "",
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Timer {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders a start button", () => {
    const wrapper = shallow(<Timer {...mockProps} />);
    expect(wrapper.find(selectors.startTimer).length).toEqual(1);
  });

  it("renders a stop button", () => {
    const wrapper = shallow(<Timer {...mockProps} />);
    expect(wrapper.find(selectors.stopTimer).length).toEqual(1);
  });

  describe("timer-output field", () => {
    it("renders a timer output", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      expect(wrapper.find(selectors.timerOutput).length).toEqual(1);
    });

    it("properly formats time", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.starting
      );
    });

    it("properly formats seconds", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      wrapper.setProps({ count: 11 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.seconds
      );
    });

    it("properly formats minutes", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      wrapper.setProps({ count: 1217 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.minutes
      );
    });

    it("properly formats hours", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      wrapper.setProps({ count: 8419 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.hours
      );
    });
  });

  describe("fizz-buzz output", () => {
    it("renders a fizz-buzz output", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      expect(wrapper.find(selectors.fizzBuzzOutput).length).toEqual(1);
    });

    it("should not output anything if not fizz-buzzable", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("");
    });

    it("should output fizz", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      wrapper.setProps({ fizz: 3, count: 3 });
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("Fizz");
    });

    it("should output buzz", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      wrapper.setProps({ buzz: 3, count: 3 });
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("Buzz");
    });

    it("should output fizz-buzz", () => {
      const wrapper = shallow(<Timer {...mockProps} />);
      wrapper.setProps({ fizz: 3, buzz: 5, count: 15 });
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("FizzBuzz");
    });
  });

  // it("has a valid snapshot", () => {
  //   const component = renderer.create(<Timer />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
