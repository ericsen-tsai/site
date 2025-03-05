"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@erichandsen/ui";
import { format } from "date-fns";
import { ListIcon } from "lucide-react";
import Image from "next/image";

type DiaryDrawerProps = {
  diaries: Array<{
    id: number;
    title: string;
    content: string;
    heroImageUrl: string | null;
    date: string;
    latitude: string;
    longitude: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
};

export function DiaryDrawer({ diaries }: DiaryDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-4 right-4 shadow-2xl" variant="outline">
          <ListIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-foreground border-border border-t">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Your Diaries</DrawerTitle>
            <DrawerDescription>View all your diary entries.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4">
                {diaries.map((diary) => (
                  <Card
                    key={diary.id}
                    className="bg-card/50 border-border/50 hover:bg-card/80 w-64 min-w-64 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle className="text-background">{diary.title}</CardTitle>
                      <CardDescription className="text-background/80">
                        {format(new Date(diary.date), "MMMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-background/80 line-clamp-5 min-h-[100px] break-words text-sm">
                        {diary.content}
                      </p>
                      {diary.heroImageUrl && (
                        <div className="border-border/50 mt-4 overflow-hidden rounded-lg border">
                          <Image
                            src={diary.heroImageUrl}
                            alt={diary.title}
                            className="h-32 w-full object-cover"
                            width={400}
                            height={300}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost" className="border-border/50 hover:bg-accent">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
