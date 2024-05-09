import React from "react";
import { shallow } from "enzyme";
import PasswordReset from "./PasswordReset";

describe("PasswordReset", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PasswordReset />);
    expect(wrapper).toMatchSnapshot();
  });
});
