# MUI as the base design system, SASS Modules only for bespoke UI

Ramos Store's frontend combines a component design system (MUI) with hand-crafted visual design work (via the `frontend-design` plugin) for pages like the home and product pages. Using both without a clear split risks scattering styling across two systems with no single source of truth. MUI is the default for components and theming — colors, typography, buttons, form fields, grid — and SASS Modules is reserved for bespoke visual sections that MUI's theming can't express well (home hero, product cards, catalog layout). MUI is the source of truth; SASS Modules is the deliberate exception, not a parallel system.

## Considered Options

- Styling everything through SASS Modules alone, resetting MUI's Material theme entirely — rejected because it means rebuilding form and accessibility primitives MUI already provides, for no benefit on the pages that don't need bespoke visual treatment.
