"use client";

import { cn } from "@erichandsen/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = Omit<
  CalendarProps,
  "selected" | "onSelect" | "mode" | "initialFocus" | "disabled"
> & {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

export function DatePicker({ selected: value, onSelect, ...props }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background w-auto p-0" align="start">
        <Calendar
          selected={value}
          onSelect={(date) => {
            onSelect(date);
            setOpen(false);
          }}
          mode="single"
          initialFocus
          disabled={(date) => date < new Date("1900-01-01")}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
