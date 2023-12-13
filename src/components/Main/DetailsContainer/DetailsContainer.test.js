import React from "react";
import { shallow } from "enzyme";
import DetailsContainer from "./DetailsContainer";

describe("DetailsContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DetailsContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
