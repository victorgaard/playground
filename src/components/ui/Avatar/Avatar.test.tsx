import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("should render the component without crashing", () => {
    render(<Avatar />);
  });

  it("should render the initial letter if picture is not provided", () => {
    render(<Avatar name="John doe" />);
    const avatarFallback = screen.getByText("J")
    expect(avatarFallback).toBeInTheDocument()
  });

  it("should render N/A if no picture and no name were provided", () => {
    render(<Avatar />);
    const fallback = screen.getByText("N/A")
    expect(fallback).toBeInTheDocument()
  });
});
