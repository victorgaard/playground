import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("should render the component without crashing", () => {
    render(<Tooltip content="I'm a tooltip">Hover me</Tooltip>);
  });
});
