import { generateProps } from "../utils/generateProps";
import { InputProps } from "./Input";

/** Set default props for the component */
const defaultProps: InputProps = {
  label: "Input label",
  placeholder: "I'm a placeholder...",
  defaultValue: "",
  error: "",
  variant: "rest",
  autoFocus: true,
  disabled: false,
};

/** Set playground examples */
const success: InputProps = {
  label: "Best doggo",
  placeholder: "I'm a placeholder...",
  defaultValue: "All doggos are the best ones",
  error: "",
  variant: "success",
  autoFocus: true,
  disabled: false,
};
const error: InputProps = {
  label: "Dog food",
  placeholder: "I'm a placeholder...",
  defaultValue: "ded birbo",
  error: "Yikes, but why?",
  variant: "error",
  autoFocus: true,
  disabled: false,
};

/** Set multiple variants, if there are any */
const variant: InputProps["variant"][] = ["rest", "success", "error"];

/** Finally, generate props */
export const props = generateProps<InputProps>({
  defaultProps,
  multipleProps: {
    variant,
  },
  examples: {
    success,
    error,
  },
});
