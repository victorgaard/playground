import { cn } from "@/utils/cn";
import { CheckIcon, MinusIcon } from "@heroicons/react/24/outline";
import { HTMLProps, useEffect, useRef } from "react";

function Checkbox({
  indeterminate,
  className,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <div className="relative flex place-content-center items-center">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "checked:border-primary-500 checked:bg-primary-500 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-gray-700 bg-gray-950 hover:border-gray-600 disabled:cursor-not-allowed disabled:bg-gray-700",
          indeterminate && "border-indigo-500 bg-indigo-500",
          className,
        )}
        {...rest}
      />
      {indeterminate && (
        <MinusIcon className="pointer-events-none absolute h-full w-full p-0.5 text-white" />
      )}
      {rest.checked && (
        <CheckIcon className="pointer-events-none absolute h-full w-full p-0.5 text-white" />
      )}
    </div>
  );
}

export default Checkbox;
