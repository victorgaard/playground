import Button from "@/components/ui/Button/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import Input from "@/components/ui/Input/Input";
import Switch from "@/components/ui/Switch";
import { InputType } from "@/static/types";
import { cn } from "@/utils/cn";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { isValidElement, useState } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import * as ScrollArea from "@radix-ui/react-scroll-area";

type RenderInputProps<T> = {
  propName: keyof T;
  propValue: InputType;
  propValues: T;
  onPropChange: (propName: keyof T, value: string | boolean | number) => void;
};

export function RenderInput<T>({
  propName,
  propValue,
  propValues,
  onPropChange,
}: RenderInputProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (typeof propValue === "boolean") {
    return (
      <Switch
        id={String(propName)}
        checked={propValue}
        onChecked={(e) => onPropChange(propName, e.target.checked)}
      />
    );
  }

  if (typeof propValue === "string") {
    return (
      <Input
        id={String(propName)}
        type="text"
        value={propValue}
        placeholder={`${String(propName)}...`}
        onChange={(e) => onPropChange(propName, e.target.value)}
      />
    );
  }

  if (typeof propValue === "number") {
    return (
      <Input
        id={String(propName)}
        type="number"
        value={propValue}
        placeholder={`${String(propName)}...`}
        onChange={(e) => onPropChange(propName, Number(e.target.value))}
        min={0}
      />
    );
  }

  if (
    Array.isArray(propValue) &&
    propValue.some((prop) => typeof prop === "object")
  ) {
    return (
      <div className="relative flex flex-col">
        <div
          className={cn("max-h-[340px] overflow-hidden", {
            "max-h-full": isExpanded,
          })}
        >
          <CodeBlock className="language-jsx whitespace-pre-wrap">
            {JSON.stringify(propValue, null, 2)}
          </CodeBlock>
        </div>
        {!isExpanded && (
          <div className="absolute bottom-[20px] z-0 h-[20px] w-full bg-gradient-to-t from-black" />
        )}
        <Button
          size="xs"
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="z-10"
        >
          {isExpanded ? (
            <>
              <ChevronUpIcon className="h-3 w-3 text-gray-400" />
              collapse
            </>
          ) : (
            <>
              <ChevronDownIcon className="h-3 w-3 text-gray-400" />
              expand
            </>
          )}
        </Button>
      </div>
    );
  }

  if (Array.isArray(propValue)) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {propValue.map((prop) => {
          const isActive = propValues[propName] === prop;
          return (
            <Button
              variant="tertiary"
              size="sm"
              key={prop}
              value={prop}
              onClick={() => onPropChange(propName, prop)}
            >
              {prop}{" "}
              {isActive && <CheckIcon className="h-4 w-4 text-gray-400" />}
            </Button>
          );
        })}
      </div>
    );
  }

  if (typeof propValue === "function" && !isValidElement(propValue)) {
    return (
      <CodeBlock className="language-jsx whitespace-pre-wrap">
        {String(propValue)}
      </CodeBlock>
    );
  }

  return (
    <ScrollArea.Root className="max-w-[315px] pb-2 overflow-hidden">
      <ScrollArea.Viewport>
        <CodeBlock className="language-jsx">
          {reactElementToJSXString(propValue, {
            showDefaultProps: false,
            useBooleanShorthandSyntax: false,
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
