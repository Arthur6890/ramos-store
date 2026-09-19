# Vercel Blob store must be public access

Club logos and Jersey images are served to anonymous storefront visitors via plain `<img src>` URLs — there is no auth on read. A Blob store created with private access rejects the `@payloadcms/storage-vercel-blob` plugin's public uploads outright ("Cannot use public access on a private store"), which took the homepage/admin uploads down in production while working fine locally (local dev falls back to disk, bypassing Blob entirely). Vercel Blob stores cannot change access mode after creation — recovering required creating a new public store, reconnecting `BLOB_READ_WRITE_TOKEN`/`BLOB_STORE_ID` to it, and deleting the old private one.

## Consequences

- Any new Blob store for this project must be created with `access: public`. If a store ever needs to hold something not meant for public display, it belongs in a separate, deliberately private store — never toggle the existing one, since that's not possible after creation anyway.
