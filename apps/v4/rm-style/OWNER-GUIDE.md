# RM style: owner guide

## The one file you edit
`rm-style/theme.css`. Three sections, top to bottom:

1. **Primitives** (`--ds-color-*`, `--ds-spacing-*`, `--ds-radius-*`, `--ds-typography-*`, `--ds-elevation-*`). Your raw values. Change a value here and everything that points at it follows.
2. **Semantic roles** (`:root`, shadcn names such as `--primary`, `--border`, `--sidebar`). Each one points at a primitive. "Primary is brand-600" lives here.
3. **Scale redirects** (`@theme inline`). Tailwind's sizes (spacing, text, radius, shadow, blur, tracking, fonts) point at your primitives.

Structure never changes. Only values change.

## Adding a component later
1. Install it (shadcn writes it to `components.json`'s `ui` folder).
2. Check its roles: `node scripts/check-rm-tokens.mjs` (once built) lists any role the component uses that `theme.css` does not define. Add those roles to section 2, pointing at a primitive.
3. Preview it in Storybook at port 6010.

No component file needs editing. New components inherit RM values through the roles.

## Current test status
| Component | Result |
|---|---|
| Popover | Matches RM values |
| Dialog | Save button follows the brand primitive |
| Tabs | Follows the neutral primitive |
| Select | Follows the neutral primitive |
| Tooltip | Follows the neutral primitive |

Brand-only components (Dialog's button) respond to a brand change. Neutral-only components respond to a neutral change.

## Open items
- Hover states: CSS-only, can't be forced in a story. Check by moving the pointer.
- Monospace font: shadcn's Kbd and code use one. It points at Roboto for now, because you asked for Roboto only.
- Ring widths: shadcn sets some rings in pixels (for example 3px). Snapped values are listed in the component notes.
