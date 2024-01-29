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
  examples: {
    "without label": {
      label: "",
      placeholder: "Just leave label empty and bam...",
    },
    invalid: {
      label: "Dog food",
      defaultValue: "ded birbo",
      error: "Yikes, are you sure?",
      pattern: "^$",
    },
  },
});
