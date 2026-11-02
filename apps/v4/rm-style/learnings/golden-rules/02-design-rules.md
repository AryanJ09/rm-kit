# Design rules

How a component should look and behave. Three groups: components, layout, composition.

## Components

### D1. Figma is the spec; every state in Figma is a story

Each variant and state in Figma appears in a story, laid out the way Figma lays it out (for chips: Removable False/True by Default, Selected, Hover, Disabled). A state that cannot be forced (hover) is drawn with its own colours.

### D2. Core component first, patterns second

A chip is the core component. Filter, tab, dropdown trigger and removable (applied filter) are patterns built from it, shown in a `Patterns` story. Give the core component the props (`icon`, `onRemove`, `dropdown`, `selectable`, `variant`, `size`), not one component per pattern.

### D3. Close and remove icons

Shown only when they mean something. A chip's close icon appears only while the chip is selected (an applied filter), never on an off chip. Its centre sits on the label's centre line, and it takes the same colour as the label and icon; on hover only the icon colour changes (no background).

### D4. One colour per tone

In a tone (alert info, success, warning, error) the icon, title, description and close icon share one colour, and the surface is the tone's own subtle surface.

### D5. Hover, selected, focus

Hover only when Figma defines it. Where it does exist (dropdown rows, chips), hover and keyboard focus look the same as the selected state so the menu has one highlight, not three. Disabled uses the disabled text and surface roles and no pointer events.

### D6. Variants are named for their role

`primary` / `secondary` (Tabs), `info` / `success` / `warning` / `error` (Alert), `mobile` / `desktop` (Application shell). Keep an old name working through a small mapping rather than breaking callers (`line` and `default` still map to Tabs `primary` and `secondary`).

### D7. Icons

Icons inherit `currentColor`, sit on the icon size roles (`--size-icon-sm` 16, `--size-icon-md` 20) and are centred with their label by flex alignment, not by offsets.

### D8. Stories carry no annotations

A story shows the component, not captions about the component. No "selected: X" labels, no placeholder paragraphs beyond what the component needs to be seen.

## Layout

### D9. Mobile is the primary layout

`mobile` is the default variant of anything responsive (the application shell). Desktop is the variant.

### D10. Navigation by device

- Mobile: hamburger (always present) opens the sidebar as a sheet; the bottom navigation exists only here.
- Desktop: persistent sidebar; no bottom navigation, no hamburger.
- The variant, not the browser width, decides which. (`SidebarProvider mobile` forces the sheet behaviour.)

### D11. Sidebar behaviour

- Expanded: Figma panel, items, dividers inset by the panel padding.
- Collapsed: an icon rail. Items become centred squares of the control size, labels hidden, dividers narrower by the same inset, no toggle.
- Collapsed + pointer over it: it opens over the page (the page does not shift). A click inside pins it open. The toggle collapses it and it stays collapsed until the pointer leaves and returns.

### D12. The application shell owns the chrome

Header, navigation and the single scrolling content area belong to the shell; a screen supplies only content.
- One `header` (banner) outside the single `main`; labelled `nav` landmarks; a skip link first.
- Workspaces (Customer / Employee): two as a segmented control (secondary Tabs), three or more as a dropdown, at the top of the sidebar so mobile has it inside the menu.
- The shell can be `framed`: border, radius and elevation, on a neutral canvas (`--muted`), so it reads as a device. Turn `framed` off for a real full-screen app.

### D13. Spacing rhythm comes from Figma, written in roles

Read the spacing from the Figma auto layout and write it as roles: sheet padding `--spacing-group` (20); every child 12 apart (`--spacing-inline-md`); label to its chips 12; chips 6 apart in a row (`--spacing-stack-2xs`) and 8 in a wrapping set (`--spacing-inline-sm`).

### D14. Containers

