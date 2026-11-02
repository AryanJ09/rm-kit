# Build rules

Strict. A component is not done until every rule here holds.

## B1. Values come from `semantic.css` only

**Rule.** Every colour, size, space, radius, type size, weight, border, shadow, motion and z-index in a component comes from a role in `rm-style/tokens/semantic.css`. Never from a primitive (`--ds-*`), never from a literal.

**Why.** Primitives are the raw palette; roles are the decisions. A component that points at a primitive skips the decision, so changing a role does not reach it.

**Check.** `node scripts/check-rm-rules.mjs <file>` reports `primitive` and `not in semantic.css`.

## B2. No component tokens

**Rule.** Do not add `--chip-*`, `--sidebar-*`, `--alert-*` or any role named after one component. Reuse an existing role. If nothing fits, use the nearest role and report the gap to the owner; the owner decides whether a role is added.

**Why.** Component tokens multiply (a new one per component) and drift apart. The `--sidebar-*` roles that exist are the original shadcn roles, not additions.

**Check.** `grep -E "^\s*--(sidebar|chip|filter|alert)-" rm-style/tokens/semantic.css` should show only the original shadcn sidebar roles.

## B3. No raw values, no Tailwind scale defaults

**Rule.** No `p-3`, `gap-2`, `text-sm`, `font-bold`, `rounded-md`, `h-8`, `size-4`, `ring-2`, `shadow-md`, plain `border`, no hex, no `px`/`rem` literal. Use the role through Tailwind's variable syntax.

| Need | Use |
|---|---|
| Padding and gaps | `p-(--spacing-inline-md)`, `gap-(--spacing-stack-2xs)`; none: `--spacing-none` |
| Heights and widths | `h-(--size-control-44)`, `size-(--size-icon-md)`, `w-(--size-layout-frame-width)` |
| Radius | `rounded-(--radius-md)`, `--radius-2xl`, `--radius-pill` |
| Text size | `text-(length:--font-size-xs)` (the `length:` hint matters, see B4) |
| Text weight, line height | `font-(--typography-title-sm-font-weight)`, `leading-(--line-height-xs)`, or the whole composite: `--typography-label-md-*` |
| Border width | `border-(length:--border-width-default)` |
| Focus ring | `ring-(length:--focus-ring-width)` |
| Shadow | `shadow-(--elevation-card)` / `--elevation-popover` |
| Motion | `duration-(--motion-duration-fast)` |
| Layer | `z-(--z-index-top)` |
| Opacity of a role | `bg-info/[calc(var(--opacity-subtle)*100%)]` |

**Allowed layout resets** (they are not design values): `flex`, `grid`, `flex-1`, `min-w-0`, `w-0`, `w-auto`, `size-full`, `h-full`, `h-svh`, `inset-0`, `left-0`, `right-0`, `top-1/2`, `-translate-x-1/2`, `overflow-*`, `truncate`.

**Why.** Raw values look right and silently stop following the system. Each of these was found in a first draft and replaced.

**Check.** The checker. Finished components must report "No findings."

## B4. Tailwind variable syntax has traps

- `text-(--x)` is read as a colour. A size needs `text-(length:--x)`. A colour from a variable that Tailwind cannot guess needs `bg-(color:--x)`.
- A border width needs `border-(length:--border-width-default)`; plain `border` is a raw 1px.
- Negative offsets: `-top-(--spacing-stack-3xs)`.
- A library's own collapsed or state classes can win. Beat them with `!` and a comment saying which rule is being overridden. Use it rarely.
- `calc()` inside a class must be valid CSS: spaces around `+` are added for you, but an unknown function such as `(--spacing(4))` makes the whole rule disappear without an error.

## B5. Match Figma exactly, otherwise say so

**Rule.** Look up each Figma value in the semantic roles. Exact match: use it. No exact match: use the nearest role, and list the difference in the hand-over note (value in Figma, role used, role value).

**Why.** Examples from the build: Figma warning text `#9B5B00` has no role (nearest `--category-growth-text`); sidebar width 300 has no role (`--size-288` was used); header height is 48 in your tokens against 64 in the OneDLS reference. The owner must see these, not discover them.

**Check.** The hand-over note names every non-exact match.

## B6. Code is master

Figma changes to match code, not the other way round. Where `Figma-token map.md` and Figma disagree, the code value wins. The base font is Roboto even when Figma shows Inter.

## B7. Build only what Figma shows

**Rule.** No invented variants, states, labels, annotations or demo furniture. If a state is missing in Figma (hover, a vertical orientation, a removable chip in Default), do not add it. Ask first.

**Why.** Each of these was removed after being added: a vertical Tabs option, "Cues content" labels under the tabs, "Page content" text, a hover colour on the sidebar items, a removable chip in states Figma does not define.

## B8. Compose from the kit

**Rule.** If a kit component exists, use it: Avatar, Badge, Button, Chip, Tabs, Sidebar, DropdownMenu, BottomNavigation. Do not redraw it.

**Why.** The application shell reuses Sidebar, BottomNavigation, Avatar, Badge, Button, Tabs and Chip. The first sidebar draft drew its own avatar and was corrected.

## B9. Stories

- Hand-written story: no `// Generated by` header, so the generator skips it.
- Title `RM Kit/<Name>`. `RM Kit/Upcoming/<Name>` is only for components still being developed; a finished component moves out. Also add it to `RM_KIT` in `scripts/gen-rm-stories.mjs` (and remove it from `UPCOMING`).
- Every prop that changes the look has an `argTypes` control. A `Playground` story uses them, and a Figma story shows each state as Figma lays it out.
- A demo must really work. A remove button removes, a selection selects. No empty handlers.
- Shared demo content lives in `stories/support/`, not copied between stories.
- Preview window sizes use `globals: { viewport: { value, isRotated } }` (Storybook 10) and carry `// rules-allow`.

## B10. Verify in the browser before saying done

1. Restart Storybook after adding Tailwind classes; stale CSS shows old widths and missing rules.
2. Measure settled values (computed style, bounding boxes), not a screenshot taken mid-transition. The preview pane throttles animations when hidden.
3. Click and hover for real. Test the interaction, not just the picture.
4. Run the checker.
5. State what was not checked.

## B11. Do not commit unasked

Changes stay in the working tree until the owner says commit. Commit only the files you changed.

## Allowed literals (for reference)

Preview window sizes in stories (marked `rules-allow`). Library-set runtime variables such as `--anchor-width`, `--available-height`, `--transform-origin`, `--skeleton-width`.
