import { User } from "@/static/types";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import {
  Dropdown,
  DropdownBody,
  DropdownCheckboxItem,
  DropdownTrigger,
} from "./Dropdown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import AvatarStack from "../Avatar/AvatarStack";
import { Typography } from "../Typography";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export type DropdownUsersProps<T> = React.ComponentPropsWithoutRef<
  typeof DropdownMenu.Content
> & {
  users: T[];
  avatarStackLimit?: number;
  enableSearch?: boolean;
};

function DropdownUsers<T extends User>({
  users,
  align,
  sideOffset,
  avatarStackLimit = 3,
  enableSearch = true,
}: DropdownUsersProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  function handleUserSelect(isChecked: boolean, userId: User["id"]) {
    if (isChecked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      const newSelectedUsers = [...selectedUsers].filter((id) => id !== userId);
      setSelectedUsers(newSelectedUsers);
    }
  }

  const searchedUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedUserIds = users.filter((user) =>
    selectedUsers.includes(user.id),
  );

  return (
    <div className="min-w-56">
      <Dropdown align={align} sideOffset={sideOffset}>
        <DropdownTrigger>
          <Button
            variant="secondary"
            className="w-full justify-start active:scale-100"
          >
            {selectedUsers.length > 0 ? (
              <>
                <AvatarStack
                  avatarSize="sm"
                  users={selectedUserIds}
                  limit={avatarStackLimit}
                />
                selected
              </>
            ) : (
              <>
                <UserGroupIcon className="h-5 w-5 text-gray-600" />
                Pick users
              </>
            )}
          </Button>
        </DropdownTrigger>
        <DropdownBody className="min-w-56">
          {enableSearch && (
            <div className="relative">
              <input
                placeholder="Search for users..."
                className="w-full appearance-none border-b border-gray-700 bg-transparent px-4 py-3 pl-10 text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  const allowedKeys = ["ArrowDown", "ArrowUp", "Tab"];
                  if (!allowedKeys.includes(e.key)) {
                    e.stopPropagation();
                  }
                }}
              />
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-4 w-4 opacity-50" />
            </div>
          )}
          {searchedUsers.map((user) => (
            <DropdownCheckboxItem
              key={user.id}
              checked={!!selectedUsers.some((id) => id === user.id)}
              onCheckedChange={(isChecked) =>
                handleUserSelect(isChecked, user.id)
              }
              onSelect={(e) => e.preventDefault()}
            >
              <Avatar size="xs" picture={user.picture} name={user.name} />
              <Typography.Paragraph extraContrast>
                {user.name}
              </Typography.Paragraph>
            </DropdownCheckboxItem>
          ))}
          {searchedUsers.length === 0 && (
            <div className="px-4 py-3">
              <Typography.Paragraph>There are no results</Typography.Paragraph>
            </div>
          )}
        </DropdownBody>
      </Dropdown>
    </div>
  );
}

export default DropdownUsers;
