import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiThreads
} from "@icons-pack/react-simple-icons";

export enum SECTION_NAV_ITEMS {
  HOME = "Home",
  WHOAMI = "Who am I",
  ABOUTME = "About Me",
  PROJECTS = "Projects",
  GUESTBOOK = "Guestbook",
  BUEN_CAMINO = "Buen Camino"
}

export enum LINK_NAV_ITEMS {
  BLOG = "Blog"
}

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/ericsen-tsai",
    icon: SiGithub,
    text: "GitHub"
  },
  {
    href: "https://www.facebook.com/cookiestrangetsai/",
    icon: SiFacebook,
    text: "Facebook"
  },
  {
    href: "https://www.instagram.com/cookiestrange_tsai/",
    icon: SiInstagram,
    text: "Instagram"
  },
  {
    href: "https://www.threads.net/@cookiestrange_tsai",
    icon: SiThreads,
    text: "Threads"
  },
  {
    href: "https://www.linkedin.com/in/ericsen-tsai-a00948236/",
    icon: SiLinkedin,
    text: "LinkedIn"
  }
];
