import { generateProps } from "@/utils/generateProps";
import { User } from "@/static/types";
import AvatarStack, { AvatarStackProps } from "./AvatarStack";

export const users = [
  { id: 1, name: "little knight", picture: "./assets/knight.jpeg" },
  { id: 2, name: "john doe" },
  { id: 3, name: "hornet", picture: "./assets/hornet.webp" },
  { id: 4, name: "quirrel", picture: "./assets/quirrel.jpeg" },
  { id: 5, name: "pure vessel", picture: "./assets/purevessel.webp" },
  { id: 6, name: "grub", picture: "./assets/grub.webp" },
  { id: 7, name: "foo bar" },
  { id: 8, name: "why are you still scrolling?" },
];

export const props = generateProps<AvatarStackProps<User>>({
  Component: AvatarStack,
  defaultProps: {
    avatarSize: "md",
    limit: 5,
    users,
  },
  variantProps: {
    avatarSize: ["sm", "md", "lg", "xl"],
  },
  examples: {
    limitless: {
      limit: 0,
      avatarSize: "xl",
      users
    },
  },
});
