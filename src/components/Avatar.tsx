import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    picture?: string;
    name?: string;
  };

const avatarVariants = cva("relative flex items-center justify-center", {
  variants: {
    variant: {
      primary: "bg-gray-800 text-gray-200",
    },
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
    shape: {
      rounded: "rounded-full",
      squared: "rounded-2xl",
    },
    status: {
      online: "bg-green-500 border-[3px] h-3 w-3 border-gray-950",
      offline: "bg-gray-500 border-[3px] h-3 w-3 border-gray-950",
      idle: "bg-yellow-500 border-[3px] h-3 w-3 border-gray-950",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    shape: "rounded",
  },
});

function Avatar({
  picture,
  name,
  status,
  variant,
  size,
  shape,
  className,
}: AvatarProps) {
  if (!name && !picture) return null;

  if (name && !picture)
    return (
      <div className={cn(avatarVariants({ variant, size, shape }), className)}>
        {name[0]}
        <div
          className={cn(
            avatarVariants({ status }),
            "absolute bottom-0 right-0 rounded-full",
          )}
        />
      </div>
    );

  return (
    <div className={cn(avatarVariants({ variant, size, shape }), className)}>
      <img
        src={picture}
        className={cn(
          avatarVariants({ shape }),
          "aspect-square h-full w-full shrink-0",
        )}
      />
      <div
        className={cn(
          avatarVariants({ status }),
          "absolute bottom-0 right-0 rounded-full",
        )}
      />
    </div>
  );
}

export default Avatar;
