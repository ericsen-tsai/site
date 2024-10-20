import { allArticles } from "contentlayer/generated";
import { format } from "date-fns";
import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import MarkdownRenderer from "@/components/articles/markdown-renderer";

interface PageProps {
  params: {
    slug: string;
  };
}

function getArticleFromParams(params: PageProps["params"]) {
  const { slug } = params;
  const currentArticle = allArticles.find((article) => article.slugAsParams === slug);

  if (!currentArticle) {
    return null;
  }

  return currentArticle;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = getArticleFromParams(params);

  if (!article) {
    return {};
  }

  const previousOpenGraph = (await parent).openGraph ?? {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      ...previousOpenGraph,
      url: "/article",
      title: article.title,
      description: article.description
    }
  };
}

export function generateStaticParams(): Array<PageProps["params"]> {
  return allArticles.map((article) => ({
    slug: article.slugAsParams
  }));
}

function ArticlePage({ params }: PageProps) {
  const article = getArticleFromParams(params);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      <div className="min-h-screen p-20">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-invert py-6">
            <h1 className="mb-2">{article.title}</h1>
            <p className="text-sm text-slate-400">
              {format(new Date(String(article.date)), "MMMM d, yyyy")}
            </p>
            <p className="mt-0 text-xl text-slate-200">{article.description}</p>
            <Image
              width={1200}
              height={630}
              src={`/article/${article.slugAsParams}/cover.png`}
              alt={article.title}
              className="rounded-xl p-2"
            />
            <hr className="my-4" />
            <MarkdownRenderer content={article.body.raw} />
          </article>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
