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
    fizz: "#fizz",
    buzz: "#buzz",
  };

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
    wrapper.find("#to-timer").simulate("click");
    expect(wrapper.find(Timer).length).toEqual(1);
    wrapper.find("#to-options").simulate("click");
    expect(wrapper.find(Options).length).toEqual(1);
  });

  describe("startTimer()", () => {
    it("starts the timer", () => {
      jest.useFakeTimers();
      const wrapper = mount(<App />);
      wrapper.setState({ showTimer: true });
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

  describe("stopTimer()", () => {
    it("stops the timer", () => {
      jest.useFakeTimers();
      const wrapper = mount(<App />);
      wrapper.setState({ showTimer: true });
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
      const wrapper = mount(<App />);
      wrapper.setState({ showTimer: true });
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

  describe("timer output", () => {
    it("outputs the progression of elapsed time", () => {
      jest.useFakeTimers();
      const wrapper = mount(<App />);
      wrapper.setState({ showTimer: true });
      const output = wrapper.find(selectors.timerOutput);
      expect(output.text()).toEqual(mockTimes.starting);
      wrapper.find(selectors.startTimer).simulate("click");
      jest.advanceTimersByTime(11000);
      expect(output.text()).toEqual(mockTimes.seconds);
    });

    it("should only show output at appropriate times", () => {
      jest.useFakeTimers();
      const wrapper = mount(<App />);
      wrapper.setState({ showTimer: true });
      const output = wrapper.find(selectors.fizzBuzzOutput);
      wrapper.setState({ fizz: 3, buzz: 5, count: 14 });
      expect(output.text()).toEqual("");
      // Start advancing time
      wrapper.find(selectors.startTimer).simulate("click");
      jest.advanceTimersByTime(1000);
      expect(output.text()).toEqual("FizzBuzz");
      jest.advanceTimersByTime(1000);
      expect(output.text()).toEqual("");
    });
  });

  describe("options", () => {
    it("modifies fizz values", () => {
      const wrapper = mount(<App />);
      wrapper.find(selectors.fizz).simulate("change", {
        target: {
          name: "fizz",
          value: "3",
        },
      });
      expect(wrapper.state().fizz).toEqual("3");
    });

    it("modifies buzz values", () => {
      const wrapper = mount(<App />);
      wrapper.find(selectors.buzz).simulate("change", {
        target: {
          name: "buzz",
          value: "5",
        },
      });
      expect(wrapper.state().buzz).toEqual("5");
    });

    it("disables fizz input once time has progressed", () => {
      const wrapper = mount(<App />);
      const fizzInput = wrapper.find(selectors.fizz);
      expect(fizzInput.getDOMNode().disabled).toEqual(false);
      wrapper.setState({ count: 1 });
      expect(fizzInput.getDOMNode().disabled).toEqual(true);
    });

    it("disables buzz input once time has progressed", () => {
      const wrapper = mount(<App />);
      const buzzInput = wrapper.find(selectors.buzz);
      expect(buzzInput.getDOMNode().disabled).toEqual(false);
      wrapper.setState({ count: 1 });
      expect(buzzInput.getDOMNode().disabled).toEqual(true);
    });
  });

  it("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