A sheet docks to its edge; a panel is centred or anchored to its trigger. Overlays use `--overlay-scrim`, never an ad-hoc dim. A dismissable overlay has one close control, not two (the mobile sidebar sheet hides the sheet's own close icon).

## Composition

### D15. Compose, do not fork

Build bigger things from kit parts. The application shell is Sidebar + BottomNavigation + Tabs + Chip + DropdownMenu + Avatar + Badge + Button. When a part needs a different look in one place, pass a class (with a comment) rather than copying the part.

### D16. Selection and removal state

Demo state lives in the story or the parent (`useState`), and the component stays controlled or uncontrolled by prop (`activeItem`, `defaultActiveItem`), as Tabs, BottomNavigation and the shell do.

### D17. Semantics and accessibility ride with the design

`role="alert"` for error and warning, `role="status"` for info and success; a labelled name on every icon-only button (`aria-label`); `aria-current` on the active destination; a visible focus ring from `--focus-ring-width`.

### D18. Where a token is missing, say so

Using a role from another domain (an alert using `--category-*`) is allowed to avoid inventing a token, but note it in the hand-over so the owner can rename or add the role later.

### D19. One menu look for every option list

Any popup that lists options or actions takes its look from `rm-style/ui/menu.ts` (panel, row, selected, destructive, label, separator, shortcut). Dropdown menu, Context menu, Menubar, Select, Combobox and Command already do; a new menu-like component imports the same constants instead of writing its own classes. Change the menu look in `menu.ts` once and all of them follow.
- A single choice is shown by the filled row, not a tick. A multiple choice (checkbox row) keeps its tick.
- The field Dropdown and the Date picker panel use it too (`dropdownPanelClassName` is built on `menuPanelClass`). A single choice is a filled row; a multiple choice is a filled row with a tick at the end.
- A component with its own Figma spec for its option list may override the row look in its own file, and says so in a comment.

### D20. A dropdown menu opens from a chip, and that chip always has the dropdown chevron

Non-negotiable. The trigger for a dropdown menu is `DropdownMenuChipTrigger`: a chip with the dropdown variant (chevron after the label) that is not a toggle. Neither the chevron nor the non-toggle behaviour can be turned off through that component. `DropdownMenuTrigger` is only for a trigger that is not a chip (an avatar, an icon button).

### D21. All form controls share one height scale

Input, Search, Dropdown (field), Date picker, Select, Native select, Input group, Combobox, Textarea and Button use the same heights: sm (`--size-control-sm`), md (`--size-control-md`, the default) and lg (`--size-control-lg`). They import `rm-style/ui/control.ts` (`controlSize`, `controlMinSize`, `controlShellClass`), so a new control gets the scale and the field look from there, and a mix of controls in one form lines up. A control that can grow (textarea, tag input) uses the same scale as a minimum height.
**Check.** Open a form story (Field demo) and compare the control heights: they must be equal for the same `size`.

### D22. The primary action sits at the right, last

In any action row (a form footer, a dialog or sheet footer, an empty state) the primary button is the last child and sits at the right: secondary actions first (Cancel, Reset, Import), primary last (Submit, Save, Create, Apply). The order in the DOM is the order on screen, so keyboard order matches. Form footers use `FieldActions` (`rm-style/ui/field.tsx`), which right-aligns its children with the spacing role. A vertical stack (a login card) is the only exception: primary on top.
**Check.** Open the form story: the last button is the primary one and its right edge meets the form's right edge.

### D23. A popup opens below its trigger, never over it

Select, dropdown menu, combobox and the date picker open below the control with a small gap (`sideOffset`, 4). `SelectContent` sets `alignItemWithTrigger` to false (the library default slides the list over the trigger to line up the selected row). If there is no room below, the library flips it above; it must not cover the trigger.
**Check.** Open the popup and compare the popup top with the trigger bottom (positioner top = trigger bottom + gap). The browser preview pane pauses the enter animation, so read the positioner, not the animated popup, when measuring.

### D24. Close and clear icons work on their own

A close or clear icon always does its job without the story or the caller wiring it up: the Search clear icon empties the field, a Chip's close icon removes the chip, an Alert's close icon dismisses the alert. Each still tells the caller (`onClear`, `onRemove`, `onDismiss`) so a parent that owns the state can react. A demo whose close icon does nothing is a bug.

### D25. A dropdown chevron turns half a turn when its menu opens

Every control that opens a list with a chevron (dropdown field, select, combobox, a chip with the dropdown variant) turns the chevron 180° while the list is open and turns it back on close, with a smooth transition (`--motion-duration-normal`). Do not swap two icons.

### D26. A searchable dropdown searches in the field, not in the list

When a dropdown is searchable, pressing the field turns it into the search: the text becomes an input, a clear icon appears before the chevron, and typing filters the list below. The list has no search box. The field keeps the dropdown shape (the field radius), not the pill of the Search component. Arrow keys move the highlight, Enter picks, Escape closes, and the clear icon empties the text (then the selection if nothing is typed).

### D27. Filled option rows are rounded and merge

A hovered or selected option row has at least the small radius (`--radius-sm`, 4px). Rows that touch (hover next to selected, or several selected) square the touching corners so they read as one shape with one outer radius. This lives in `menuRowClass` (`rm-style/ui/menu.ts`), so every option list gets it.

### D28. Sheet and drawer footers are rows too

`SheetFooter` and `DrawerFooter` are right-aligned rows like every other action row (D22): secondary first, primary last.

### D29. Select and Combobox are variants of Dropdown, not components of their own

A dropdown field has three variants (`variant` prop on `Dropdown`). They share the label, helper, state, size and the menu look, and they differ in how a person chooses:

| Variant | You press / type | Chooses | Search | Groups |
|---|---|---|---|---|
| `default` | press the field, a list opens | one, or several (`mode="multiple"`) | optional, in the field (`searchable`) | no |
| `select` | press the field, a list opens | one value | no | yes (`group` on an option) |
| `combobox` | type in the field | one, or several as chips | always | no |

Use `select` for a plain "choose one" form field, `combobox` when there are many options or people know what they want to type, and `default` for a short fixed list or when several can be picked. `rm-style/ui/select.tsx` and `combobox.tsx` stay as the building blocks of those variants and are not shown as separate components in the kit.

### D30. Every card is an archetype

Rule: a card is one of eight archetypes: six in `rm-style/ui/cards.tsx` (StatCard, SummaryCard, TaskCard, ItemCard, PersonCard, GroupCard) and two in `rm-style/ui/chart-cards.tsx` (TrendCard, AllocationCard), picked with [03-card-catalog.md](03-card-catalog.md) and filled with data props. The `Card` shell takes no `className` or `style`, so its look cannot drift. A need no archetype covers becomes a new prop or archetype in the catalog first, never a one-off card. Custom work of any kind still uses semantic roles only (B3).
Why: the same requirement given twice produced two different cards. Data props leave no layout choices to guess.
Check: `node scripts/check-rm-rules.mjs` flags any import of `@/rm-style/ui/card` outside the kit's card files.
