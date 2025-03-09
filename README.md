# Ericsen's Personal Website

A modern, feature-rich personal website built with cutting-edge technologies.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: tRPC, Drizzle ORM
- **Database**: PostgreSQL (via Vercel Postgres)
- **Authentication**: NextAuth.js
- **Content Management**: Contentlayer
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion
- **Package Management**: pnpm
- **Monorepo Structure**: Turborepo

## Features

- Responsive design with dark mode support
- Interactive sections: About Me, Projects, Guestbook
- Blog with MDX support
- Dynamic content rendering
- Server-side rendering and static site generation
- Secure authentication
- Type-safe API calls with tRPC
- Optimized images and animations
- Reading timeline

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables (refer to `.env.example`)
4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

This project uses a monorepo structure with Turborepo:

### Apps

- `apps/web`: Main Next.js application
- `apps/cv`: CV/Resume application
- `apps/cds-editor`: Content Design System Editor

### Packages

- `packages/ui`: Shared UI components
- `packages/utils`: Shared utility functions
- `packages/db`: Database schema and ORM setup
- `packages/env`: Environment variable validation
- `packages/auth`: Authentication utilities and configurations
- `packages/dal`: Data Access Layer
- `packages/eslint-config`: Shared ESLint configuration
- `packages/prettier-config`: Shared Prettier configuration
- `packages/tailwind-config`: Shared Tailwind CSS configuration
- `packages/tsconfig`: Shared TypeScript configuration

## Development Tools

The project uses several development tools to ensure code quality and consistency:

- **Turborepo**: For monorepo management and build optimization
- **pnpm**: For fast, disk-space efficient package management
- **Changesets**: For version management and changelogs
- **Husky**: For Git hooks
- **Commitlint**: For conventional commit messages
- **Prettier**: For code formatting
- **ESLint**: For code linting

## Deployment

This project is configured for easy deployment on Vercel.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
