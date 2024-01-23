import React from "react";
import { shallow } from "enzyme";
import SingInForm from "./SingInForm";

describe("SingInForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SingInForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
