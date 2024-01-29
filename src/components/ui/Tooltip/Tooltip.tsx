import * as TooltipRadix from "@radix-ui/react-tooltip";

export type TooltipProps = React.PropsWithChildren & {
  trigger: React.ReactNode;
  delayDuration?: number;
  displayArrow?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

function Tooltip({
  children,
  trigger,
  delayDuration = 0,
  displayArrow = true,
  side = "top",
  align = "center",
}: TooltipProps) {
  return (
    <TooltipRadix.Provider delayDuration={delayDuration}>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild>{trigger}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className="max-w-[400px] break-words rounded-lg bg-gray-200 px-2 py-1.5 text-sm text-gray-900"
            sideOffset={5}
            side={side}
            align={align}
          >
            {children}
            {displayArrow && <TooltipRadix.Arrow className="fill-gray-200" />}
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}

export default Tooltip;
