import React from "react";
import { shallow } from "enzyme";
import HistoricoPrecios from "./HistoricoPrecios";

describe("HistoricoPrecios", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HistoricoPrecios />);
    expect(wrapper).toMatchSnapshot();
  });
});
