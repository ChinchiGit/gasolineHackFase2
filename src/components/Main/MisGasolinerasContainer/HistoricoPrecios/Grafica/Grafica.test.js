import React from "react";
import { shallow } from "enzyme";
import Grafica from "./Grafica";

describe("Grafica", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Grafica />);
    expect(wrapper).toMatchSnapshot();
  });
});
