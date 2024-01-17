import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

export type AlertProps = React.PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

const alertVariants = cva("flex rounded-lg gap-4 p-4", {
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
});

export default function Alert({ children, variant, className }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)}>{children}</div>
  );
}

function AlertIcon({ children }: React.PropsWithChildren) {
  return (
    <div className="group-[.error]:text-red-400 group-[.neutral]:text-gray-400 group-[.success]:text-green-400 group-[.warning]:text-orange-400">
      {children}
    </div>
  );
}

function AlertContent({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

function AlertTitle({ children }: React.PropsWithChildren) {
  return <p>{children}</p>;
}

function AlertMessage({ children }: React.PropsWithChildren) {
  return <p>{children}</p>;
}

Alert.Icon = AlertIcon;
Alert.Content = AlertContent;
Alert.Title = AlertTitle;
Alert.Message = AlertMessage;
