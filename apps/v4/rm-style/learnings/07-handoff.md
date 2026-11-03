# RM Kit: hand-off notes

State at hand-off. Read this first; the rest of `learnings/` is history.

## What the kit is
- One folder, `apps/v4/rm-style/`: `tokens/` (primitives, semantic), `theme.css` (Tailwind mapping), `ui/` (components), `lib/`
  (`token-px`, `use-mobile`), `icons/`. Components import each other by relative path, so the folder can be copied as is.
- npm dependencies the folder needs: `tailwindcss`, `tw-animate-css`, `cn`,
  `class-variance-authority`, `lucide-react`, `@base-ui/react`, `recharts`, `react-day-picker`, `cmdk`, `embla-carousel-react`,
  `input-otp`, `radix-ui` (button slot), `@shadcn/react` (questionnaire, message scroller). `README.md` in `rm-style/` has the full list.
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

## Decisions closed in the final round
1. **Navy.** The goal bars use `--chart-6` (steel navy, the nearest existing role) through `Progress tone="deep"`. No role was added.
2. **Popover, tooltip, select, combobox, dropdown-menu** now open at a role-based offset (`--spacing-inline-xs`), and Popover wears the
   shared RM panel (`menu.ts`). Select, combobox and dropdown-menu already used it.
3. **`shadcn/tailwind.css`** is gone from `theme.css`. `behaviors.css` holds the variants and utilities the kit uses.
4. **Near-shadcn files.** Tokenised and kept for v1. Files whose lines still match shadcn's source by 0.9 or more: alert-dialog,
   carousel, collapsible, dialog, drawer, empty, item, label, message-scroller, message, popover, scroll-area, separator, sheet,
   skeleton, slider, tooltip. Rebuild them as RM-native when a design asks for it.
5. **Storybook aliases** (`.storybook/main.ts`) stay: 139 stock demo stories in 22 story files import shadcn's demo files through
   them. Removing the aliases means removing those stories, a separate sweep (backlog).

## Final verification (hand-off round)
| Check | Result |
|---|---|
| Token audit | clean, 73 files (the audit used to skip `application-shell/` and `chip/`; it now walks every nested folder) |
| Rules checker | no findings on 126 files |
| `tsc` | 0 errors in `rm-style/`, `stories/`, `scripts/` (the dead `scripts/chart-sandbox` was removed: it imported deleted code) |
| Production build | passes |
| Render every story | 304 of 304 |
| Consume test | `rm-style/` copied into an empty Vite project with only npm packages builds and bundles (Button, Progress, Accordion) |
| Import boundary | no import leaves `rm-style/` |
| Accessibility (axe, serious and critical, every RM Kit story) | see below |
| Visual diff against the prototype | spot-checked: SOP and profile goals, attachment. Not a full 17-screen pixel diff. |

Accessibility findings, for the owner:
- **Colour contrast (36 stories):** mostly the placeholder and tertiary text roles (`--text-tertiary`, field placeholder: neutral-400 on white).
  That is a palette decision, so no token was changed.
- **Unnamed controls (stories):** select, combobox, dropdown and input demos render without a `Label`; icon-only buttons in some
  stories have no `aria-label`. Components accept the props; the stories omit them.
- **Fixed:** `Progress` is now named by its text label.
- **Left:** `aria-prohibited-attr` and `nested-interactive` on card shell and archetype stories, `aria-required-children` on Command and Item.

## Backlog (v1.1)
- Accessibility sweep from the list above (stories first, then placeholder contrast if the palette changes).
- Remove the 139 stock demo stories, then the aliases and `registry/bases` card alias.
- Rebuild the near-shadcn files as RM-native.
- v2: the component-lifecycle skill (`08-component-lifecycle.md`).

## Revert points
- Tag `pre-cleanup-2026-11-02` and branch `backup/pre-cleanup-2026-11-02` at commit `fdf322f`, before any shadcn deletion.
- Everything is committed to `main` locally. Nothing is pushed.
