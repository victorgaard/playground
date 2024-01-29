import { generateProps } from "@/utils/generateProps";
import Tooltip, { TooltipProps } from "./Tooltip";
import Button from "../Button/Button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const props = generateProps<TooltipProps>({
  Component: Tooltip,
  defaultProps: {
    trigger: (
      <Button variant="tertiary">
        <InformationCircleIcon className="h-4 w-4 text-gray-400" />
        I'm a tooltip, hover me
      </Button>
    ),
    children: "No, you are the trigger. I AM the tooltip 😡",
    side: "top",
    align: "center",
    delayDuration: 0,
    displayArrow: true,
  },
  variantProps: {
    side: ["top", "right", "bottom", "left"],
    align: ["start", "center", "end"],
  },
});
