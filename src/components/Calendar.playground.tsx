import { generateProps } from "@/utils/generateProps";
import { Calendar, CalendarProps } from "./Calendar";

export const props = generateProps<CalendarProps>({
  Component: Calendar,
  defaultProps: {
    mode: "single",
    numberOfMonths: 1,
    showOutsideDays: true,
    selected: new Date(),
  },
  variantProps: {
    mode: ["single", "range"],
    numberOfMonths: [1, 2],
  },
  examples: {
    range: {
      mode: "range",
      selected: {
        from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
  },
});
