import { describe, expect, it } from "vitest";
import { generateCodeSnippet } from "./generateCodeSnippet";

describe("generateCodeSnippet", () => {
  it("should convert the Avatar props to React JSX syntax", () => {
    expect(
      generateCodeSnippet({
        component: "Avatar",
        props: {
          picture: "./assets/avatar.jpeg",
          name: "",
          size: "md",
          status: "online",
          shape: "rounded",
        },
      }),
    ).toBe(
      `<Avatar picture="./assets/avatar.jpeg" size="md" status="online" shape="rounded" />`,
    );
  });

  it("should handle Button props, including children, to React JSX syntax", () => {
    expect(
      generateCodeSnippet({
        component: "Button",
        props: {
          children: "👉 click me",
          variant: "primary",
          size: "md",
          loading: false,
        },
      }),
    ).toBe(`<Button variant="primary" size="md">👉 click me</Button>`);
  });
});
