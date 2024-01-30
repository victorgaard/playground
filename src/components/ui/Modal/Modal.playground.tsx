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
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-b from-red-400 to-red-600">
              <TrashIcon className="h-8 w-8 text-white" />
            </div>
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
  },
});
