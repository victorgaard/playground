import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    error?: string;
  };

const inputVariants = cva(
  "rounded-lg bg-gray-900 border w-full border-gray-700 text-white disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:outline-0 disabled:hover:bg-gray-900 focus-visible:bg-gray-950 hover:bg-gray-950 focus-visible:ring-gray-800/90 transition-colors py-3 px-4",
  {
    variants: {
      variant: {
        rest: "",
        success:
          "border-emerald-700 focus-visible:bg-emerald-950 bg-emerald-950 hover:bg-emerald-950 focus-visible:ring-emerald-950",
        error:
          "border-red-700 focus-visible:bg-red-950 bg-red-950 hover:bg-red-950 focus-visible:ring-red-950",
      },
    },
    defaultVariants: {
      variant: "rest",
    },
  },
);

export default function Input({
  error,
  className,
  variant,
  ...rest
}: InputProps) {
  return (
    <div>
      <input className={cn(inputVariants({ variant }), className)} {...rest} />
      {error && (
        <p className="flex items-center gap-1.5 pt-2 text-xs text-red-700">
          <ExclamationCircleIcon className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

const defaultProps: InputProps = {
  placeholder: "I'm a placeholder",
  defaultValue: "Hello world",
  error: "",
  variant: "rest",
  autoFocus: true,
  disabled: false,
};

const variant: InputProps["variant"][] = ["rest", "success", "error"];

export const props = {
  defaultProps,
  multipleProps: {
    variant,
  },
};
