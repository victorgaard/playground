import { generateProps } from "@/utils/generateProps";
import AvatarStacked, { AvatarStackedProps } from "./AvatarStacked";
import { User } from "@/static/types";

export const users = [
  { id: 1, name: "knight", picture: "./assets/avatar.jpeg" },
  { id: 2, name: "knight" },
  { id: 3, name: "knight", picture: "./assets/avatar.jpeg" },
  { id: 4, name: "knight", picture: "./assets/avatar.jpeg" },
  { id: 5, name: "knight", picture: "./assets/avatar.jpeg" },
  { id: 6, name: "knight", picture: "./assets/avatar.jpeg" },
  { id: 7, name: "knight", picture: "./assets/avatar.jpeg" },
  { id: 8, name: "knight", picture: "./assets/avatar.jpeg" },
];

export const props = generateProps<AvatarStackedProps<User>>({
  Component: AvatarStacked,
  defaultProps: {
    avatarSize: "sm",
    limit: 5,
    users
  },
  variantProps: {
    avatarSize: ["sm", "md", "lg", "xl"],
  },
});
