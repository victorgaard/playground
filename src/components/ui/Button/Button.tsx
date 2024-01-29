import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";
import LoadingSpinner from "../LoadingSpinner";

const buttonVariants = cva(
  "flex overflow-hidden font-medium gap-2 rounded-lg cursor-pointer items-center justify-center active:scale-90 text-sm focus:ring-2 shadow disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-800 outline-indigo-500 ring-indigo-600 disabled:hover:bg-indigo-800",
        secondary:
          "bg-transparent hover:bg-gray-800 active:bg-gray-700 border outline-gray-500 ring-gray-600 border-gray-700 text-white",
        tertiary:
          "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-800 outline-gray-500 ring-gray-600 disabled:hover:bg-gray-800",
        ghost:
          "bg-transparent hover:bg-gray-800 active:bg-gray-700 outline-gray-500 ring-gray-600 text-white",
        destructive:
          "bg-red-900 ring-red-600 outline-red-500 hover:bg-red-800 active:bg-red-900 text-white",
      },
      size: {
        xs: "h-6 px-2 text-xs rounded-md font-normal xs",
        sm: "h-8 px-3 sm",
        md: "h-10 px-4 md",
        lg: "h-12 px-5 lg",
      },
      isIcon: {
        true: "[&.xs]:h-6 [&.xs]:w-6 [&.sm]:h-8 [&.sm]:w-8 [&.md]:h-10 [&.md]:w-10 [&.lg]:h-12 [&.lg]:w-12",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function getRandomEmoji() {
  const emojiStart = 0x1f600;
  const emojiEnd = 0x1f64f;
  const emojiRange = emojiEnd - emojiStart + 1;
  const randomCodePoint = emojiStart + Math.floor(Math.random() * emojiRange);
  const randomEmoji = String.fromCodePoint(randomCodePoint);
  return randomEmoji;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    isLoading?: boolean;
  };

function handleChildren({ children, isLoading, isIcon }: ButtonProps) {
  if (isIcon && isLoading) return null;
  if (isIcon && typeof children === "string") return getRandomEmoji();
  return children;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      className,
      isIcon,
      isLoading = false,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, isIcon }), className)}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading && (
          <LoadingSpinner
            data-testid="loading-spinner"
            className={cn({ "h-3 w-3": size === "xs" })}
          />
        )}
        {handleChildren({ children, isLoading, isIcon })}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
