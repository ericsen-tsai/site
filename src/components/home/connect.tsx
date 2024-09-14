import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiThreads,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/ericsen-tsai",
    icon: SiGithub,
  },
  {
    href: "https://www.facebook.com/cookiestrangetsai/",
    icon: SiFacebook,
  },
  {
    href: "https://www.instagram.com/cookiestrange_tsai/",
    icon: SiInstagram,
  },
  {
    href: "https://www.threads.net/@cookiestrange_tsai",
    icon: SiThreads,
  },
  {
    href: "https://www.linkedin.com/in/ericsen-tsai-a00948236/",
    icon: SiLinkedin,
  },
];

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
          >
            <Icon className="size-[18px]" />
          </Link>
        );
      })}
    </div>
  );
}

export default Connect;
