import React from "react";
import { shallow } from "enzyme";
import RadioList from "./RadioList";

describe("RadioList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RadioList />);
    expect(wrapper).toMatchSnapshot();
  });
});
