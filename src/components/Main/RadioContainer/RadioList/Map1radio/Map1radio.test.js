import React from "react";
import { shallow } from "enzyme";
import Map1 from "./Map1provincia";

describe("Map1", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Map1 />);
    expect(wrapper).toMatchSnapshot();
  });
});
