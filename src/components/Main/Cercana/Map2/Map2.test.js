import React from "react";
import { shallow } from "enzyme";
import Map2 from "./Map2";

describe("Map2", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Map2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
