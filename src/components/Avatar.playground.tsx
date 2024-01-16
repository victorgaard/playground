import { generateProps } from "@/utils/generateProps";
import Avatar, { AvatarProps } from "./Avatar";

export const props = generateProps<AvatarProps>({
  Component: Avatar,
  defaultProps: {
    picture:
      "https://media.licdn.com/dms/image/D4E03AQFJmfu1Lv_FuA/profile-displayphoto-shrink_800_800/0/1701346250579?e=1710979200&v=beta&t=bIE2SN073dL2F4Bi9GrmG9GsnPPdeuB_7tsSbKpf7nw",
    name: "Victor",
    status: "online",
  },
  variantProps: {
    status: ["online", "offline", "idle"],
    size: ["sm", "md", "lg", "xl"],
  },
});
