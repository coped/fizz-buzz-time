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
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Timer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders a start button", () => {
    const wrapper = shallow(<Timer />);
    expect(wrapper.find("#start-timer").length).toEqual(1);
  });

  describe("start-timer button", () => {
    it("starts the timer", () => {
      jest.useFakeTimers();
      const wrapper = shallow(<Timer />);
      const button = wrapper.find("#start-timer");
      button.simulate("click");
      expect(wrapper.instance().state.counting).toEqual(true);
      expect(wrapper.instance().state.count).toEqual(0);
      // Timer count should increase by 1 per second
      jest.advanceTimersByTime(1000);
      expect(wrapper.instance().state.count).toEqual(1);
      jest.advanceTimersByTime(1000);
      expect(wrapper.instance().state.count).toEqual(2);
    });
  });

  it("renders a stop button", () => {
    const wrapper = shallow(<Timer />);
    expect(wrapper.find("#stop-timer").length).toEqual(1);
  });

  describe("stop-timer button", () => {
    it("stops the timer", () => {
      jest.useFakeTimers();
      const wrapper = shallow(<Timer />);
      const startButton = wrapper.find("#start-timer");
      const stopButton = wrapper.find("#stop-timer");
      startButton.simulate("click");
      // Timer count advances to 1
      jest.advanceTimersByTime(1000);
      stopButton.simulate("click");
      expect(wrapper.instance().state.counting).toEqual(false);
      // After 5 seconds, count should still be at 1
      jest.advanceTimersByTime(5000);
      expect(wrapper.instance().state.count).toEqual(1);
    });

    it("resets the timer once stopped", () => {
      jest.useFakeTimers();
      const wrapper = shallow(<Timer />);
      const startButton = wrapper.find("#start-timer");
      const stopButton = wrapper.find("#stop-timer");
      startButton.simulate("click");
      // Timer count advances to 1;
      jest.advanceTimersByTime(1000);
      // Stop counting
      stopButton.simulate("click");
      // Pressing stop button while not counting should reset count
      stopButton.simulate("click");
      expect(wrapper.instance().state.count).toEqual(0);
    });
  });

  it("renders a timer output", () => {
    const wrapper = shallow(<Timer />);
    expect(wrapper.find("#timer-output").length).toEqual(1);
  });

  describe("timer-output field", () => {
    it("outputs the progression of elapsed time", () => {
      jest.useFakeTimers();
      const wrapper = mount(<Timer />);
      const output = wrapper.find("#timer-output");
      expect(output.text()).toEqual(mockTimes.starting);
      wrapper.instance().startTimer()
      jest.advanceTimersByTime(11000);
      expect(output.text()).toEqual(mockTimes.seconds);
    });
  });

  describe("function formattedTime", () => {
    it("properly formats time", () => {
      const wrapper = shallow(<Timer />);
      const instance = wrapper.instance();
      expect(instance.formattedTime(0)).toEqual(mockTimes.starting);
    });

    it("properly formats seconds", () => {
      const wrapper = shallow(<Timer />);
      const instance = wrapper.instance();
      expect(instance.formattedTime(11)).toEqual(mockTimes.seconds);
    });

    it("properly formats minutes", () => {
      const wrapper = shallow(<Timer />);
      const instance = wrapper.instance();
      expect(instance.formattedTime(1217)).toEqual(mockTimes.minutes);
    });

    it("properly formats hours", () => {
      const wrapper = shallow(<Timer />);
      const instance = wrapper.instance();
      expect(instance.formattedTime(8419)).toEqual(mockTimes.hours);
    });
  });

  // it("has a valid snapshot", () => {
  //   const component = renderer.create(<Timer />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
