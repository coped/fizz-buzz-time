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

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Timer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("start-timer button", () => {
    it("renders a start button", () => {
      const wrapper = shallow(<Timer />);
      expect(wrapper.find(selectors.startTimer).length).toEqual(1);
    });

    it("starts the timer", () => {
      jest.useFakeTimers();
      const wrapper = shallow(<Timer />);
      const button = wrapper.find(selectors.startTimer);
      button.simulate("click");
      expect(wrapper.state().counting).toEqual(true);
      expect(wrapper.state().count).toEqual(0);
      // Timer count should increase by 1 per second
      jest.advanceTimersByTime(1000);
      expect(wrapper.state().count).toEqual(1);
      jest.advanceTimersByTime(1000);
      expect(wrapper.state().count).toEqual(2);
    });
  });

  describe("stop-timer button", () => {
    it("renders a stop button", () => {
      const wrapper = shallow(<Timer />);
      expect(wrapper.find(selectors.stopTimer).length).toEqual(1);
    });

    it("stops the timer", () => {
      jest.useFakeTimers();
      const wrapper = shallow(<Timer />);
      const startButton = wrapper.find(selectors.startTimer);
      const stopButton = wrapper.find(selectors.stopTimer);
      startButton.simulate("click");
      // Timer count advances to 1
      jest.advanceTimersByTime(1000);
      // Stop timer
      stopButton.simulate("click");
      expect(wrapper.state().counting).toEqual(false);
      // After 5 seconds, count should still be at 1
      jest.advanceTimersByTime(5000);
      expect(wrapper.state().count).toEqual(1);
    });

    it("resets the timer once stopped", () => {
      jest.useFakeTimers();
      const wrapper = shallow(<Timer />);
      const startButton = wrapper.find(selectors.startTimer);
      const stopButton = wrapper.find(selectors.stopTimer);
      startButton.simulate("click");
      // Timer count advances to 1;
      jest.advanceTimersByTime(1000);
      // Stop timer
      stopButton.simulate("click");
      // Pressing stop button while not counting should reset count
      stopButton.simulate("click");
      expect(wrapper.state().count).toEqual(0);
    });
  });

  describe("timer-output field", () => {
    it("renders a timer output", () => {
      const wrapper = shallow(<Timer />);
      expect(wrapper.find(selectors.timerOutput).length).toEqual(1);
    });

    it("properly formats time", () => {
      const wrapper = shallow(<Timer />);
      wrapper.setState({ count: 0 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.starting
      );
    });

    it("properly formats seconds", () => {
      const wrapper = shallow(<Timer />);
      wrapper.setState({ count: 11 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.seconds
      );
    });

    it("properly formats minutes", () => {
      const wrapper = shallow(<Timer />);
      wrapper.setState({ count: 1217 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.minutes
      );
    });

    it("properly formats hours", () => {
      const wrapper = shallow(<Timer />);
      wrapper.setState({ count: 8419 });
      expect(wrapper.find(selectors.timerOutput).text()).toEqual(
        mockTimes.hours
      );
    });

    it("outputs the progression of elapsed time", () => {
      jest.useFakeTimers();
      const wrapper = mount(<Timer />);
      const output = wrapper.find(selectors.timerOutput);
      expect(output.text()).toEqual(mockTimes.starting);
      wrapper.find(selectors.startTimer).simulate("click");
      jest.advanceTimersByTime(11000);
      expect(output.text()).toEqual(mockTimes.seconds);
    });
  });

  describe("fizz-buzz output", () => {
    it("renders a fizz-buzz output", () => {
      const wrapper = shallow(<Timer />);
      expect(wrapper.find(selectors.fizzBuzzOutput).length).toEqual(1);
    });

    it("should not output anything if not fizz-buzzable", () => {
      const wrapper = shallow(<Timer />);
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("");
    });

    it("should output fizz", () => {
      const wrapper = shallow(<Timer />);
      const fizzBuzzValues = {
        fizz: 3,
      };
      wrapper.setProps({ fizzBuzzValues });
      wrapper.setState({ count: 3 });
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("Fizz");
    });

    it("should output buzz", () => {
      const wrapper = shallow(<Timer />);
      const fizzBuzzValues = {
        buzz: 3,
      };
      wrapper.setProps({ fizzBuzzValues });
      wrapper.setState({ count: 3 });
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("Buzz");
    });

    it("should output fizz-buzz", () => {
      const wrapper = shallow(<Timer />);
      const fizzBuzzValues = {
        fizz: 3,
        buzz: 5,
      };
      wrapper.setProps({ fizzBuzzValues });
      wrapper.setState({ count: 15 });
      expect(wrapper.find(selectors.fizzBuzzOutput).text()).toEqual("FizzBuzz");
    });

    it("should only show output at appropriate times", () => {
      jest.useFakeTimers();
      const wrapper = mount(<Timer />);
      const output = wrapper.find(selectors.fizzBuzzOutput);
      const fizzBuzzValues = {
        fizz: 3,
        buzz: 5,
      };
      wrapper.setProps({ fizzBuzzValues });
      wrapper.setState({ count: 14 });
      expect(output.text()).toEqual("");
      // Start advancing time
      wrapper.find(selectors.startTimer).simulate("click");
      jest.advanceTimersByTime(1000);
      expect(output.text()).toEqual("FizzBuzz");
      jest.advanceTimersByTime(1000);
      expect(output.text()).toEqual("");
    });
  });

  // it("has a valid snapshot", () => {
  //   const component = renderer.create(<Timer />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
