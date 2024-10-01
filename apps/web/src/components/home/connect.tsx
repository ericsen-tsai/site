import { SOCIAL_LINKS } from "@/constants/link";

import Link from "next/link";

function Connect() {
  return (
    <div className="flex gap-4 px-2">
      {SOCIAL_LINKS.map((link) => {
        const { href, icon } = link;
        const Icon = icon;
        return (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
          >
            <Icon className="size-[18px]" />
          </Link>
        );
      })}
    </div>
  );
}

export default Connect;
