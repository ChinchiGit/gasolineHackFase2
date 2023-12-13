import React from "react";
import { shallow } from "enzyme";
import ProvinciaContainer from "./ProvinciaContainer";

describe("ProvinciaContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProvinciaContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
