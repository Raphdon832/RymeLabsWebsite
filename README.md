# RymeLabs Website

This is the official website for RymeLabs, a tech company building the future of technology.

## Tech Stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Authentication is powered by Firebase. Copy the example file and populate it with your Firebase project credentials:

```bash
cp .env.example .env.local
```

Required values:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Restart the dev server after updating environment variables.

## Authentication & Dashboard

- Firebase Authentication is initialized in `src/lib/firebase.ts`.
- Global auth state is provided through `src/context/AuthContext.tsx`.
- The login/register experience lives at `/auth/login`.
- Authenticated users can access the starter dashboard at `/dashboard`.
- The site header now surfaces quick access to Login/Dashboard depending on session state.

## Project Structure

- `src/app`: Contains the application source code.
- `public`: Static assets.

## Deployment

Deploy on [Vercel](https://vercel.com) for the best experience.
