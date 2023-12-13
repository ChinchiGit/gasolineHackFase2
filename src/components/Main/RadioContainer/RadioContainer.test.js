import React from "react";
import { shallow } from "enzyme";
import RadioContainer from "./RadioContainer";

describe("RadioContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RadioContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
