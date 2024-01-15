import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import Button from "./Button";
import { cn } from "@/utils/cn";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Calendar } from "./Calendar";
import { useState } from "react";

export type DatePickerProps = {
  date: Date;
};

export function DatePicker({ date }: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !currentDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {currentDate ? (
            format(currentDate, "PPP")
          ) : (
            <span>Pick a currentDate</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" avoidCollisions={false}>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
