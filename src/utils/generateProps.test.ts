import { describe, expect, it } from "vitest";
import { generateProps } from "./generateProps";
import Button from "@/components/ui/Button/Button";

describe("generateProps", () => {
  it("should generate the minimal props for a button", () => {
    expect(
      generateProps({
        Component: Button,
        defaultProps: {
          variant: "primary",
          children: "hello world",
        },
      }),
    ).toStrictEqual({
      Component: Button,
      config: {
        defaultProps: {
          variant: "primary",
          children: "hello world",
        },
        variantProps: {},
        examples: {},
      },
    });
  });

  it ("should generate the complete props for a button", () => {
    expect(
      generateProps({
        Component: Button,
        defaultProps: {
          variant: "primary",
          children: "hello world",
        },
        variantProps: {
          variant: ["primary", "ghost"]
        },
        examples: {
          "disabled button": {
            disabled: true,
            children: "I'm a disabled button"
          }
        }
      }),
    ).toStrictEqual({
      Component: Button,
      config: {
        defaultProps: {
          variant: "primary",
          children: "hello world",
        },
        variantProps: {
          variant: ["primary", "ghost"]
        },
        examples: {
          "disabled button": {
            disabled: true,
            children: "I'm a disabled button"
          }
        },
      },
    });
  })
});
