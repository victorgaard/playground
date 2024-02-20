import { generateProps } from "@/utils/generateProps";
import Button from "../Button/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import ModalConfirmation, { ModalConfirmationProps } from "./ModalConfirmation";

export const props = generateProps<ModalConfirmationProps>({
  Component: ModalConfirmation,
  defaultProps: {
    trigger: (
      <Button variant="destructive">
        <TrashIcon className="h-5 w-5 opacity-50" />
        delete blog post
      </Button>
    ),
    title: "Delete blog post?",
    message:
      "Are you sure you want to delete this article? The action is irreversible.",
    submitButtonLabel: "Delete blog post",
    onSubmit: async () => new Promise((resolve) => setTimeout(resolve, 1000)),
  },
});
