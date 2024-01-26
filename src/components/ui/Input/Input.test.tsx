import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("should render the component without crashing", () => {
    render(<Input />);
  });
});
