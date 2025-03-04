"use client";

import { cn } from "@erichandsen/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function IconLeft({ className, ...props }: React.ComponentProps<typeof ChevronLeft>) {
  return <ChevronLeft className={cn("size-4", className)} {...props} />;
}

function IconRight({ className, ...props }: React.ComponentProps<typeof ChevronRight>) {
  return <ChevronRight className={cn("size-4", className)} {...props} />;
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-foreground text-background rounded-lg p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 bg-transparent p-0 text-white hover:bg-gray-700/50 hover:text-white"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-400 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal text-white hover:bg-gray-700/50 hover:text-white aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-black hover:bg-primary hover:text-black focus:bg-primary focus:text-black",
        day_today: "bg-gray-800 text-white",
        day_outside:
          "day-outside text-gray-500 aria-selected:bg-gray-800/50 aria-selected:text-gray-400",
        day_disabled: "text-gray-500 opacity-50",
        day_range_middle: "aria-selected:bg-gray-800 aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft,
        IconRight
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
