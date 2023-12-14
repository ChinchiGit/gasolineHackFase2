import React from "react";
import { shallow } from "enzyme";
import RadioForm from "./RadioForm";

describe("RadioForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RadioForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
