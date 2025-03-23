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
  name: "Ericsen Tsai",
  initials: "ET",
  location: "Taipei, Taiwan, CST",
  locationLink: "https://www.google.com/maps/place/Taipei",
  about:
    "Detail-oriented Full Stack Engineer focused on building high-quality web applications and AI solutions.",
  summary: (
    <>
      Frontend-focused Full Stack Engineer specializing in React applications, AI integration, and
      healthcare technology solutions. Experienced in modern web development with expertise in
      Next.js, React Query, and TailwindCSS.
    </>
  ),
  avatarUrl: "https://avatars.githubusercontent.com/u/90230992?v=4",
  personalWebsiteUrl: "https://site.erichandsen.dev",
  contact: {
    email: "bommer95175@gmail.com",
    tel: "+886938786158",
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
      school: "National Cheng-Kung University",
      degree: "Master's Degree in Biomedical Engineering",
      start: "2019",
      end: "2021"
    }
  ],
  work: [
    {
      company: "OneDegree",
      link: "https://www.onedegree.hk",
      badges: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
      title: "Frontend Developer",
      start: "2023",
      end: null,
      description: (
        <>
          Frontend developer working on insurance technology solutions.
          <ul className="list-inside list-disc">
            <li>
              Developed reusable templates for customer insurance journeys using Launchpad CMS tool
            </li>
            <li>Co-led the development of Vulcan Protect, an LLM protection platform</li>
            <li>Built customer-facing applications using React.js and Next.js</li>
          </ul>
        </>
      )
    },
    {
      company: "Big Data",
      badges: ["React", "Next.js", "React Query", "MUI"],
      title: "Frontend Developer",
      link: "https://big-data.com.tw/",
      start: "2022",
      end: "2023",
      description: (
        <>
          Led development of key products and system improvements.
          <ul className="list-inside list-disc">
            <li>Spearheaded the development of a Facebook fan management system from scratch</li>
            <li>Led refactoring of DailyView & KEYPO, reducing system load times by 30%</li>
            <li>Implemented scalable and modular codebases for flagship products</li>
          </ul>
        </>
      )
    },
    {
      company: "LNT Technology",
      badges: ["React", "Redux", "jQuery", "Flask"],
      title: "Software Developer",
      link: "https://lightningww.com/",
      start: "2021",
      end: "2022",
      description: (
        <>
          Developed healthcare queue management solutions.
          <ul className="list-inside list-disc">
            <li>Built advanced queue management systems for healthcare institutions</li>
            <li>Implemented solutions to improve patient flow in healthcare facilities</li>
          </ul>
        </>
      )
    },
    {
      company: "Acusense",
      badges: ["TensorFlow", "Machine Learning", "Python"],
      title: "Algorithm Development Intern",
      link: "https://www.acusense.com.tw/",
      start: "2020",
      end: "2020",
      description: (
        <>
          Developed AI algorithms for healthcare applications.
          <ul className="list-inside list-disc">
            <li>Engineered AI-integrated wearable device for hemodialysis monitoring</li>
            <li>Achieved 95% accuracy in predicting critical events like hypotension</li>
          </ul>
        </>
      )
    }
  ],
  skills: [
    "React/Next.js",
    "TypeScript",
    "React Query",
    "TailwindCSS",
    "styled-components",
    "ShadcnUI",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "TensorFlow",
    "Docker"
  ],
  projects: [
    {
      title: "Ericsen Portfolio",
      techStack: ["Next.js", "TailwindCSS", "ShadcnUI", "Turborepo"],
      description: "Personal portfolio showcasing technical expertise and achievements",
      link: {
        label: "site.erichandsen.dev",
        href: "https://site.erichandsen.dev"
      }
    },
    {
      title: "CV",
      techStack: ["Next.js", "TailwindCSS", "ShadcnUI", "Turborepo"],
      description: "CV of Ericsen Tsai",
      link: {
        label: "cv.erichandsen.dev",
        href: "https://cv.erichandsen.dev"
      }
    },
    {
      title: "Buen Camino",
      techStack: ["Next.js", "TailwindCSS", "ShadcnUI", "Turborepo"],
      description: "Camino de Santiago Diary Editor",
      link: {
        label: "buen-camino.erichandsen.dev",
        href: "https://buen-camino.erichandsen.dev"
      }
    }
  ]
} as const;
