"use client";

import type { DiaryEntry } from "@erichandsen/dal";
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
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type DiaryDrawerProps = {
  diaries: DiaryEntry[];
};

export function DiaryDrawer({ diaries }: DiaryDrawerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = useCallback(
    (diaryId: number) => {
      setIsOpen(false);
      setTimeout(() => {
        router.push(`/diary/${diaryId}`);
      }, 100);
    },
    [router]
  );

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="shadow-xl" variant="outline">
          <ListIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-foreground border-border border-t">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Diaries</DrawerTitle>
            <DrawerDescription>View all diary entries.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4">
                {diaries.map((diary) => (
                  <Button
                    key={diary.id}
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => {
                      handleCardClick(diary.id);
                    }}
                  >
                    <Card className="bg-card/50 border-border/50 hover:bg-card/80 w-64 min-w-64 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-background">{diary.title}</CardTitle>
                        <CardDescription className="text-background/80">
                          {format(new Date(diary.date), "MMMM d, yyyy")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-background/80 line-clamp-6 max-h-[120px] min-h-[120px] w-full overflow-hidden text-ellipsis whitespace-pre-line text-start text-sm">
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
                  </Button>
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
