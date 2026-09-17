# Payload CMS embedded in Next.js, hosted on Vercel with Neon and Vercel Blob

Ramos Store needs an admin surface for managing Jerseys and updating Order Request status, but as a single-seller, low-volume store (see ADR-0001), running a separate CMS service alongside the storefront would add operational cost out of proportion to its scale. We run Payload CMS 3 natively inside the same Next.js app (App Router) rather than as a standalone service, and deploy the whole thing — storefront, admin panel, and Payload's API routes — as one app on Vercel, backed by Neon (Postgres) for data and Vercel Blob for Jersey images. The Order Request collection lives in the same Payload instance as the Jersey catalog, so the seller updates order status from the same admin panel used to manage Jerseys, instead of a separate internal tool.

## Considered Options

- Payload as a separate service (e.g. on Railway or Render) talking to the Next.js frontend over an API — rejected: two deploys, two bills, and an API boundary to maintain for no benefit at this scale.
- MongoDB, Payload's other first-class database adapter — rejected in favor of Postgres/Neon because the catalog's relations (Jersey → Club → League, Jersey → Fit Line, Order Request → Jerseys) are naturally relational.

## Consequences

- Vercel's filesystem is ephemeral, so Jersey images must go through a cloud storage adapter (Vercel Blob) rather than local disk.
- Storefront and admin scale and deploy together; there's no way to scale or redeploy one without the other.
