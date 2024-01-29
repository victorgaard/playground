import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";

describe("Badge", () => {
  it("should render the component without crashing", () => {
    render(<Badge>Hey I'm a badge</Badge>);
  });

  it("should the badge without a border correctly", () => {
    const { container } = render(
      <Badge hasBorder={false}>I'm a borderless badge</Badge>,
    );
    expect(container.firstChild).not.toHaveClass("border");
  });
});
