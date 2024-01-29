import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

const cardVariants = cva("bg-gray-900", {
  variants: {
    spacing: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
    },
  },
  defaultVariants: {
    spacing: "md",
    radius: "md",
  },
});

type CardProps = React.PropsWithChildren &
  VariantProps<typeof cardVariants> &
  React.HTMLAttributes<HTMLDivElement>;

function Card({ children, spacing, radius, className }: CardProps) {
  return (
    <div className={cn(cardVariants({ spacing, radius }), className)}>
      {children}
    </div>
  );
}

export default Card;
