"use client";

import { type DiaryEntry } from "@erichandsen/dal";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@erichandsen/ui";
import { cn } from "@erichandsen/utils";
import { Calendar, MapPin, Menu } from "lucide-react";

interface DiaryListDialogProps {
  diaries: DiaryEntry[];
  selectedEntry: DiaryEntry | undefined;
  onSelectEntry: (entry: DiaryEntry) => void;
  open: boolean;
  onOpenChange: (open: boolean, entry?: DiaryEntry) => void;
}

function DiaryListDialog({
  diaries,
  selectedEntry,
  onSelectEntry,
  open,
  onOpenChange
}: DiaryListDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-4 z-[1000] rounded-xl border-2 border-gray-700/50 bg-transparent text-white backdrop-blur-lg hover:bg-gray-700/50"
        >
          <Menu className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-foreground text-background max-h-[80vh] w-11/12 overflow-y-auto !rounded-xl border-2 border-gray-700/50 p-3 px-4 shadow-lg md:w-full">
        <DialogHeader className="pt-2">
          <DialogTitle className="text-white">Shells</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-white">Select a shell to view.</DialogDescription>
        <div className="max-h-80 space-y-3 overflow-y-auto">
          {diaries
            .toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  onSelectEntry(entry);
                  onOpenChange(false, entry);
                }}
                className={cn(
                  "group w-full rounded-lg border border-gray-700/50 bg-transparent p-4 text-left transition-colors hover:bg-gray-700/50",
                  selectedEntry?.id === entry.id && "bg-gray-700/50"
                )}
                type="button"
                disabled={selectedEntry?.id === entry.id}
              >
                <h4 className="font-semibold text-white group-hover:text-white">{entry.title}</h4>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="size-3" />
                  <span>
                    {Number(entry.latitude).toFixed(2)}, {Number(entry.longitude).toFixed(2)}
                  </span>
                </div>
                <time className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="size-3" />
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </time>
              </button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DiaryListDialog;
