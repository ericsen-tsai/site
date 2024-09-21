"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { NAV_ITEMS } from "@/constants/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

type Props = {
  session: Session | null;
};

function Guestbook({ session }: Props) {
  const [guestBookEntries, setGuestBookEntries] = useState([
    {
      id: 1,
      name: "Alice",
      message: "Great portfolio!",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2023-06-01",
      color: "#E5E5E5",
    },
    {
      id: 2,
      name: "Bob",
      message: "Impressive work!",
      date: "2023-06-02",
      color: "#4A4A4A",
    },
    {
      id: 3,
      name: "Charlie",
      message:
        "Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!",
      date: "2023-06-03",
      color: "#2C2C2C",
    },
    {
      id: 4,
      name: "Charlie",
      message:
        "Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!",
      date: "2023-06-03",
      color: "#2C2C2C",
    },
    {
      id: 5,
      name: "Charlie",
      message:
        "Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!",
      date: "2023-06-03",
      color: "#2C2C2C",
    },
    {
      id: 6,
      name: "Charlie",
      message:
        "Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!",
      date: "2023-06-03",
      color: "#2C2C2C",
    },
    {
      id: 7,
      name: "Charlie",
      message:
        "Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!",
      date: "2023-06-03",
      color: "#2C2C2C",
    },
    {
      id: 8,
      name: "Charlie",
      message:
        "Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!Love the design!",
      date: "2023-06-03",
      color: "#2C2C2C",
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    name: "",
    message: "",
    color: "#E5E5E5",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.name && newEntry.message) {
      setGuestBookEntries([
        ...guestBookEntries,
        {
          id: Date.now(),
          name: newEntry.name,
          message: newEntry.message,
          date: new Date().toISOString().split("T")[0],
          color: newEntry.color,
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ]);
      setNewEntry({ name: "", message: "", color: "#E5E5E5" });
    }
  };

  return (
    <div
      className="mb-48 mt-24 grid grid-cols-1 gap-12"
      id={NAV_ITEMS.GUESTBOOK}
    >
      <div className="flex flex-col">
        <div className="mb-8">
          <h3 className="text-xl font-bold">Guestbook</h3>
          <p className="text-sm text-card-foreground/50">
            I have hated the words and I have loved them, and I hope I have made
            them right.
          </p>
        </div>
        {session?.user ? (
          <form onSubmit={handleSubmit} className="flex grow flex-col gap-8">
            <div className="flex grow items-start space-x-4">
              <Avatar>
                <AvatarImage src={session.user.image ?? ""} alt="User" />
                <AvatarFallback className="bg-gray-700">
                  {session.user.name?.at(0)}
                </AvatarFallback>
              </Avatar>
              <div className="h-full grow">
                <Textarea
                  placeholder="Leave a message"
                  className="size-full rounded-lg border-[0.01rem] border-card-foreground/50 p-4 text-card-foreground"
                />
              </div>
            </div>
            <div className="mt-auto flex justify-end space-x-2">
              <Button
                variant="outline"
                className="hover:bg-gray-700 hover:text-white"
                onClick={() =>
                  signOut({ redirectTo: `/#${NAV_ITEMS.GUESTBOOK}` })
                }
              >
                Sign Out
              </Button>
              <Button variant="secondary">Submit</Button>
            </div>
          </form>
        ) : (
          <div className="flex h-[8.875rem] grow flex-col items-center justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Sign In</Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit border-none bg-secondary/30 p-2 shadow-none backdrop-blur-sm">
                <div className="flex flex-col gap-2 font-[family-name:var(--font-montserrat)]">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      signIn("google", {
                        redirectTo: `/#${NAV_ITEMS.GUESTBOOK}`,
                      })
                    }
                  >
                    <SiGoogle className="mr-2 size-[18px]" />
                    Google
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      signIn("github", {
                        redirectTo: `/#${NAV_ITEMS.GUESTBOOK}`,
                      })
                    }
                  >
                    <SiGithub className="mr-2 size-[18px]" />
                    GitHub
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <p className="mt-3 text-sm text-card-foreground/50">
              to leave your idea
            </p>
          </div>
        )}
      </div>

      <div className="max-h-96 space-y-4 overflow-y-auto pr-4">
        {guestBookEntries.map((entry) => (
          <Card
            key={entry.id}
            className="rounded-lg border-[0.01rem] border-card-foreground/50 bg-transparent p-4 text-card-foreground"
          >
            <CardTitle className="mb-2 flex items-center space-x-3">
              <Avatar>
                {entry.avatar ? (
                  <AvatarImage src={entry.avatar} alt={entry.name} />
                ) : (
                  <AvatarFallback className="bg-gray-700">
                    {entry.name[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">
                <div className="font-semibold">{entry.name}</div>
                <div className="text-xs opacity-50">{entry.date}</div>
              </div>
            </CardTitle>
            <CardDescription className="text-sm text-card-foreground">
              {entry.message}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Guestbook;
