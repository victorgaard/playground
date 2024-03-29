import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative flex items-center justify-center animate-in fade-in transition-all",
  {
    variants: {
      variant: {
        primary: "bg-gray-800 text-gray-200",
      },
      size: {
        xs: 'h-6 w-6 text-base group xs',
        sm: "h-8 w-8 text-base group sm",
        md: "h-10 w-10 text-xl group md",
        lg: "h-12 w-12 text-2xl group lg",
        xl: "h-16 w-16 text-3xl group xl",
      },
      shape: {
        rounded: "rounded-full",
        squared: "rounded-lg [&.lg]:rounded-xl [&.xl]:rounded-xl",
      },
      status: {
        online: "bg-green-500",
        offline: "bg-gray-500",
        idle: "bg-yellow-500",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "rounded",
    },
  },
);

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    picture?: string;
    name?: string;
  };

function Avatar({
  picture,
  name,
  status,
  variant,
  size,
  shape,
  className,
}: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ variant, size, shape }), className)}>
      {!picture && !name && <small>N/A</small>}
      {!picture && name && <span className="uppercase">{name[0]}</span>}
      {picture && (
        <img
          src={picture}
          className={cn(
            avatarVariants({ shape }),
            "aspect-square h-full w-full shrink-0 object-cover",
          )}
        />
      )}
      {status && (
        <div
          className={cn(
            avatarVariants({ status }),
            "absolute bottom-0 right-0 rounded-full outline outline-[3px] outline-gray-950 group-[.lg]:h-2.5 group-[.md]:h-2 group-[.sm]:h-1.5 group-[.xs]:h-1 group-[.xs]:w-1 group-[.xs]:outline-1 group-[.xl]:h-3 group-[.lg]:w-2.5 group-[.md]:w-2 group-[.sm]:w-1.5 group-[.xl]:w-3 group-[.md]:outline-2 group-[.sm]:outline-2",
          )}
        />
      )}
    </div>
  );
}

export default Avatar;
