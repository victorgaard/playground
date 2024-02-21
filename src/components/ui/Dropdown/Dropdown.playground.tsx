import { generateProps } from "@/utils/generateProps";
import {
  Dropdown,
  DropdownBody,
  DropdownItem,
  DropdownProps,
  DropdownSeparator,
  DropdownTrigger,
} from "./Dropdown";
import Button from "../Button/Button";
import {
  AcademicCapIcon,
  ArrowRightStartOnRectangleIcon,
  BanknotesIcon,
  BeakerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export const props = generateProps<DropdownProps>({
  Component: Dropdown,
  defaultProps: {
    align: "start",
    sideOffset: 6,
    children: (
      <>
        <DropdownTrigger>
          <Button>
            open me
            <ChevronDownIcon className="h-5 w-5 opacity-50" />
          </Button>
        </DropdownTrigger>
        <DropdownBody>
          <DropdownItem>
            <AcademicCapIcon className="h-5 w-5 opacity-50" />I close when
            clicked
          </DropdownItem>
          <DropdownItem>
            <BanknotesIcon className="h-5 w-5 opacity-50" />
            Me too
          </DropdownItem>
          <DropdownItem onClick={(e) => e.preventDefault()}>
            <BeakerIcon className="h-5 w-5 opacity-50" /> Well, I don't 👀
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <ArrowRightStartOnRectangleIcon className="h-5 w-5 opacity-50" />{" "}
            Sign out
          </DropdownItem>
        </DropdownBody>
      </>
    ),
  },
  variantProps: {
    align: ["start", "center", "end"],
  },
});
