"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { NAV_ITEMS } from "@/constants/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import deleteAllComments from "@/actions/deleteAllComments";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  user: Session["user"];
  comments: {
    userImage: string | null | undefined;
    userName: string | null | undefined;
    userRole: "user" | "admin" | undefined;
    id: number;
    message: string;
    createdAt: Date;
    userId: string;
  }[];
};

function Guestbook({ user, comments: initialComments }: Props) {
  const router = useRouter();

  const { data: comments } = api.guestbookComments.get.useQuery(undefined, {
    initialData: initialComments,
  });

  const utils = api.useUtils();

  const { mutate, isPending } = api.guestbookComments.create.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get("message") as string;
    mutate(message, {
      onSuccess: () => {
        (e.target as HTMLFormElement).reset();
        utils.guestbookComments.get.invalidate();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div
      className="mb-48 mt-24 grid grid-cols-1 gap-12"
      id={NAV_ITEMS.GUESTBOOK}
    >
      <div className="flex flex-col">
        <div className="mb-8">
          <h3 className="text-xl font-medium">Guestbook</h3>
          <p className="text-sm font-medium text-card-foreground/50">
            I have hated the words and I have loved them, and I hope I have made
            them right.
          </p>
        </div>
        {user ? (
          <form onSubmit={handleSubmit} className="flex grow flex-col gap-8">
            <div className="flex grow items-start space-x-4">
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={user.image ?? ""} alt="User" />
                    <AvatarFallback className="bg-gray-700">
                      {user.name?.at(0)}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit border-none bg-secondary/30 p-2 shadow-none backdrop-blur-sm">
                  <div className="flex flex-col gap-2 font-[family-name:var(--font-montserrat)]">
                    <Button
                      variant="destructive"
                      onClick={() =>
                        signOut({ redirectTo: `/#${NAV_ITEMS.GUESTBOOK}` })
                      }
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="relative w-full">
                <Textarea
                  placeholder="Leave a message"
                  className="scrollbar-hide size-full rounded-lg border-[0.01rem] border-card-foreground/50 p-4 pr-24 text-card-foreground"
                  name="message"
                  disabled={isPending}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  className="absolute bottom-2 right-2"
                  disabled={isPending}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex h-[4.625rem] grow flex-col items-center justify-center">
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
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className="rounded-lg border-[0.01rem] border-card-foreground/50 bg-transparent p-4 text-card-foreground"
          >
            <CardTitle className="mb-2 flex items-center space-x-3">
              <Avatar>
                {comment.userImage ? (
                  <AvatarImage
                    src={comment.userImage}
                    alt={comment.userName ?? ""}
                  />
                ) : (
                  <AvatarFallback className="bg-gray-700">
                    {comment.userName?.[0] ?? "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">
                <div className="font-semibold">
                  {comment.userName}
                  {comment.userRole === "admin" ? " (admin)" : ""}
                </div>
                <div className="text-xs opacity-50">
                  {comment.createdAt.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            </CardTitle>
            <CardDescription className="text-sm text-card-foreground">
              {comment.message}
            </CardDescription>
          </Card>
        ))}
      </div>
      {process.env.NODE_ENV === "development" && (
        <Button
          onClick={async () => {
            await deleteAllComments();
            router.refresh();
          }}
          variant="destructive"
          disabled
        >
          Delete All
        </Button>
      )}
    </div>
  );
}

export default Guestbook;
