import { generateProps } from "@/utils/generateProps";
import DropdownUsers, { DropdownUsersProps } from "./DropdownUsers";
import { User } from "@/static/types";

const users = [
  { id: 1, name: "little knight", picture: "./assets/knight.jpeg" },
  { id: 2, name: "hornet", picture: "./assets/hornet.webp" },
  { id: 3, name: "quirrel", picture: "./assets/quirrel.jpeg" },
  { id: 4, name: "pure vessel", picture: "./assets/purevessel.webp" },
  { id: 5, name: "grub", picture: "./assets/grub.webp" },
];

export const props = generateProps<DropdownUsersProps<User>>({
  Component: DropdownUsers,
  defaultProps: {
    align: "start",
    avatarStackLimit: 3,
    enableSearch: true,
    sideOffset: 6,
    users,
  },
  variantProps: {
    align: ["start", "center", "end"],
  },
});
