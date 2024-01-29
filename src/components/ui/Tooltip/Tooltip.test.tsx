import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Tooltip from "./Tooltip";
import Button from "../Button/Button";

describe("Tooltip", () => {
  it("should render the component without crashing", () => {
    render(<Tooltip trigger="hover me">Hello world</Tooltip>);
  });

  it("should display the content on hover", async () => {
    render(
      <Tooltip
        trigger={<Button data-testid="tooltip-trigger">hover me</Button>}
      >
        Hello world
      </Tooltip>,
    );
    const tooltipTrigger = screen.getByTestId("tooltip-trigger");
    fireEvent.mouseEnter(tooltipTrigger);
    const tooltipMessage = await screen.findByTestId("tooltip-message", {}, { timeout: 100 });
    expect(tooltipMessage).toBeVisible();
  });
});
