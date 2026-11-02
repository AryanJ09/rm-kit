# The journey: cards to mobile screens

## What happened, in order
1. **Cards.json had 20 patterns.** Each looked different, but most differed only in content. We found they fold into six
   archetypes (Stat, Summary, Task, Item, Person, Group) on one shell.
2. **Rebuilding was the real problem.** The same requirement given twice produced two different cards. The fix was not a
   bigger Figma file but fewer choices: a locked shell (no `className`), data props instead of layout, and a decision tree.
3. **Figma is guidance, not truth.** It came from an AI-built HTML prototype. Where Figma and the owner's intent differ,
   the owner and the catalog win (for example: pressed tint, mandatory = red, one standard shell).
4. **Cards keep evolving.** The hero tiles turned out to be cards (an `inverse` tone). The client row turned out to be a
   person card (chevron, notes). A product list turned out to be rows in one surface (`ItemList`). Each time we extended
   an existing component instead of adding one.
5. **Screens are patterns, not components.** Home and Clients are Storybook examples assembled from the kit. The shell gained
   slots (`hero`, `footerNote`, `insidePage`) so screens vary by what fills them, not by new shells.
6. **Form inputs got one wrapper.** Helper text existed on Dropdown and Date picker only. One shared `FieldShell` now serves
   Input, Textarea, Search, Dropdown and Date picker.

7. **Charts followed the same path.** A donut was the only missing engine; the two panels became two data-driven archetypes
   (TrendCard, AllocationCard) instead of one component per Figma panel. Strategy: `04-charts-strategy.md`.
8. **A whole-kit sweep for hardcoded values.** The checker now covers margins, z-index and durations; 450 findings in the
   stock components were mapped to semantic roles with no visual change (every mapped value is equal). Where no role
   matched exactly the nearest role was used and reported. Colour maths (oklch, color-mix) was replaced by roles.

## Mistakes worth remembering
- Deleting stories without asking (Select, Combobox). Ask before removing anything the owner can see.
- Building before "go". Present the plan and questions first, then wait.
- Claiming something is organised when the Storybook sidebar does not show it. Check what the owner will actually see.
- Previewing a phone in a container shorter than the phone, which clipped the bottom navigation. Give every phone its
  standard size (430 by 932).
- Misreading "dedicated panel": I turned the white inside-page bar red, then it had to come back. The Figma bar is white and
  full width; the mistake was an inset wrapper that made it look like a separate floating panel. When a word is unclear,
  restate it and ask, then check Figma's width and position before changing the look.

## What stuck
- Reuse first; extend with a prop; new component only with the owner's go.
- Semantic tokens only, custom work included; a new generic role goes into primitives and semantics together.
- Same states everywhere: default, loading, empty, error (plus filtered where it applies).
- One folder for one system: the application shell parts live in `rm-style/ui/application-shell/` and in Storybook under
  `RM Kit / Application shell`.
