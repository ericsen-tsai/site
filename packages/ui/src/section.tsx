import { cn } from "@erichandsen/utils";
import React from "react";

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("flex min-h-0 flex-col gap-y-3 print:gap-y-1", className)} {...props} />
  );
}
