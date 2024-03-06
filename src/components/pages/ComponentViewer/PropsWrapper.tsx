import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PropsWithChildren } from "react";

function PropsWrapper({ children }: PropsWithChildren) {
  return (
    <ScrollArea.Root className="hidden w-96 overflow-hidden border-l border-gray-800 text-sm lg:block">
      <ScrollArea.Viewport className="h-full w-full p-8">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default PropsWrapper;
