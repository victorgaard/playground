import { generateProps } from "@/utils/generateProps";
import Button, { ButtonProps } from "./Button";

export const props = generateProps<ButtonProps>({
  Component: Button,
  defaultProps: {
    children: "👉 click me",
    variant: "primary",
    size: "md",
    isIcon: false,
    isLoading: false,
  },
  variantProps: {
    variant: ["primary", "secondary", "tertiary", "destructive", "ghost"],
    size: ["xs", "sm", "md", "lg"],
  },
  examples: {
    secondary: {
      children: "🥈 secondary button",
      variant: "secondary",
    },
    ghost: {
      children: "👻 spooky time",
      variant: "ghost",
    },
    destructive: {
      children: "👀 uh-oh danger zone",
      variant: "destructive",
    },
  },
});
