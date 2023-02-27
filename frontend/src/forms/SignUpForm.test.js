import React from "react";
import { render } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

// smoke test
test(" renders without crashing", function () {
  render(<SignUpForm />);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<SignUpForm />);
  expect(asFragment()).toMatchSnapshot();
});
