import { generateProps } from "@/utils/generateProps";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalTrigger,
} from "./Modal";
import Button from "../Button/Button";
import {
  EllipsisHorizontalIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "../Typography";
import Input from "../Input/Input";
import Avatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";

export const users = [
  { id: 6, name: "", email: "john@doe.com", status: "pending" },
  { id: 7, name: "", email: "foo@bar.com", status: "pending" },
  {
    id: 1,
    name: "little knight",
    picture: "./assets/knight.jpeg",
    email: "littleknight@hk.com",
    status: "member",
  },
  {
    id: 2,
    name: "hornet",
    picture: "./assets/hornet.webp",
    email: "hornet@hk.com",
    status: "member",
  },
  {
    id: 3,
    name: "quirrel",
    picture: "./assets/quirrel.jpeg",
    email: "quirrel@hk.com",
    status: "member",
  },
];

export const props = generateProps<ModalProps>({
  Component: Modal,
  defaultProps: {
    size: "md",
    children: (
      <>
        <ModalTrigger>
          <Button>
            <UserPlusIcon className="h-5 w-5 opacity-50" />
            invite members
          </Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <Typography.Paragraph className="text-base" extraContrast>
              Invite members
            </Typography.Paragraph>
            <Typography.Paragraph className="pt-2">
              Invite your colleagues to join your workspace and start
              collaborating on your projects.
            </Typography.Paragraph>
          </ModalContent>
          <div className="flex flex-col gap-6 border-t border-gray-800 bg-white/[0.02] p-6">
            <div className="flex flex-1 items-end gap-2">
              <Input
                label="Email"
                placeholder="name@company.com"
                className="w-full min-w-0"
              />
              <Button size="lg">Send</Button>
            </div>
            <div className="flex flex-col gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="sm"
                      picture={user.picture}
                      name={user.email}
                    />
                    <Typography.Paragraph>
                      {user.name || user.email}
                    </Typography.Paragraph>
                    {user.status === "pending" && (
                      <Badge size="xs">Pending</Badge>
                    )}
                  </div>
                  <Button variant="ghost" isIcon size="sm">
                    <EllipsisHorizontalIcon className="h-5 w-5 shrink-0 opacity-50" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
      </>
    ),
  },
  variantProps: {
    size: ["sm", "md", "lg"],
  },
  examples: {
    small: {
      size: "sm",
    },
    large: {
      size: "lg",
    },
  },
});
