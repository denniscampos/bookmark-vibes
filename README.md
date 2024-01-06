# Bookmark Vibes

A place to track your bookmarks on twitter. Although you can track bookmarks for anything, the intent is to track and keep your bookmarks on twitter organized.

## Tech Stack

- Next.js
- Shadcn ui / Tailwind
- Supabase
- Zod form validation
- React Hook Form

## Getting Started

1. Create a `.env` file.

2. Sign up for [supabase](https://www.supabase.com) to generate the following credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

3. Create client credentials with [Google Cloud Console](https://console.cloud.google.com/)

```bash
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
```

Take a look at `.env.example` for any env not listed above.

Run
`pnpm install`

Start the server
`pnpm dev`
