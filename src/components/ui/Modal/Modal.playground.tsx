import { generateProps } from "@/utils/generateProps";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalTrigger,
  ModalFooter,
  ModalClose,
} from "./Modal";
import Button from "../Button/Button";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Typography } from "../Typography";

export const props = generateProps<ModalProps>({
  Component: Modal,
  defaultProps: {
    size: "md",
    children: (
      <>
        <ModalTrigger>
          <Button variant="secondary">
            <AdjustmentsHorizontalIcon className="text-gray-400 h-5 w-5" />
            open modal
          </Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <Typography.Paragraph className="text-base" extraContrast>
              This is a simple composable modal
            </Typography.Paragraph>
            <Typography.Paragraph className="pt-2">
              Configure in any way you like it
            </Typography.Paragraph>
          </ModalContent>
          <ModalFooter>
            <ModalClose>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <Button>Call to action</Button>
          </ModalFooter>
        </ModalBody>
      </>
    ),
  },
  variantProps: {
    size: ["sm", "md", "lg"],
  },
  examples: {
    small: {
      size: "sm",
    },
    large: {
      size: "lg",
    },
  },
});
