# RM Kit: owner guide

## Where to change things
| To change | Edit | Effect |
|---|---|---|
| A raw value (a brand blue, a spacing step) | `tokens/primitives.css` | Every role pointing at it follows. |
| What a role means (primary is brand-600) | `tokens/semantic.css` | Every component using the role follows. |
| Tailwind's mapping of roles | `theme.css` | Rarely. Only when a new kind of role is added. |

Structure never changes. Only values and the role-to-primitive pointers change. Components are not edited for a colour or size change.

## Adding or changing a component
Follow `learnings/08-component-lifecycle.md`: look at what exists, extend a prop before adding a component, forecast reuse, map every
value to a role, show it in Storybook, write the hand-off. A value with no role is raised to you as a gap.

## Checks
`node scripts/audit-tokens.mjs` (tokens), `node scripts/check-rm-rules.mjs <files>` (rules), `npx tsc --noEmit -p .` (types),
`npx storybook build` (build). Details in `README.md`.

## Where things stand
`learnings/07-handoff.md` is the current state: checks, screens covered, decisions, revert points.
