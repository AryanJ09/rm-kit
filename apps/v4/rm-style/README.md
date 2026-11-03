# RM Kit

A token-driven React component kit for the RM mobile app. Copy this folder into a project and import the components. It
depends on no file outside the folder, only the npm packages below.

## What is inside
| Path | What it holds |
|---|---|
| `tokens/primitives.css` | Layer 1. Raw values (`--ds-*`): colours, spacing, radius, type, elevation, motion. |
| `tokens/semantic.css` | Layer 2. Roles (`--primary`, `--border-strong`, `--spacing-inline-md`, ...). Each points at a primitive. **This is the contract.** |
| `theme.css` | Layer 3. Imports the two token files and `behaviors.css`, and maps roles to Tailwind utilities. The one file an app imports. |
| `behaviors.css` | State variants (`data-open`, `data-checked`, ...) and small utilities (scroll fade, shimmer, accordion motion). |
| `ui/` | The components. `ui/application-shell/` is the shell, `ui/chip/` the chips. |
| `lib/` | `token-px` (reads a size role as pixels for chart geometry), `use-mobile`. |
| `icons/` | Glyphs that are not in lucide. |
| `learnings/` | History and decisions. Start with `07-handoff.md`. |

## Use it
```css
/* app css */
@import "./rm-style/theme.css";
```
```tsx
import { Button } from "./rm-style/ui/button"
import { Progress } from "./rm-style/ui/progress"

<Button>Save</Button>
<Progress value={64} tone="deep" valueLabel="Achieved: 64%" />
```
Tailwind scans `ui/` through the `@source` line in `theme.css`. If you add files outside it, add an `@source` for them.

## npm dependencies
`react` and `react-dom` 19, `tailwindcss` 4 (with `@tailwindcss/postcss` or the Vite plugin), `tw-animate-css`, `@base-ui/react`,
`class-variance-authority`, `cn`, `lucide-react`, `radix-ui` (button slot only), `recharts`, `react-day-picker`, `cmdk`,
`embla-carousel-react`, `input-otp`, `@shadcn/react` (questionnaire and message scroller). Versions are in `apps/v4/package.json`.

## The rules
1. **Roles only.** A component takes every value from a role in `semantic.css`. No raw px or hex, no palette class, no Tailwind
   scale number, no `--ds-*` primitive, no literal opacity or animation step.
2. **The role file is complete.** Components change to fit it. A missing role is raised as a gap, never invented inside a component.
3. **Reuse and extend.** Add a prop to an existing component before adding a variant or a component.
4. **Generic.** Banking names and example data belong in Storybook stories, never in `ui/`.
5. **Self-contained.** Imports inside the folder are relative. Nothing imports from outside it.

## Check your change
Run from `apps/v4`:
```bash
node scripts/audit-tokens.mjs
```
```bash
node scripts/check-rm-rules.mjs rm-style/ui/button.tsx
```
```bash
npx tsc --noEmit -p .
```
```bash
npx storybook build
```
`audit-tokens` reads every file in `ui/`. After changing tokens, run `node scripts/generate-token-data.mjs` to refresh the Tokens pages.

## Storybook
One category, **RM Kit**. Each component has a playground with controls, its states and use cases. Screens are patterns in
`stories/patterns/`, assembled from kit components only. **Tokens > Component trace** shows each component with the roles it
uses and the primitive each role resolves to.
