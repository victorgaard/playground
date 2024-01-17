import { generateProps } from "@/utils/generateProps";
import Alert, { AlertProps } from "./Alert";
import { BoltIcon } from "@heroicons/react/24/outline";

export const props = generateProps<AlertProps>({
  Component: Alert,
  defaultProps: {
    variant: "neutral",
    children: (
      <>
        <Alert.Icon>
          <BoltIcon className="h-5 w-5" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Hello world</Alert.Title>
          <Alert.Message>
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </Alert.Message>
        </Alert.Content>
      </>
    ),
  },
  variantProps: {
    variant: ["neutral", "success", "error", "warning"],
  },
  examples: {
    "without title": {
      children: (
        <>
          <Alert.Icon>
            <BoltIcon className="h-5 w-5" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Message>
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </Alert.Message>
          </Alert.Content>
        </>
      ),
    },
    "with actions": {
      variant: "warning",
    },
  },
});
