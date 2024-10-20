import { Card } from "@erichandsen/ui";
import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  summary: string;
  date: Date;
};

function ArticleCard({ slug, title, summary, date }: Props) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="border-card-foreground/50 text-card-foreground group relative rounded-xl border-[0.01rem] p-2">
        <Image
          width={1200}
          height={630}
          src={`/images/blog/${slug}/cover.png`}
          alt={title}
          className="rounded-xl p-2"
        />
        <div className="flex flex-col p-2 transition-transform ease-out group-hover:translate-x-0.5">
          <p className="text-muted-foreground mt-2">{date.toLocaleDateString()}</p>
          <h3 className="font-title text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground mt-2">{summary}</p>
        </div>
      </Card>
    </Link>
  );
}

export default ArticleCard;
