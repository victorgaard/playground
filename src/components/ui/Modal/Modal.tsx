import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../Button/Button";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { createContext, useContext } from "react";

const modalVariants = cva(
  "fixed left-[50%] flex flex-col border border-gray-800 overflow-hidden justify-between min-h-[200px] top-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-2xl shadow-2xl bg-gray-900 focus:outline-none",
  {
    variants: {
      size: {
        sm: "w-80",
        md: "w-[28rem]",
        lg: "w-[36rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ModalProps = React.PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof modalVariants>;

const ModalContext = createContext<{
  size: VariantProps<typeof modalVariants>["size"];
}>({ size: "md" });

export function Modal({ children, size }: ModalProps) {
  return (
    <ModalContext.Provider value={{ size }}>
      <Dialog.Root>{children}</Dialog.Root>
    </ModalContext.Provider>
  );
}

export function ModalTrigger({ children }: React.PropsWithChildren) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function ModalPortal({ children }: React.PropsWithChildren) {
  const { size } = useContext(ModalContext);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className={cn(modalVariants({ size }))}>
        {children}
        <Dialog.Close aria-label="Close" asChild>
          <Button
            variant="secondary"
            size="sm"
            isIcon
            className="absolute right-4 top-4"
          >
            <XMarkIcon className="h-4 w-4 shrink-0 text-gray-400" />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function ModalContent({ children }: React.PropsWithChildren) {
  return <div className="p-6 pr-16">{children}</div>;
}

export function ModalFooter({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-end gap-2 bg-white/[0.04] px-6 py-4">
      {children}
    </div>
  );
}
