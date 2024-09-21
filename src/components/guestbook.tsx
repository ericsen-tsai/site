"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardTitle, CardDescription } from "./ui/card";

function Guestbook() {
  const [signIn, setSignIn] = useState(true);
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
    <div className="mb-48 grid grid-cols-1 gap-12">
      <div className="flex flex-col">
        <div className="mb-8">
          <h3 className="text-xl font-bold">Guestbook</h3>
          <p className="text-sm text-card-foreground/50">
            I have hated the words and I have loved them, and I hope I have made
            them right.
          </p>
        </div>
        {signIn ? (
          <form onSubmit={handleSubmit} className="flex grow flex-col gap-8">
            <div className="flex grow items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="bg-gray-700">U</AvatarFallback>
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
              >
                Logout
              </Button>
              <Button variant="secondary">Submit</Button>
            </div>
          </form>
        ) : (
          <div className="flex grow items-center justify-center">
            <Button variant="secondary" onClick={() => setSignIn(true)}>
              Sign In
            </Button>
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
