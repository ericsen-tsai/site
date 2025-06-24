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
    "Frontend-focused full-stack engineer with a biomedical engineering background and 3+ years of experience building web apps across healthcare, SaaS, and AI.",
  summary: (
    <>
      Frontend-focused full-stack engineer with a biomedical engineering background and 3+ years of
      experience building web apps across healthcare, SaaS, and AI. Skilled in React, Next.js, and
      TypeScript, with a strong sense of ownership and hands-on experience delivering end-to-end
      features.
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
      school: "National Cheng-Kung University, Tainan, Taiwan",
      degree: "M.S. in Biomedical Engineering",
      start: "Aug. 2019",
      end: "Feb. 2021"
    },
    {
      school: "National Cheng-Kung University, Tainan, Taiwan",
      degree: "B.S. in Biomedical Engineering",
      start: "Aug. 2015",
      end: "Aug. 2019"
    }
  ],
  work: [
    {
      company: "AIFT",
      link: undefined,
      badges: [
        "React.js",
        "Next.js",
        "React Query",
        "styled-components",
        "TailwindCSS",
        "FastAPI",
        "PostgreSQL"
      ],
      title: "Software Engineer, Application",
      start: "Sep. 2023",
      end: null,
      description: (
        <>
          Built modular, reusable templates using an in-house CMS platform (Launchpad) for
          onboarding new insurance products, reducing setup time by 40%.
          <br />
          Co-led the development of Vulcan, an internal AI compliance tool for monitoring LLM
          responses. Implemented key frontend components, ensuring robust UI/UX and seamless API
          integration.
          <br />
          Collaborated cross-functionally with PMs and backend engineers to ship weekly iterations
          in an agile workflow.
        </>
      )
    },
    {
      company: "Big Data",
      link: undefined,
      badges: ["React.js", "Next.js", "React Query", "MUI"],
      title: "Frontend Engineer, Saas",
      start: "Jul. 2022",
      end: "Sep. 2023",
      description: (
        <>
          Led the development of Fanti Insights, a Facebook fan page analytics dashboard for
          marketers. Architected and implemented the entire frontend from scratch, launching v1.0
          within 3 months.
          <br />
          Refactored two legacy flagship platforms (DailyView and KEYPO) into scalable
          component-based systems, cutting average page load by 30%.
        </>
      )
    },
    {
      company: "LNT Intelligence",
      link: undefined,
      badges: ["jQuery", "SASS", "Flask"],
      title: "Software Engineer, Dashboard",
      start: "Jul. 2021",
      end: "Jul. 2022",
      description: (
        <>
          Built and maintained custom dashboards using FineReport, integrating real-time sensor data
          (air quality, humidity, brightness, etc.) to monitor and visualize environmental
          conditions.
          <br />
          Developed a hospital queuing system from scratch, working across the full stack to handle
          patient flow logic and UI display.
          <br />
          Collaborated with hardware teams to ensure accurate data pipeline from sensors to
          dashboards.
        </>
      )
    },
    {
      company: "Acusense",
      link: undefined,
      badges: ["TensorFlow", "Machine Learning", "Python"],
      title: "ML Intern, Embedded System",
      start: "Jun. 2020",
      end: "Aug. 2020",
      description: (
        <>
          Developed machine learning models for wearable dialysis monitoring, predicting critical
          conditions like hypotension with 95% accuracy in lab simulations.
          <br />
          Built end-to-end pipeline from data preprocessing to TensorFlow inference.
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
      title: "Portfolio (Page), Application",
      techStack: ["Next.js", "ShadcnUI", "Turborepo", "PostgreSQL", "GitHub Actions", "Vercel"],
      description:
        "Designed and built a monorepo-structured portfolio with server components, responsive layouts, and animated UI interactions. Integrated type-safe API routes and server-side auth logic.",
      link: {
        label: "site.erichandsen.dev",
        href: "https://site.erichandsen.dev"
      }
    },
    {
      title: "Buen Camino, CMS Editor",
      techStack: ["Next.js", "ShadcnUI", "PostgreSQL", "GitHub Actions", "Vercel"],
      description:
        "A full-stack journaling app for Camino de Santiago hikers, featuring map interactions, shell markers, media uploads, and secure authentication. Supports real-time diary editing, responsive layouts, and custom backend for user content and permissions.",
      link: {
        label: "buen-camino.erichandsen.dev",
        href: "https://buen-camino.erichandsen.dev"
      }
    }
  ]
} as const;
