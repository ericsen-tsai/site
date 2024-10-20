import { allArticles } from "contentlayer/generated";

import ArticleCard from "@/components/blog/article-card";

export const dynamic = "force-dynamic";

function Articles() {
  return (
    <div className="min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      <div className="min-h-screen px-10 py-20 md:p-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 flex items-center justify-center text-center text-3xl font-bold">
            Articles
          </h1>
          <p className="text-card-foreground/50 mb-8 text-center text-sm font-medium">
            Fear can be expelled with knowledge.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {allArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
