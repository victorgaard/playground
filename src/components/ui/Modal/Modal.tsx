import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { createContext, useContext } from "react";

const modalVariants = cva(
  "fixed left-[50%] flex flex-col border border-gray-800 overflow-hidden justify-between min-h-[200px] top-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-2xl shadow-2xl bg-gray-900 focus:outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
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
  VariantProps<typeof modalVariants> &
  React.ComponentPropsWithoutRef<typeof Dialog.Root>;

const ModalContext = createContext<{
  size: VariantProps<typeof modalVariants>["size"];
}>({ size: "md" });

export function Modal({ children, size, ...rest }: ModalProps) {
  return (
    <ModalContext.Provider value={{ size }}>
      <Dialog.Root {...rest}>{children}</Dialog.Root>
    </ModalContext.Provider>
  );
}

export function ModalTrigger({ children }: React.PropsWithChildren) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function ModalBody({ children }: React.PropsWithChildren) {
  const { size } = useContext(ModalContext);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blue-300/5 backdrop-blur-2xl" />
      <Dialog.Content className={cn(modalVariants({ size }))}>
        {children}
        <Dialog.Close aria-label="Close">
          <XMarkIcon className="absolute right-6 top-6 h-4 w-4 shrink-0 text-gray-400" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function ModalContent({ children }: React.PropsWithChildren) {
  return <div className="p-6 pr-12">{children}</div>;
}

export function ModalFooter({ children }: React.PropsWithChildren) {
  const { size } = useContext(ModalContext);
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 p-6 pt-2", {
        "flex-row items-center justify-end border-t border-gray-800 bg-white/[0.02] px-6 py-4":
          size !== "sm",
      })}
    >
      {children}
    </div>
  );
}

export function ModalClose({ children }: React.PropsWithChildren) {
  return (
    <Dialog.Close aria-label="Close" asChild>
      {children}
    </Dialog.Close>
  );
}
