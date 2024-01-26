import { generateProps } from "@/utils/generateProps";
import Input, { InputProps } from "./Input";

export const props = generateProps<InputProps>({
  Component: Input,
  defaultProps: {
    label: "Input label",
    placeholder: "I'm a placeholder...",
    defaultValue: "",
    error: "",
    autoFocus: true,
    disabled: false,
  },
  variantProps: {
    variant: ["rest", "success", "error"],
  },
  examples: {
    success: {
      label: "Best doggo",
      placeholder: "I'm a placeholder...",
      defaultValue: "All doggos are the best ones",
      error: "",
      variant: "success",
      autoFocus: true,
      disabled: false,
    },
    error: {
      label: "Dog food",
      placeholder: "I'm a placeholder...",
      defaultValue: "ded birbo",
      error: "Yikes, are you sure?",
      variant: "error",
      autoFocus: true,
      disabled: false,
    },
  },
});
