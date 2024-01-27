import { VariantProps } from "class-variance-authority";
import Avatar, { avatarVariants } from "./Avatar";
import { User } from "@/static/types";
import { cn } from "@/utils/cn";

export type AvatarStackProps<T extends User> = {
  avatarSize: VariantProps<typeof avatarVariants>["size"];
  limit: number;
  users: T[];
};

function AvatarStack<T extends User>({
  avatarSize,
  limit,
  users,
}: AvatarStackProps<T>) {
  return (
    <div className="flex items-center">
      {users.slice(0, limit).map((user) => (
        <Avatar
          key={user.id}
          picture={user.picture}
          name={user.name}
          size={avatarSize}
          className="-ml-6 border-4 border-gray-950"
        />
      ))}
      <div
        className={cn(
          avatarVariants({ size: avatarSize }),
          "-ml-6 border-4 border-gray-950",
        )}
      >
        {new Intl.NumberFormat("en-US", {
          signDisplay: "exceptZero",
        }).format(users.length - limit)}
      </div>
    </div>
  );
}

export default AvatarStack;
