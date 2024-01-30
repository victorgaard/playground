import Button from "@/components/ui/Button/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import Input from "@/components/ui/Input/Input";
import Switch from "@/components/ui/Switch";
import { InputType } from "@/static/types";
import { CheckIcon } from "@heroicons/react/24/outline";
import { isValidElement } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import CodeBlockExpandable from "@/components/ui/CodeBlockExpandable";

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

  /** For variantProps variants */
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

  /** For handlers, i.e.: onClick */
  if (typeof propValue === "function" && !isValidElement(propValue)) {
    return (
      <CodeBlock className="whitespace-pre-wrap">{String(propValue)}</CodeBlock>
    );
  }

  /** For objects passed as props, like a users list */
  if (
    Array.isArray(propValue) &&
    propValue.some((prop) => typeof prop === "object")
  ) {
    return (
      <CodeBlockExpandable>
        {JSON.stringify(propValue, null, 2)}
      </CodeBlockExpandable>
    );
  }

  /** Children as JSX */
  return (
    <CodeBlockExpandable>
      {reactElementToJSXString(propValue, {
        showDefaultProps: false,
        useBooleanShorthandSyntax: false,
      })}
    </CodeBlockExpandable>
  );
}
