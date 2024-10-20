import { Tooltip, TooltipContent, TooltipTrigger } from "@erichandsen/ui";
import { cn } from "@erichandsen/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

import type { BookEntry } from "@/types/book-entry";

type Props = BookEntry & {
  index: number;
};

function TimelineItem({ title, author, date, link, bestQuoteInBook, ongoing, index }: Props) {
  return (
    <li key={title} className="relative">
      <div
        className={cn(
          "relative flex w-full",
          index % 2 === 0
            ? "justify-end pr-28 text-right sm:pr-32"
            : "justify-start pl-28 text-left sm:pl-32"
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={link ?? ""} target="_blank">
              <h3
                className={"text-primary/80 w-fit font-semibold backdrop-blur-sm hover:underline"}
              >
                {title} {ongoing && "(Ongoing)"}
              </h3>
            </Link>
          </TooltipTrigger>
          {bestQuoteInBook && (
            <TooltipContent
              side={index % 2 === 0 ? "left" : "right"}
              sideOffset={15}
              className="border-card-foreground/50 text-card-foreground border-[0.01rem] bg-transparent"
            >
              <p className="w-36 max-w-max md:w-48">{bestQuoteInBook}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
      <div className="absolute -bottom-16 right-0 flex flex-col items-end text-sm font-semibold text-gray-500">
        <div className="flex flex-col items-end sm:flex-row">
          <p>by</p>
          <p className="backdrop-blur-sm">&nbsp;{author}</p>
        </div>
        <p className="flex items-center">
          <Calendar className="mr-1 size-4" />
          {date}
        </p>
      </div>
    </li>
  );
}

export default TimelineItem;
