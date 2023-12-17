import React from "react";
import { shallow } from "enzyme";
import LogOut from "./LogOut";

describe("LogOut", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LogOut />);
    expect(wrapper).toMatchSnapshot();
  });
});
