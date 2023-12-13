import React from "react";
import { shallow } from "enzyme";
import ProvinciaList from "./ProvinciaList";

describe("ProvinciaList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProvinciaList />);
    expect(wrapper).toMatchSnapshot();
  });
});
