import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("should render the component without crashing", () => {
    render(<Input />);
  });

  it("should render a label over the input", () => {
    render(<Input label="I'm a label" />);
    const label = screen.getByLabelText("I'm a label");
    expect(label).toBeInTheDocument();
  });

  it("should style the input correctly when a pattern is not matched", () => {
    const { container } = render(
      <Input pattern="^$" defaultValue="I'll make the input invalid" />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveClass(/invalid:/);
  });
});
