import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// smoke test
test("App renders without crashing", function () {
  render(<App />);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
