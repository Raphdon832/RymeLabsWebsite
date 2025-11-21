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
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_UPLOAD_PRESET`

Restart the dev server after updating environment variables.

> **Admin credentials**: create a Firebase service account (Firebase console → Project Settings → Service accounts) and generate a new private key. Set `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, and paste the private key into `FIREBASE_ADMIN_PRIVATE_KEY`, replacing real newlines with `\n`.

## Authentication & Dashboard

- Firebase Authentication is initialized in `src/lib/firebase.ts`.
- Global auth state is provided through `src/context/AuthContext.tsx`.
- The login/register experience lives at `/auth/login`.
- Authenticated users can access the starter dashboard at `/dashboard`.
- The site header now surfaces quick access to Login/Dashboard depending on session state.
- Admins can always hit `/auth/login` directly; once Firebase auth resolves, `dashboard/layout.tsx` guards routes and instantly redirects them into `/dashboard` (or back to their requested path) while exposing sign-out controls in both the sidebar and top header for mobile.

## Project Intake Flow

- The `/start-project` wizard now runs on React Hook Form for validation, progress gating, and submission.
- The API persists data to Firebase Firestore using the Admin SDK (`projectIntakes` collection).
- Dashboard pages consume this data through `useProjectIntakes`, so new inquiries appear in the overview pipeline and the projects table immediately.
- Intake rows can be advanced or removed via `/api/projects/[id]` `PATCH`/`DELETE`, keeping the CRM loop entirely in-dashboard.
- Admins can update an intake's stage/status from `dashboard/projects`; the UI calls `PATCH /api/projects/:id`, which writes back to Firestore.

## Messaging, Files, & Analytics

- `/api/messages` + `useMessages` back the `dashboard/messages` experience for async collaboration per intake.
- File uploads use Cloudinary via `/api/uploads`, so set `CLOUDINARY_CLOUD_NAME` + `CLOUDINARY_UPLOAD_PRESET` before attaching artifacts to a message.
- `/api/analytics` aggregates Firestore data and powers the new `dashboard/analytics` charts (Chart.js via `react-chartjs-2`).

## Admin Management

To promote a user to admin status, you can either:

1.  **Manually in Firebase Console:** Go to Firestore Database -> `users` collection -> find the user document -> change `role` field to `"admin"`.
2.  **Via API:** Send a POST request to `/api/admin/promote`:

```bash
curl -X POST http://localhost:3000/api/admin/promote \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "secret": "rymelabs-master-key"}'
```

Set `ADMIN_SECRET` in your `.env` file to secure this endpoint.

## Project Structure

- `src/app`: Contains the application source code.
- `public`: Static assets.

## Deployment

Deploy on [Vercel](https://vercel.com) for the best experience.
