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

export const RESUME_DATA = {
  name: "Ping-Chi (Ericsen) Tsai",
  initials: "ET",
  location: "Taipei, Taiwan",
  locationLink: "https://www.google.com/maps/place/Taipei",
  about:
    "Frontend-focused full-stack engineer with 3+ years experience in web apps, SaaS, and healthcare.",
  summary: (
    <>
      Frontend-focused full-stack engineer with 3+ years of experience. Skilled in React, Next.js,
      TypeScript. Strong ownership, delivers end-to-end features.
    </>
  ),
  avatarUrl: "https://avatars.githubusercontent.com/u/90230992?v=4",
  personalWebsiteUrl: "https://site.erichandsen.dev",
  contact: {
    email: "bommer95175@gmail.com",
    tel: "+886 938-786-158",
    social: [
      {
        name: "GitHub",
        url: GITHUB_URL,
        icon: SiGithub
      },
      {
        name: "LinkedIn",
        url: LINKEDIN_URL,
        icon: SiLinkedin
      },
      {
        name: "Facebook",
        url: FACEBOOK_URL,
        icon: SiFacebook
      },
      {
        name: "Instagram",
        url: INSTAGRAM_URL,
        icon: SiInstagram
      },
      {
        name: "Threads",
        url: THREADS_URL,
        icon: SiThreads
      }
    ] as const
  },
  education: [
    {
      school: "NCKU, Taiwan",
      degree: "M.S. Biomedical Engineering",
      start: "2019",
      end: "2021"
    },
    {
      school: "NCKU, Taiwan",
      degree: "B.S. Biomedical Engineering",
      start: "2015",
      end: "2019"
    }
  ],
  work: [
    {
      company: "AIFT",
      link: undefined,
      badges: ["Next.js", "React Query", "TailwindCSS", "FastAPI", "PostgreSQL"],
      title: "Software Engineer",
      start: "Sep. 2023",
      end: null,
      description: (
        <>
          • Built reusable CMS templates, cut setup time 40%
          <br />
          • Co-led AI compliance tool (Vulcan) UI
          <br />• Shipped weekly in agile team
        </>
      )
    },
    {
      company: "Big Data",
      link: undefined,
      badges: ["React.js", "Next.js", "React Query", "MUI"],
      title: "Frontend Engineer",
      start: "Jul. 2022",
      end: "Sep. 2023",
      description: (
        <>
          • Built Fanti Insights dashboard v1.0 in 3 months
          <br />• Refactored legacy platforms, cut load 30%
        </>
      )
    },
    {
      company: "LNT Intelligence",
      link: undefined,
      badges: ["jQuery", "SASS", "Flask"],
      title: "Software Engineer",
      start: "Jul. 2021",
      end: "Jul. 2022",
      description: (
        <>
          • Built dashboards for sensor data
          <br />• Developed hospital queuing system
        </>
      )
    },
    {
      company: "Acusense",
      link: undefined,
      badges: ["TensorFlow", "Machine Learning", "Python"],
      title: "ML Intern",
      start: "Jun. 2020",
      end: "Aug. 2020",
      description: (
        <>
          • Built ML models for dialysis monitoring
          <br />• 95% accuracy in lab simulations
        </>
      )
    }
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Flask",
    "FastAPI",
    "TailwindCSS",
    "ShadcnUI",
    "MUI",
    "styled-components",
    "GitHub Actions",
    "Docker",
    "Vercel",
    "Gitlab CI",
    "PostgreSQL",
    "MongoDB"
  ],
  projects: [
    {
      title: "Portfolio",
      techStack: ["Next.js", "ShadcnUI", "Turborepo", "PostgreSQL", "Vercel"],
      description: "Monorepo portfolio with server components, responsive UI, type-safe APIs.",
      link: {
        label: "site.erichandsen.dev",
        href: "https://site.erichandsen.dev"
      }
    },
    {
      title: "Buen Camino",
      techStack: ["Next.js", "ShadcnUI", "PostgreSQL", "Vercel"],
      description: "Journaling app for Camino hikers. Map, media, auth, real-time editing.",
      link: {
        label: "buen-camino.erichandsen.dev",
        href: "https://buen-camino.erichandsen.dev"
      }
    }
  ]
} as const;
