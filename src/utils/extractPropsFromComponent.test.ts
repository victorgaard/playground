import { describe, expect, it } from "vitest";
import { extractPropsFromComponent } from "./extractPropsFromComponent";
import Avatar from "@/components/ui/Avatar/Avatar";

const playgroundComponents = import.meta.glob("./../**/*.playground.tsx", {
  eager: true,
});

describe("extractPropsFromComponent", () => {
  it("should loop over the playground components and retrieve the Avatar component and props", () => {
    expect(
      extractPropsFromComponent(playgroundComponents, "Avatar"),
    ).toStrictEqual({
      Component: Avatar,
      config: {
        defaultProps: {
          picture: "./assets/knight.jpeg",
          name: "",
          size: "md",
          status: "online",
          shape: "rounded",
        },
        variantProps: {
          size: ["sm", "md", "lg", "xl"],
          shape: ["rounded", "squared"],
          status: ["online", "offline", "idle"],
        },
        examples: {
          squared: {
            picture: "./assets/knight.jpeg",
            shape: "squared",
            size: "lg",
            status: "idle",
          },
          fallback: {
            picture: "",
            name: "knight",
            status: "offline",
          },
        },
      },
    });
  });
});
