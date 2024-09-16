import * as React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  link: string;
  techStacks: string[];
};

function ProjectCard({ title, description, link, techStacks }: Props) {
  return (
    <Link href={link}>
      <Card className="relative mx-auto flex h-60 w-full flex-col overflow-hidden border-[0.01rem] border-card-foreground/50 text-card-foreground">
        <Image
          src={`/projects/${title.toLowerCase()}/cover.png`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300 hover:opacity-5"
        />
        <CardHeader className="flex flex-row items-center gap-2 p-4 text-3xl text-primary/80">
          {title}
        </CardHeader>
        <CardDescription className="p-4 pt-0 text-right text-sm text-secondary">
          {description}
        </CardDescription>
        <CardFooter className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {techStacks.map((techStack) => (
              <div
                key={techStack}
                className="rounded-full border bg-zinc-700 px-3 py-2 text-xs leading-4"
              >
                {techStack}
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProjectCard;
