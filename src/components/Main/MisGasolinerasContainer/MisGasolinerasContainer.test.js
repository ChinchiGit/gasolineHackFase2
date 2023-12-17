import React from "react";
import { shallow } from "enzyme";
import MisGasolinerasContainer from "./MisGasolinerasContainer";

describe("MisGasolinerasContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MisGasolinerasContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
