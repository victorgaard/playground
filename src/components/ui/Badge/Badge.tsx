import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

export type BadgeProps = React.PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

const badgeVariants = cva("transition-all", {
  variants: {
    variant: {
      purple: "bg-purple-950/70 border border-purple-900 text-purple-400",
      grey: "bg-gray-900 border border-gray-800 text-gray-400",
      green: "bg-green-950/70 border border-green-900 text-green-400",
      orange: "bg-orange-950/70 border border-orange-900 text-orange-400",
    },
    size: {
      xs: "px-1 py-0.5 rounded-md text-xs",
      sm: "px-1.5 py-0.5 rounded-md text-sm",
      md: "px-2 py-1.5 rounded-lg text-sm",
    },
  },
  defaultVariants: {
    variant: "purple",
    size: "sm",
  },
});

function Badge({ children, variant, size, className }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </div>
  );
}

export default Badge;
