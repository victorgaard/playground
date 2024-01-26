import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Alert from "./Alert";

describe("Alert", () => {
  it("should render the component without crashing", () => {
    render(<Alert message="hey I'm an alert" />);
  });

  it("should render the correct message", () => {
    render(<Alert message="hey I'm an alert" />);
    const message = screen.getByText("hey I'm an alert");
    expect(message).toBeInTheDocument();
  });
});
