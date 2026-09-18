# The official crest in public/ is the source of truth for the site's palette and imagery

The first version of this frontend used an invented palette (a card-red accent on neutral
paper) with no basis in the store's actual brand. The seller later provided the real assets —
`public/logo-oficial.png` (the official crest: pink `#E42478` and blue `#489CCC` diagonals,
roaring-lion mascots, `#242424` black base — sampled directly from the file) and
`public/marca-dagua.png` (the washed-out version already used as a watermark on the store's
Instagram posts). The site's palette, and where the logo and watermark appear, are derived from
these files, not designed from scratch. Any future visual change should start from what's in
`public/`, not introduce new brand colors.

## Consequences

- Hero and other high-impact zones use the crest's saturated colors on a dark background;
  catalog and cart stay neutral so browsing/buying isn't visually tiring — the crest sets the
  brand, it doesn't have to saturate every screen.
- Site typography (Archivo) deliberately does not imitate the crest's bubble lettering — the
  crest is the one "fun" element, the UI type stays neutral so the two don't compete.
