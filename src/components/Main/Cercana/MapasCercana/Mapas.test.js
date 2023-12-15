import React from "react";
import { shallow } from "enzyme";
import Mapas from "./Mapas";

describe("Mapas", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Mapas />);
    expect(wrapper).toMatchSnapshot();
  });
});
