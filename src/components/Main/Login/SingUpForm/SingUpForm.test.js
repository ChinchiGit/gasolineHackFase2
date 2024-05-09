import React from "react";
import { shallow } from "enzyme";
import SingUpForm from "./SingUpForm";

describe("SingUpForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingUpForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
