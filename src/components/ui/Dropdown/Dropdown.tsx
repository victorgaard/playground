import { cn } from "@/utils/cn";
import { CheckIcon } from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { createContext, useContext } from "react";

type DropdownContextProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Content
>;

const DropdownContext = createContext<DropdownContextProps>({
  align: "center",
  sideOffset: 6,
});

export type DropdownProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Root> &
  DropdownContextProps;

export function Dropdown({
  children,
  align,
  sideOffset,
  ...rest
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ align, sideOffset }}>
      <DropdownMenu.Root {...rest}>{children}</DropdownMenu.Root>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children }: React.PropsWithChildren) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}

type DropdownBodyProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>;

export function DropdownBody({ children, className }: DropdownBodyProps) {
  const { align, sideOffset } = useContext(DropdownContext);
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={cn(
          "min-w-24 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 text-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        sideOffset={sideOffset}
        align={align}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

type DropdownItemProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

export function DropdownItem({
  children,
  onClick,
  className,
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      onClick={onClick}
      className={cn(
        "flex select-none items-center gap-2 px-4 py-2.5 text-sm outline-none hover:bg-gray-700  focus:bg-gray-700 active:bg-gray-700/50",
        className,
      )}
    >
      {children}
    </DropdownMenu.Item>
  );
}

type DropdownCheckboxItemProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>;

export function DropdownCheckboxItem({
  children,
  checked,
  onCheckedChange,
  onSelect,
}: DropdownCheckboxItemProps) {
  return (
    <DropdownMenu.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "flex select-none items-center gap-2 px-4 py-2.5 text-sm outline-none hover:bg-gray-700  focus:bg-gray-700 active:bg-gray-700/50",
        {
          "bg-gradient-to-br from-gray-600/30 to-gray-600/10": checked,
        },
      )}
      onSelect={onSelect}
    >
      {children}
      <DropdownMenu.ItemIndicator className="ml-auto">
        <CheckIcon className="h-4 w-4 opacity-50" />
      </DropdownMenu.ItemIndicator>
    </DropdownMenu.CheckboxItem>
  );
}

export function DropdownSeparator() {
  return <div className="my-2 h-[1px] bg-gray-700" />;
}
