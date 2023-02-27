import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./Navbar";

// smoke test
test(" renders without crashing", function () {
  render(<NavBar />);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<NavBar />);
  expect(asFragment()).toMatchSnapshot();
});
