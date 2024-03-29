import { generateProps } from "@/utils/generateProps";
import Avatar, { AvatarProps } from "./Avatar";

export const props = generateProps<AvatarProps>({
  Component: Avatar,
  defaultProps: {
    picture: "./assets/knight.jpeg",
    name: "little knight",
    size: "md",
    status: "online",
    shape: "rounded",
  },
  variantProps: {
    size: ["xs", "sm", "md", "lg", "xl"],
    shape: ["rounded", "squared"],
    status: ["online", "offline", "idle"],
  },
  examples: {
    squared: {
      shape: "squared",
      size: "lg",
      status: "idle",
    },
    fallback: {
      picture: "",
      name: "little knight",
      status: "offline",
    },
  },
});
