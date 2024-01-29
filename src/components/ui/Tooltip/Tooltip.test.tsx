import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("should render the component without crashing", () => {
    render(<Tooltip trigger="hover me">Hello world</Tooltip>);
  });
});
