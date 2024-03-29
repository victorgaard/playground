import { generateProps } from "@/utils/generateProps";
import Badge, { BadgeProps } from "./Badge";

export const props = generateProps<BadgeProps>({
  Component: Badge,
  defaultProps: {
    children: "this is a badge",
    variant: "yellow",
    size: "xs",
    hasBorder: true,
  },
  variantProps: {
    variant: ["purple", "green", "yellow", "gray"],
    size: ["xs", "sm", "md"],
  },
  examples: {
    borderless: {
      hasBorder: false,
      children: "where's my border again? 🤔",
      variant: "purple",
      size: "md"
    },
  },
});
