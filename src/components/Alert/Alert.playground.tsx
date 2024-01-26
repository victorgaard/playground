import { generateProps } from "@/utils/generateProps";
import Alert, { AlertProps } from "./Alert";
import { BoltIcon } from "@heroicons/react/24/outline";

export const props = generateProps<AlertProps>({
  Component: Alert,
  defaultProps: {
    title: "This is an alert",
    message:
      "No need to panic, this is just common procedure",
    variant: "neutral",
    icon: <BoltIcon className="h-5 w-5" />,
  },
  variantProps: {
    variant: ["neutral", "success", "error", "warning"],
  },
  examples: {
    closeable: {
      title: "Hey, I'm a closeable alert",
      message:
        "This is a closeable alert. It requires `isCloseable` to be set to true",
      isCloseable: true,
      variant: "warning",
    },
    minimal: {
      title: "",
      message:
        "The minimum an alert requires is a message, so don't forget it and you are good to go 🤙",
      icon: null,
    },
  },
});
