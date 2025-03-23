import {
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  THREADS_URL
} from "@erichandsen/constants";
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
    href: GITHUB_URL,
    icon: SiGithub,
    text: "GitHub"
  },
  {
    href: FACEBOOK_URL,
    icon: SiFacebook,
    text: "Facebook"
  },
  {
    href: INSTAGRAM_URL,
    icon: SiInstagram,
    text: "Instagram"
  },
  {
    href: THREADS_URL,
    icon: SiThreads,
    text: "Threads"
  },
  {
    href: LINKEDIN_URL,
    icon: SiLinkedin,
    text: "LinkedIn"
  }
];
