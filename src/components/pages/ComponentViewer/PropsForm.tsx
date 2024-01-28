import Button from "@/components/ui/Button/Button";
import { PropsObj } from "@/static/types";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import { RenderInput } from "./RenderInput";
import { cn } from "@/utils/cn";

type PropsFormProps<T, U> = {
  component: string;
  propValues: T;
  variantProps: U;
  onPropChange: (propName: keyof T, value: string | boolean | number) => void;
};

export function PropsForm<T extends PropsObj, U extends PropsObj>({
  component,
  propValues,
  variantProps,
  onPropChange,
}: PropsFormProps<T, U>) {
  const navigate = useNavigate();
  const mergedProps = { ...propValues, ...variantProps };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        Props
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => {
            navigate({
              to: "/$component",
              params: { component },
            });
          }}
          isIcon
        >
          <ArrowUturnLeftIcon className="h-4 w-4 text-gray-400 shrink-0" />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        {Object.entries(mergedProps).map(([propName, propValue]) => {
          if (propValue === undefined || propValue === null) return null;
          return (
            <label
              htmlFor={propName}
              key={propName}
              className={cn("flex flex-col gap-2", {
                "cursor-pointer select-none flex-row items-center justify-between":
                  typeof propValue === "boolean",
              })}
            >
              <span>{propName}</span>
              <RenderInput
                propName={propName}
                propValue={propValue}
                propValues={propValues}
                onPropChange={onPropChange}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
