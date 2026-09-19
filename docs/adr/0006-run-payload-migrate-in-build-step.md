# Run `payload migrate` as part of `npm run build`

Nothing in the deploy pipeline used to apply pending Payload migrations automatically — a schema change (the `testimonials` collection) shipped in code while the migration itself was only ever run against local dev's database, leaving production's schema out of sync. The homepage then crashed on every real request once it started querying that missing table. `build` is now `npm run payload -- migrate && next build`, so every Vercel deploy applies pending migrations before building, making this class of bug structurally impossible instead of relying on remembering a manual step.

## Consequences

- Local `npm run build`, run after `npm run dev` (which auto-pushes schema changes for fast iteration), will hit an interactive "data loss will occur, proceed? (y/N)" prompt from Payload, since dev-mode push and formal migrations can disagree about the schema's history. This is intentional friction, not a bug — it protects against relying on push-drift in an environment that expects real migrations. Answer it explicitly (or reset the local DB) rather than piping a blind `yes`.
- Vercel's build should never hit that same prompt, since production never runs `next dev` and therefore never push-drifts. If it ever does, treat it as a signal that the production database was pointed at by a local `next dev` session at some point — that's the actual bug to fix, not something to answer through.
