import { generateProps } from "../utils/generateProps";
import { ButtonProps } from "./Button";

/** Set default props for the component */
const defaultProps: ButtonProps = {
  children: "👉 click me",
  variant: "primary",
  size: "md",
  loading: false,
};

/** Set playground examples */
const secondary: ButtonProps = {
  children: "🥈 secondary button",
  variant: "secondary",
  size: "md",
  loading: false,
};
const destructive: ButtonProps = {
  children: "👀 uh-oh danger zone",
  variant: "destructive",
  size: "md",
  loading: false,
};

/** Set multiple variants, if there are any */
const variant: ButtonProps["variant"][] = [
  "primary",
  "secondary",
  "destructive",
];
const size: ButtonProps["size"][] = ["sm", "md", "lg"];

/** Generate props */
export const props = generateProps<ButtonProps>({
  defaultProps,
  multipleProps: {
    variant,
    size,
  },
  examples: {
    secondary,
    destructive,
  },
});
