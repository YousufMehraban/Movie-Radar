import React from "react";
import { render } from "@testing-library/react";
import LogInForm from "./LogInForm";

// smoke test
test(" renders without crashing", function () {
  render(<LogInForm />);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<LogInForm />);
  expect(asFragment()).toMatchSnapshot();
});
