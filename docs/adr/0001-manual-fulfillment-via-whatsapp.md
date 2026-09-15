# Manual fulfillment via WhatsApp instead of online checkout

Ramos Store has no payment gateway, no live stock tracking, and no customer accounts: instead of a traditional checkout, the Cart is converted into a pre-filled WhatsApp message, and the seller confirms availability, delivery, and payment manually in conversation. This was chosen because the store is a single-seller, small-scale shop where integrating payments, shipping, and inventory would add cost and complexity out of proportion to its volume, and WhatsApp is already the seller's primary customer-communication channel.

## Consequences

- No Jersey ever shows "out of stock" — availability is confirmed after the fact, off-platform.
- The Order Request saved before redirect is for the seller's own sales tracking only; it has no bearing on actual payment or fulfillment until its status is manually updated.
- Adding a real checkout later (payments, live stock, delivery selection) means introducing all three from scratch, not incrementally extending an existing partial flow.
