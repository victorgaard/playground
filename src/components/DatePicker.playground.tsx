import { generateProps } from "@/utils/generateProps";
import { DatePicker, DatePickerProps } from "./DatePicker";

export const props = generateProps<DatePickerProps>({
  Component: DatePicker,
  defaultProps: {
    date: new Date(),
  },
});
