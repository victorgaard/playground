import { generateProps } from "@/utils/generateProps";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalProps,
  ModalTrigger,
  ModalClose,
} from "./Modal";
import Button from "../Button/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Typography } from "../Typography";
import { DestructiveIllustration } from "../Illustrations";

export const props = generateProps<ModalProps>({
  Component: Modal,
  defaultProps: {
    size: "md",
    children: (
      <>
        <ModalTrigger>
          <Button variant="destructive">
            <TrashIcon className="h-5 w-5 opacity-50" />
            delete blog post
          </Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <DestructiveIllustration />
            <Typography.Paragraph className="pt-6 text-base" extraContrast>
              Delete blog post?
            </Typography.Paragraph>
            <Typography.Paragraph className="pt-2">
              Are you sure you want to delete this article? The action is
              irreversible.
            </Typography.Paragraph>
          </ModalContent>
          <ModalFooter>
            <ModalClose>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <Button variant="destructive">Delete blog post</Button>
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
