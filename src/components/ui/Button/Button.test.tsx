import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("should render the component without crashing", () => {
    render(<Button>Hello world</Button>);
  });

  it("should render the loading spinner when button is loading", () => {
    render(<Button isLoading={true}>I'm loading</Button>);
    const isLoading = screen.getByTestId("loading-spinner");
    expect(isLoading).toBeInTheDocument();
  });
});
