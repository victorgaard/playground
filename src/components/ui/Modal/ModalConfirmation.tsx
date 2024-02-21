import Button from "../Button/Button";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./Modal";
import { DestructiveIllustration } from "../Illustrations";
import { Typography } from "../Typography";
import { isValidElement, useState } from "react";
import { cn } from "@/utils/cn";

export type ModalConfirmationProps = {
  trigger: React.ReactNode;
  title: string;
  message: string;
  submitButtonLabel: React.ReactNode;
  onSubmit: () => void | Promise<void>;
};

function ModalConfirmation({
  trigger,
  title,
  message,
  submitButtonLabel,
  onSubmit,
}: ModalConfirmationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isTriggerAButton =
    isValidElement(trigger) &&
    typeof trigger.type === "object" &&
    trigger.type["displayName"] === "Button";

  async function submit() {
    try {
      setIsLoading(true);
      await onSubmit();
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      // treat the error
      setIsLoading(false);
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={(open) => setIsOpen(open)} size="sm">
      <ModalTrigger
        asChild={isTriggerAButton}
        className={cn({ "flex items-center gap-2": !isTriggerAButton })}
      >
        {trigger}
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <DestructiveIllustration />
          <Typography.Paragraph className="pt-6 text-base" extraContrast>
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph className="pt-2">
            {message}
          </Typography.Paragraph>
        </ModalContent>
        <ModalFooter>
          <ModalClose>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button variant="destructive" onClick={submit} isLoading={isLoading}>
            {submitButtonLabel}
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

export default ModalConfirmation;
