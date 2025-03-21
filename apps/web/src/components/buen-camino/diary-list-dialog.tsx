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
import { Calendar, MapPin, Menu } from "lucide-react";

interface DiaryListDialogProps {
  diaries: DiaryEntry[];
  onSelectEntry: (entry: DiaryEntry) => void;
  open: boolean;
  onOpenChange: (open: boolean, entry?: DiaryEntry) => void;
}

function DiaryListDialog({ diaries, onSelectEntry, open, onOpenChange }: DiaryListDialogProps) {
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
      <DialogContent className="bg-foreground text-background max-h-[80vh] overflow-y-auto !rounded-xl border-2 border-gray-700/50 p-3 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Diary Entries</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a diary entry to view its details and location on the map
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {diaries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => {
                onSelectEntry(entry);
                onOpenChange(false, entry);
              }}
              className="group w-full rounded-lg border border-gray-700/50 bg-transparent p-4 text-left transition-colors hover:bg-gray-700/50"
              type="button"
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
