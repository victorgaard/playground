import { generateProps } from "@/utils/generateProps";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalPortal,
  ModalProps,
  ModalTrigger,
} from "./Modal";
import Button from "../Button/Button";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export const props = generateProps<ModalProps>({
  Component: Modal,
  defaultProps: {
    size: "md",
    children: (
      <>
        <ModalTrigger>
          <Button>
            <AdjustmentsHorizontalIcon className="h-5 w-5 opacity-50" />
            open preferences
          </Button>
        </ModalTrigger>
        <ModalPortal>
          <ModalContent>
            Hell aoie hiaoeipo ioaeh oheoih eioaiehoiahe aeiopo ehioaehihio
            hiohiheoi haoiehoi heoiaheio hiopehaio
          </ModalContent>
          <ModalFooter>
            <Button variant="secondary">Close</Button>
            <Button>View blog post</Button>
          </ModalFooter>
        </ModalPortal>
      </>
    ),
  },
  variantProps: {
    size: ["sm", "md", "lg"],
  },
});
