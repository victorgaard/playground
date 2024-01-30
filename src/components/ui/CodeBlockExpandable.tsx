import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import Button from "./Button/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";
import * as ScrollArea from "@radix-ui/react-scroll-area";

function CodeBlockExpandable({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (children.length < 220)
    return (
      <ScrollArea.Root className="max-w-[315px] overflow-hidden pb-2">
        <ScrollArea.Viewport>
          <CodeBlock>{children}</CodeBlock>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    );

  if (!isExpanded)
    return (
      <div className="relative flex flex-col">
        <div
          className={cn("max-h-[215px] max-w-[315px] overflow-hidden", {
            "max-h-full": isExpanded,
          })}
        >
          <CodeBlock>{children}</CodeBlock>
        </div>
        {!isExpanded && (
          <div className="absolute bottom-6 z-0 h-5 w-full bg-gradient-to-t from-black" />
        )}
        <Button
          size="xs"
          variant="tertiary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDownIcon className="h-3 w-3 text-gray-400" />
          expand code
        </Button>
      </div>
    );

  return (
    <>
      <ScrollArea.Root className="max-w-[315px] overflow-hidden pb-2">
        <ScrollArea.Viewport>
          <CodeBlock>{children}</CodeBlock>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <Button
        size="xs"
        variant="tertiary"
        onClick={() => setIsExpanded(!isExpanded)}
        className="z-10"
      >
        <ChevronUpIcon className="h-3 w-3 text-gray-400" />
        collapse code
      </Button>
    </>
  );
}

export default CodeBlockExpandable;
