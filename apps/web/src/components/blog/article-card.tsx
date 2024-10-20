import { Card } from "@erichandsen/ui";
import { type Article } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = Omit<Article, "slug">;

function ArticleCard({ slugAsParams, title, date }: Props) {
  return (
    <Link href={`/blog/${slugAsParams}`}>
      <Card className="border-card-foreground/50 text-card-foreground group relative rounded-xl border-[0.01rem] p-2">
        <Image
          width={1200}
          height={630}
          src={`/blog/${slugAsParams}/cover.png`}
          alt={title}
          className="rounded-xl p-2"
          priority
        />
        <div className="flex flex-col p-2 transition-transform ease-out group-hover:translate-x-0.5">
          <p className="text-muted-foreground mt-2">
            {format(new Date(String(date)), "MMMM d, yyyy")}
          </p>
          <h3 className="font-title text-xl font-bold">{title}</h3>
        </div>
      </Card>
    </Link>
  );
}

export default ArticleCard;
