import React from "react";
import { shallow } from "enzyme";
import ProvinciaForm from "./ProvinciaForm";

describe("ProvinciaForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProvinciaForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
