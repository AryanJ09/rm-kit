# Hand-off plan: closing the RM kit

**Status: phases 1 to 4 done (see `07-handoff.md` for results and open backlog). Phase 5 is v2.**

State when the plan was written: committed on `main` locally (nothing pushed). Checks green (token audit, rules, `tsc`, production build, 301 stories).
Revert point: tag and branch `pre-cleanup-2026-11-02`. What is left is decisions, one rebuild, and packaging.

## Phase 1: owner decisions (blocks the rest)
| # | Decision | Options | My recommendation |
|---|---|---|---|
| D1 | Navy for the goal bars (the prototype's `--color-brand-navy`; no semantic role matches) | add a role / keep brand blue | add one generic role so the bars match; this is the only role change in the plan |
| D2 | Combobox, Select, Popover, tooltip, dropdown-menu still use shadcn's look | rebuild on the RM panel look (as the hover card) / ship as is | rebuild; they sit under the Dropdown and Date picker the app uses |
| D3 | `shadcn/tailwind.css` still imported (~160 variant uses) | copy the needed variants into `theme.css` / keep the import | copy them; it is the last shadcn dependency in `rm-style/` |
| D4 | 16 near-shadcn files and 4 stock files (`carousel`, `collapsible`, `message-scroller`, `separator`) | rebuild RM-native / accept as tokenised | accept as tokenised for v1, list as backlog |
| D5 | Storybook aliases to shadcn paths | remove with the stock demos / keep | remove once the demos are gone |

## Phase 2: close the gaps (after D1 to D5)
1. Add the navy role (primitives and semantic together), point the goal bars at it. Regenerate token data.
2. Rebuild combobox, select, popover, tooltip, dropdown-menu on `menuPanelClass`; update stories.
3. Move the `shadcn/tailwind.css` variants into `theme.css`; delete the import; run the production build.
4. Fix the soft spots found this round: `sm` and `xs` inline attachment icon width.

## Phase 3: verification before release
1. Full gates from a clean checkout: token audit, rules checker, `tsc`, production build, render every story, duplicate titles, imports.
2. Visual diff: all 17 prototype screens against their stories (screenshots side by side); log differences.
3. Consume test: copy `rm-style/` into a bare Vite app with only its npm dependencies and render one component. This proves the "nothing outside the folder" rule.
4. Accessibility pass on the form and sheet components (focus, labels, keyboard).

## Phase 4: packaging for developers
1. A developer README in `rm-style/`: what is inside, the dependency list, the CSS import order (`primitives`, `semantic`, `theme`), how to add a component.
2. Trim `OWNER-GUIDE.md` and `07-handoff.md` to current state; keep `learnings/` as history.
3. Publish the Storybook (static build) so developers browse the kit and the Tokens trace.
4. Tag `rm-kit-v1.0.0`; write release notes from `07-handoff.md`.

## Phase 5: after release
Build the lifecycle skill (`08-component-lifecycle.md`): manifest script first, then `SKILL.md`.

## Not in scope
The 13 `typecheck:kit` errors in `examples/base/*` (shadcn demo files, failing before this work).

## Order and ownership
Phase 1 is yours; phases 2 to 4 are mine and need about one session each, in order. Push and tag only on your go.
