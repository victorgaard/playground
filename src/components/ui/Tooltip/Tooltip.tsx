import * as TooltipRadix from "@radix-ui/react-tooltip";

export type TooltipProps = React.PropsWithChildren & {
  content: React.ReactNode;
  delayDuration?: number;
  displayArrow?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

function Tooltip({
  children,
  content,
  delayDuration = 0,
  displayArrow = true,
  side = "top",
  align = "center",
}: TooltipProps) {
  return (
    <TooltipRadix.Provider delayDuration={delayDuration}>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className="max-w-[400px] animate-in fade-in-50 zoom-in-90 break-words rounded-lg bg-gray-200 px-2 py-1.5 text-sm text-gray-900"
            sideOffset={5}
            side={side}
            align={align}
          >
            {content}
            {displayArrow && <TooltipRadix.Arrow className="fill-gray-200" />}
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}

export default Tooltip;
