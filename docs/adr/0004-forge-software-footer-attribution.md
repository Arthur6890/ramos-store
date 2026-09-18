# Forge Software attribution stays in the footer

Forge Software built this site, and the footer carries a "Powered by Forge Software" credit —
their icon mark (`public/forge-icon.png`, not the full logo with slogan, so it doesn't
compete with the Ramos Store brand) next to the text, linking to
`https://forgesoftwarebrasil.vercel.app/` in a new tab. This isn't decorative filler a future
redesign can drop for being unexplained: it's the agency's attribution for building the site.

## Consequences

- Forge's logo assets are white-only art (confirmed by pixel inspection — solid `#FFFFFF` at
  varying opacity), so they only read correctly on a dark surface. The footer's dark background
  is load-bearing for this, not just a stylistic bookend with the hero.
- Any future footer redesign must keep the Forge Software credit and its dark background, or
  find another way to make the mark legible.
