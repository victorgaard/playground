import { generateProps } from "@/utils/generateProps";
import Badge, { BadgeProps } from "./Badge";

export const props = generateProps<BadgeProps>({
  Component: Badge,
  defaultProps: {
    children: "this is a badge",
    variant: "purple",
    size: "xs",
  },
  variantProps: {
    variant: ["purple", "green", "orange", "grey"],
    size: ["xs", "sm", "md"],
  },
});
