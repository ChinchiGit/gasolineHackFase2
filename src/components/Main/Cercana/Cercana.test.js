import React from "react";
import { shallow } from "enzyme";
import Cercana from "./Cercana";

describe("Cercana", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Cercana />);
    expect(wrapper).toMatchSnapshot();
  });
});
