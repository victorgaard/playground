import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

const buttonVariants = cva(
  "flex font-medium rounded-lg cursor-pointer items-center justify-center active:scale-90 text-sm focus:ring-2 outline-gray-500 ring-gray-600 disabled:cursor-not-allowed transition-all",
  {
    variants: {
      variant: {
        primary: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-800",
      },
      size: {
        sm: "p-1",
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
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  );
}

export const props: ButtonProps = {
  children: "👉 click me",
  variant: "primary",
  size: "md",
};
