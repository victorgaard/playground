import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={label} className="text-gray-400">
          {label}
        </label>
      )}
      <input
        id={label}
        className={cn(
          "w-full min-w-64 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white transition-colors placeholder:text-gray-500 invalid:border-red-900 invalid:bg-red-950/70 hover:bg-gray-950 invalid:hover:bg-red-950/70 focus-visible:bg-gray-950 focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-gray-800/90 invalid:focus-visible:bg-red-950/70 invalid:focus-visible:ring-red-950/80 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-gray-900",
          className,
        )}
        {...rest}
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-700">
          <ExclamationCircleIcon className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
