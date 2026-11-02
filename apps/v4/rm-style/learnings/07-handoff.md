# RM Kit: hand-off notes

State at hand-off. Read this first; the rest of `learnings/` is history.

## What the kit is
- One folder, `apps/v4/rm-style/`: `tokens/` (primitives, semantic), `theme.css` (Tailwind mapping), `ui/` (components), `lib/`
  (`token-px`, `use-mobile`), `icons/`. Components import each other by relative path, so the folder can be copied as is.
- npm dependencies the folder needs: `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css` (see Open decisions), `cn`,
  `class-variance-authority`, `lucide-react`, `@base-ui/react`, `recharts`, `react-day-picker`, `cmdk`, `embla-carousel-react`,
  `input-otp`, `@shadcn/react`.
- Storybook has one category, **RM Kit**. Screens are *patterns* in `stories/patterns/`, built only from kit components.
  Example data (client names, product series) lives in `stories/` and `stories/examples/`, never in `rm-style/`.

## Checks (run from `apps/v4`)
| Check | Command | Result at hand-off |
|---|---|---|
| Token audit, every file in `rm-style/ui` | `node scripts/audit-tokens.mjs` | clean, 0 problems, 0 warnings |
| Rules checker | `node scripts/check-rm-rules.mjs <files>` | no findings (kit, patterns, hand-written stories) |
| Typecheck | `npx tsc --noEmit -p .` (filter `rm-style/`, `stories/`) | 0 errors |
| Production build | `npx storybook build` | passes |
| Render every story | each story loaded in a sandboxed frame, error display checked | 301 of 301 render, 0 errors |
| Story titles | no duplicates; only RM Kit, Tokens, Examples, Good to know categories | clean |
| Imports | nothing in `rm-style/` imports outside `rm-style/` (except npm packages) | clean |

`typecheck:kit` (`tsc -p tsconfig.kit.json`) reports 13 errors, all in `examples/base/*` (shadcn's stock demos importing
`CardContent` and `CardAction`, which the RM Card does not have). None are in `rm-style/` or `stories/`. They were failing before
this work; left alone because they are shadcn's files.

## Rules the audit enforces
- No `--ds-*` primitive in a component. No component-named token or utility (`--sidebar-*`, `text-card-foreground`).
- No raw colour, px, palette class, Tailwind scale number, literal opacity step or literal animation step. Zero, `full` and
  structural keywords are the only literals allowed.
- `semantic.css` is the contract. Components were changed to fit it; it was not renamed.

## Screens covered (prototype routes)
home, clients, leads, cases, client360, caseDetail, leadDetail, rmSop (profile with Portfolio and SOP), aiCoach (Kompanion),
filterOverlay (Clients filter), leadsFilter, casesFilter, addLeadCapture, tasks, drawer (shell menu), rmPortfolio, formKit (Forms).
All 17 have a story. Cases, Case detail and Lead detail use sample data shaped from the prototype's labels.

## New or extended this round
- `Matrix` (new), `Steps` (new).
- `Progress`: `size`, `tone`, `valueLabel`, `markers` (Target and Cap flags, edge-aware).
- `Tabs`: `appearance` (`filled` or `soft`). `StatCard`: `title`, `children`, metric `tone`. `CardStatus`: `icon`.
- Roles added: share (half, three-quarters, third, full, max), panel widths, opacity hidden and full, motion none, swipe, distance,
  enter scale, line-height none.

## Open decisions (need the owner)
1. **Navy.** The prototype's main goal bars are dark navy. No semantic role is navy; the nearest is `--primary-pressed`. Bars use
   brand blue. Add a role if an exact match matters.
2. **Combobox, Select, Popover** are still shadcn-derived (they pass the audit). Their look is not yet the RM panel look the way
   the Hover card now is, and tooltip and dropdown-menu are the same. They are used by `dropdown.tsx` and `date-picker.tsx`.
3. **`shadcn/tailwind.css`** is still imported in `theme.css`. The kit uses its `data-open`, `data-closed`, `data-checked`,
   `data-disabled` (and similar) variants about 160 times, plus `no-scrollbar`, `scroll-fade`, `shimmer` and the accordion
   keyframes. To remove the import, copy those definitions into `theme.css`.
4. **Storybook aliases** in `.storybook/main.ts` map shadcn's old import paths to the kit and one to shadcn's base card. Needed only
   for the stock demo stories.
5. 16 near-shadcn files (similarity 0.6 to 0.9) and 4 stock files (`carousel`, `collapsible`, `message-scroller`, `separator`)
   remain. They are tokenised; decide whether to rebuild them as RM-native.

## Revert points
- Tag `pre-cleanup-2026-11-02` and branch `backup/pre-cleanup-2026-11-02` at commit `fdf322f`, before any shadcn deletion.
- Everything is committed to `main` locally. Nothing is pushed.
