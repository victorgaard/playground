import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Typography } from "../Typography";
import { useState } from "react";
import Button from "../Button";

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode;
    title?: string;
    message: string;
    isCloseable?: boolean;
  };

const alertVariants = cva(
  "flex justify-between animate-in fade-in rounded-lg items-start gap-4 p-4 w-full transition-all",
  {
    variants: {
      variant: {
        success: "bg-green-950/70 border border-green-900 group success",
        error: "bg-red-950/70 border border-red-900 group error",
        warning: "bg-yellow-950/70 border border-yellow-900 group warning",
        neutral: "bg-gray-800/70 border border-gray-700 group neutral",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export default function Alert({
  icon,
  title,
  message,
  isCloseable = false,
  variant,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible)
    return (
      <Button onClick={() => setIsVisible(true)}>
        I changed my mind, display the alert again
      </Button>
    );

  return (
    <div className={cn(alertVariants({ variant }))}>
      <div className="flex gap-3">
        {icon && (
          <div className="shrink-0 group-[.error]:text-red-400 group-[.neutral]:text-gray-400 group-[.success]:text-green-400 group-[.warning]:text-orange-400">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-1">
          {title && (
            <Typography.Paragraph className="break-words" extraContrast>
              {title}
            </Typography.Paragraph>
          )}
          <Typography.Paragraph className="break-words">
            {message}
          </Typography.Paragraph>
        </div>
      </div>
      {isCloseable && (
        <button
          className="shrink-0 group-[.error]:text-red-400 group-[.neutral]:text-gray-400 group-[.success]:text-green-400 group-[.warning]:text-orange-400"
          onClick={() => setIsVisible(false)}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
