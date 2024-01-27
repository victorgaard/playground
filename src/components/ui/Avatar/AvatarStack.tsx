import { VariantProps } from "class-variance-authority";
import Avatar, { avatarVariants } from "./Avatar";
import { User } from "@/static/types";
import { cn } from "@/utils/cn";

export type AvatarStackProps<T extends User> = {
  avatarSize: VariantProps<typeof avatarVariants>["size"];
  limit?: number;
  users: T[];
};

function AvatarStack<T extends User>({
  avatarSize,
  limit = 0,
  users,
}: AvatarStackProps<T>) {
  return (
    <div className="flex items-center">
      {users.slice(0, limit || users.length).map((user) => (
        <Avatar
          key={user.id}
          picture={user.picture}
          name={user.name}
          size={avatarSize}
          className="border-2 border-gray-950 [&.lg]:-ml-5 [&.md]:-ml-4 [&.sm]:-ml-3.5 [&.xl]:-ml-7"
        />
      ))}
      {!!limit && users.length - limit > 0 && (
        <div
          className={cn(
            avatarVariants({ size: avatarSize }),
            "border-2 font-medium border-gray-950 [&.lg]:-ml-5 [&.md]:-ml-4 [&.md]:text-base [&.sm]:-ml-3.5 [&.sm]:text-sm [&.lg]:text-xl [&.xl]:text-3xl [&.xl]:-ml-7",
          )}
        >
          {new Intl.NumberFormat("en-US", {
            signDisplay: "exceptZero",
          }).format(users.length - limit)}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;
