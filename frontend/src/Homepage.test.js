import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./Homepage";

// smoke test
test(" renders without crashing", function () {
  render(<HomePage />);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<HomePage />);
  expect(asFragment()).toMatchSnapshot();
});
