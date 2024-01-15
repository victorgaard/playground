import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/utils/cn";
import LoadingSpinner from "./LoadingSpinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    loading?: boolean;
  };

export const buttonVariants = cva(
  "flex font-medium gap-2 rounded-lg cursor-pointer items-center justify-center active:scale-90 text-sm focus:ring-2  disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-800 outline-gray-500 ring-gray-600 disabled:hover:bg-gray-800",
        secondary:
          "bg-transparent hover:bg-gray-800 active:bg-gray-700 border outline-gray-500 ring-gray-600 border-gray-800 text-white",
        ghost:
          "bg-transparent hover:bg-gray-800 active:bg-gray-700 outline-gray-500 ring-gray-600 text-white",
        destructive:
          "bg-red-900 ring-red-600 outline-red-500 hover:bg-red-800 active:bg-red-900 text-white",
      },
      size: {
        sm: "py-2 px-3",
        md: "py-3 px-6",
        lg: "py-4 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      className,
      loading = false,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <LoadingSpinner />}
        {children}
      </button>
    );
  },
);

export default Button;
