import Button from "@/components/ui/Button/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Typography } from "@/components/ui/Typography";
import { PropsObj } from "@/static/types";
import { cn } from "@/utils/cn";
import { generateCodeSnippet } from "@/utils/generateCodeSnippet";
import { isObjectEmpty } from "@/utils/isObjectEmpty";
import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";

type CodeViewerProps = {
  component: string;
  props: PropsObj;
};

function CodeViewer({ component, props }: CodeViewerProps) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isClicked) {
      timeout = setTimeout(() => setIsClicked(false), 2000);
    }

    return () => clearTimeout(timeout);
  }, [isClicked]);

  if (isObjectEmpty(props)) return null;

  return (
    <ScrollArea.Root className="group relative shrink-0 overflow-hidden border-t border-gray-800">
      <div
        className={cn(
          "absolute bottom-[18px] right-3 z-10 hidden transition-all group-hover:block",
          { block: isClicked },
        )}
      >
        {isClicked ? (
          <Typography.Paragraph
            className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-xs transition-all animate-in fade-in zoom-in-50"
            extraContrast
          >
            <CheckCircleIcon className="h-4 w-4 text-gray-400" /> copied
          </Typography.Paragraph>
        ) : (
          <Button
            size="sm"
            className="animate-in fade-in zoom-in-50"
            onClick={() => {
              setIsClicked(true);
              navigator.clipboard.writeText(
                generateCodeSnippet({
                  component,
                  props,
                }),
              );
            }}
          >
            <ClipboardIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-0 w-12 bg-gradient-to-l from-gray-950" />
      <div className="absolute bottom-0 left-0 top-0 z-0 w-8 bg-gradient-to-r from-gray-950" />
      <ScrollArea.Viewport className="flex items-center p-6">
        <CodeBlock className="language-jsx whitespace-nowrap">
          {generateCodeSnippet({
            component,
            props,
          })}
        </CodeBlock>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default CodeViewer;
