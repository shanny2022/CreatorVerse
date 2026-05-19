# Creatorverse

WEB103 prework app built with React, Vite, React Router, and Supabase. It supports creating, reading, updating, and deleting content creators.

## Run locally

```bash
npm install
npm run dev
```

## Connect Supabase

1. Create a Supabase table named `creators`.
2. Add columns:
   - `name` text
   - `url` text
   - `description` text
   - `imageURL` text
3. Copy `.env.example` to `.env`.
4. Add your Supabase project URL and anon key.

The app includes five starter creators. When Supabase is connected and the table is empty, the app seeds them automatically.
