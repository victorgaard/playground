import Button from "@/components/ui/Button/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import Input from "@/components/ui/Input/Input";
import Switch from "@/components/ui/Switch";
import { InputType } from "@/static/types";
import { CheckIcon } from "@heroicons/react/24/outline";
import { isValidElement } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

type RenderInputProps<T> = {
  propName: keyof T;
  propValue: InputType;
  propValues: T;
  onPropChange: (propName: keyof T, value: string | boolean) => void;
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

  if (Array.isArray(propValue)) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {propValue.map((prop) => {
          const isActive = propValues[propName] === prop;
          return (
            <Button
              key={prop}
              value={prop}
              onClick={() => onPropChange(propName, prop)}
            >
              {prop} {isActive && <CheckIcon className="h-5 w-5" />}
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
    <CodeBlock className="language-jsx whitespace-pre-wrap">
      {reactElementToJSXString(propValue, {
        showDefaultProps: false,
        useBooleanShorthandSyntax: false,
      })}
    </CodeBlock>
  );
}
