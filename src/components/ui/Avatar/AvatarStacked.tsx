import { VariantProps } from "class-variance-authority";
import Avatar, { avatarVariants } from "./Avatar";
import { User } from "@/static/types";

export type AvatarStackedProps<T extends User> = {
  avatarSize: VariantProps<typeof avatarVariants>["size"];
  limit: number;
  users: T[];
};

function AvatarStacked<T extends User>({ avatarSize, limit, users }: AvatarStackedProps<T>) {
  return (
    <>
      {users.slice(0, limit - 1).map((user) => (
        <Avatar
          key={user.id}
          picture={user.picture}
          name={user.name}
          size={avatarSize}
          className="-ml-6 border-4 border-gray-950"
        />
      ))}
    </>
  );
}

export default AvatarStacked;
