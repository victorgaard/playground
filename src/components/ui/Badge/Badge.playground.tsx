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
    variant: ["purple", "green", "yellow", "grey"],
    size: ["xs", "sm", "md"],
  },
});
