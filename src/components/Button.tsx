import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
  };

const buttonVariants = cva(
  "flex font-medium rounded-lg cursor-pointer items-center justify-center active:scale-90 text-sm focus:ring-2 outline-gray-500 ring-gray-600 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-800 disabled:hover:bg-gray-800",
        secondary: "bg-red-600 text-blue-300",
      },
      size: {
        sm: "p-2",
        md: "py-3 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export default function Button({
  children,
  variant,
  size,
  className,
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
}

export const props: ButtonProps = {
  children: "👉 click me",
  variant: "primary",
  size: "md",
  loading: false,
  disabled: false,
};
