import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose prose-invert prose-headings:font-medium max-w-none leading-normal">
      <ReactMarkdown
        className="mb-8"
        components={{
          img: ({ src, alt, ...props }) => {
            return typeof src === "string" ? (
              <Image
                className="mx-auto my-4"
                alt={alt ?? "markdown image"}
                {...props}
                width={920}
                height={640}
                src={src}
              />
            ) : null;
          },
          code({ className, ...props }) {
            const languages = /language-(\w+)/.exec(className ?? "");
            const language = languages ? languages[1] : null;

            return language ? (
              <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                wrapLines={false}
                useInlineStyles
              >
                {props.children as string}
              </SyntaxHighlighter>
            ) : (
              <code
                className="rounded bg-gray-800 p-1 text-white before:content-[''] after:content-none"
                {...props}
              />
            );
          },
          p: ({ children, ...props }) => {
            const str =
              Array.isArray(children) && children.length > 0 ? (children[0]?.toString() ?? "") : "";

            if (str.startsWith("![](")) {
              const imageUrl = str.slice(4, -1).split(" ")[0];
              return imageUrl ? (
                <Image src={imageUrl} alt={""} width={920} height={640} className="mx-auto" />
              ) : (
                <div>Error showing image</div>
              );
            }

            return <p {...props}>{children}</p>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

export default MarkdownRenderer;
