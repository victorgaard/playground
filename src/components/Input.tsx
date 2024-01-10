import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Props } from "../utils/types";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    label?: string;
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
  label,
  error,
  className,
  variant,
  ...rest
}: InputProps) {
  if (label)
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          className={cn(inputVariants({ variant }), className)}
          {...rest}
        />
        {error && (
          <p className="flex items-center gap-1.5 pt-2 text-xs text-red-700">
            <ExclamationCircleIcon className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    );

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

const variant: InputProps["variant"][] = ["rest", "success", "error"];

const defaultProps: InputProps = {
  label: "Input label",
  placeholder: "I'm a placeholder...",
  defaultValue: "",
  error: "",
  variant: "rest",
  autoFocus: true,
  disabled: false,
};

const success: InputProps = {
  label: "Best doggo",
  placeholder: "I'm a placeholder...",
  defaultValue: "All doggos are the best ones",
  error: "",
  variant: "success",
  autoFocus: true,
  disabled: false,
};

const error: InputProps = {
  label: "Dog food",
  placeholder: "I'm a placeholder...",
  defaultValue: "ded birbo",
  error: "Yikes, but why?",
  variant: "error",
  autoFocus: true,
  disabled: false,
};

export const props: Props<InputProps> = {
  defaultProps,
  multipleProps: {
    variant,
  },
  examples: { success, error },
};
