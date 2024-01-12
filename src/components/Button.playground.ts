import { generateProps } from "../utils/generateProps";
import { ButtonProps } from "./Button";

export const props = generateProps<ButtonProps>({
  defaultProps: {
    children: "👉 click me",
    variant: "primary",
    size: "md",
    loading: false,
  },
  multipleProps: {
    variant: ["primary", "secondary", "destructive"],
    size: ["sm", "md", "lg"],
  },
  examples: {
    secondary: {
      children: "🥈 secondary button",
      variant: "secondary",
      size: "md",
      loading: false,
    },
    destructive: {
      children: "👀 uh-oh danger zone",
      variant: "destructive",
      size: "md",
      loading: false,
    },
  },
});
