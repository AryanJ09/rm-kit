# Prototype vs RM kit: delta report

Source: `Latest prototype-v2.0.0-27-Oct.html` (Private Banking v2.0.0, 27 Oct). Analysis only; nothing is built from it yet.
Legend for the "Kit" column: **Have** (exists in RM kit, use as is), **Extend** (exists, needs a prop or variant),
**Rework** (exists only as stock shadcn, needs the RM pass), **New** (nothing close; smallest new piece named).

## 1. How the prototype is made
- A Figma Make export: one HTML file with a React 19 bundle, shadcn components on Radix, Tailwind, recharts (charts),
  vaul (bottom sheets), sonner (toasts) and motion (transitions).
- One in-memory router with 16 views: home, clients, client360, leads, leadDetail, addLeadCapture, leadsFilter,
  filterOverlay (client filter), cases, caseDetail, casesFilter, tasks, rmSop, rmPortfolio, aiCoach, drawer (menu).
- In this build several are switched off and show a "Coming soon" toast: Tasks, My portfolio, Client map, RM playbook,
  the Leads filter and Add lead; CRM and Leads look disabled in the bottom navigation. Their code is still in the bundle,
  so their design is readable (section 5).
- Its own token layer: about 240 `--color-*`, `--space-*`, `--corner-*` variables, many component-specific
  (`--color-auth-bg`, `--color-map-accent`, `--color-avatar-1..5`), plus 146 arbitrary `[Npx]` values and 24 hex colours
  in the screen code. The RM kit's semantic roles replace all of these; nothing from its token file should be copied.
- shadcn parts it uses (by `data-slot`): accordion, alert-dialog, avatar, badge, button, card, chart, dialog, drawer,
  input, input-group, label, native-select, popover, separator, sheet, skeleton, switch, table, tabs, textarea, toggle,
  toggle-group. Tooltip and toast are its own (sonner for toasts; a hand-made bubble for tooltips).

## 2. Screens and what they hold
| Screen | Contents |
|---|---|
| Home | Red hero with a large faded brand mark; greeting bar (avatar, bell, hamburger); two dark tiles (CRN + RV with trend arrow, Provisional SOP score, tappable); "Search by CRN"; six task cards (2 x 3) with differently tinted icons; "PRODUCTS" list (title, type tag, description, risk tags, chevron); footer note. On scroll the hero collapses into a compact red bar with avatar and metric pills (CRN, RV, SOP). |
| Menu (hamburger) | Left sheet: back + "Menu" title, profile (avatar, name, role · branch, id), items with tinted icon circles and a count badge (Tasks 1), a disabled group (Notifications, Settings, Help, Sign out), "DEMO TOOLS" section, version line. |
| Clients | Large page title, search + round primary filter button (with count badge when filtered), removable filter chip, "CLIENTS (n)" label, client rows in one surface: avatar, name, Auth badge, CRN, Head and "Family of n" tags, last-contacted line or an alert line ("Overdue · 31 Aug 2026"), or "n products available". Task cards and product rows open this list pre-filtered. |
| Client filter | Bottom sheet with handle, title + close, sections (Individual CRN, Family view), chip groups, helper text, sticky Reset / Apply. |
| Client 360 | White inside-page bar (back, "Name · CRN"); profile card (avatar, age, tags, location, status badges with dot, segment tag, meetings count, last contacted); 3-metric strip with dividers and an info tooltip; AI insight callout (gradient, sparkle icon); Cues / Profile segmented tabs. **Cues**: Members/Products switch, expandable member cards with cue rows (mandatory row with accent border + badge, product rows with "..." actions). **Profile**: Wealth Portfolio (Family/Individual switch, chips, donut, legend with value and %), Banking Portfolio (chips, headline, growth strip with dividers, stacked bars with a "(Peak)" label), then accordion cards: Personal details (key-values + link chips), Family details (Auth/Non-Auth switch, sortable table), Recent transactions (amount + in/out arrow), Service activations (status badges), Service requests (initials, SR number, priority, dates, channel, status, Escalated), Off-us relationships (key-values). |
| Cue actions | Bottom sheet "Actions": an AI-highlighted first row (gradient, star), then icon rows (Pitch, Brochures, Calculators). |
| Leads | Large title + "+ Add lead" text action; search + filter button; rows: name, "contact · type · **amount** · id", product line, stage badge (New, Qualifying, Offer, Won, Dropped) with a mini progress bar. |
| Lead detail | White bar; "LEAD PROGRESS" step list (active step highlighted, later steps locked with a reason); Documents folder row with count; Mark won (green outline) and Drop lead; "ASK KOMPANION" action list (AI row highlighted, icon rows); Remarks with Edit and "View activity log". |
| Kompanion (central button) | Chat: title bar, message bubbles with avatars and timestamps, AI sparkle avatar, composer with agent selector chip, attach and round send. |
| RM Portfolio | Profile summary (name, total CRNs, total AUM), Portfolio composition trend (stacked bars, no value labels), Asset allocation (donut, 2-column legend), Client distribution by tier (labelled horizontal bars), Revenue & growth (key-value list with dividers, green change). |
| Toasts | Dark pill at the bottom centre with a green success icon ("Demo data added", "Coming soon"). |

## 3. Atomic components: prototype vs kit
| Prototype element | Kit | Closest kit piece | What to do |
|---|---|---|---|
| Tooltip (holding "CA/SA/TD") | **Rework** | `tooltip.tsx` (stock, "Components/Tooltip") | RM pass: dark small bubble, semantic roles, story under RM Kit. |
| Toast (dark pill, success icon) | **Rework** | `sonner.tsx`, `toast.tsx` (stock) | RM pass on sonner only: inverse surface, success icon, bottom centre above the nav. |
| Popover | **Rework** | `popover.tsx` (stock) | Only if a screen needs it; the prototype mostly uses sheets. |
| Badge tones: status with dot (Re-KYC due orange, Auth green, Escalated, High, Not Active, Active, Not Reg), stage (New, Qualifying, Offer, Won, Dropped), neutral tag ("Head", "PMS", segment "wbg") | **Extend** | `Badge` (category variants, `dot`) | Map to existing category roles; add a `warning` (orange) reading and a neutral `tag` use; no new tokens unless a tone has no role. |
| Switch with labels on both sides (Family/Individual, Auth/Non-Auth, Members/Products) | **Extend** | `Switch` | Add start and end labels. Note: our AllocationCard uses segmented Tabs for Family/Individual; the prototype uses this switch. Decide one. |
| Icon button with count badge (filter "1") | **Extend** | `Button` icon size + `AvatarBadge`-style dot | A `count` on icon buttons. |
| Mini progress in a row (lead stage) | **Have** | `Progress` | Use the small size with the stage colour. |
| Sortable table header ("Name ↑") | **Extend** | `Table` (Upcoming) | Finish the RM pass and add a sort indicator. |
| Native select, input group | **Rework** | `native-select.tsx`, `input-group.tsx` (Upcoming/Forms) | Only where forms need them; prefer `Dropdown` and `Input`. |
| Toggle / toggle group | **Have** (Upcoming) | `toggle.tsx`, `toggle-group.tsx` | Move out of Upcoming when a screen uses them. |
| Device status bar (time, wifi, battery) | Skip | `ShellHeader` `time` | Prototype chrome, not product UI. |

## 4. Pattern-level components: prototype vs kit
| Prototype pattern | Kit | Closest kit piece | What to do |
|---|---|---|---|
| Hero header background (red gradient with a large faded brand mark) | **Extend** | `ApplicationShell` `hero` (plain gradient) | A background graphic slot for the hero (brand mark as an asset), still on the gradient roles. |
| Collapsing hero (compact red bar with metric pills on scroll) | **New (small)** | `ApplicationShell` `hero` | A `collapsed` slot the shell shows once the hero scrolls away. |
| Page-title header for main destinations ("Clients", "Leads" + "+ Add lead") | **Extend** | `ShellHeader` contexts | A `page` context: large title on the left, optional text action. Today we only have the red home bar and the white inside-page bar. |
| Inside-page bar (centred title, back) | **Have** (style differs) | `ShellHeader` inside-page contexts | The prototype centres the title; ours is left-aligned. Decide one. |
| Dark hero tiles (CRN/RV with arrow, SOP score, tappable) | **Have** | `StatCard tone="inverse"` | Add trend arrow and `onClick` (already supported by the shell). |
| Task cards (2 x 3, icon tint per category: red, amber, blue) | **Have** (conflict) | `TaskCard` | We decided brand-only icons; the prototype tints by category. Confirm. |
| Product list (title + type tag on the right, description, risk tags, chevron) | **Extend** | `ItemCard inList` + `ItemList` | A trailing type tag next to the title and a description line. |
| Client row (avatar, Auth badge, CRN, Head + Family tags, last contacted / alert / products line) | **Extend** | `PersonCard` | Add `inList` (rows in one surface, like ItemCard), `tags[]`, and a status badge on the right. |
| Client profile card (avatar, tags, status badges, segment tag, meetings) | **Extend** | `PersonCard` | A profile density: larger avatar, tags row, status badges, a footer section. |
| Metric strip with dividers + info tooltip | **Extend** | `StatCard layout="inline"` | Dividers between metrics and an optional info tooltip per metric (needs Tooltip). |
| AI insight callout (gradient, sparkle) | **New (tone)** | `SummaryCard tone` / `Alert` | An `ai` tone (gradient tint + sparkle) on an existing card or alert. |
| Expandable member cards with cue rows | **Have** | `GroupCard` + `SummaryCard` | Add the mandatory accent (left border) as a SummaryCard tone; "..." opens the action sheet. |
| Action sheet (AI row + icon rows) and "Ask Kompanion" list | **New (pattern)** | `BottomSheet` + `menu.ts` rows / `ItemList` | An ActionList: rows with a leading icon in a tinted circle and a chevron; first row may be the AI tone. |
| Accordion cards (Personal details, Family, Transactions, Activations, Requests, Off-us) | **Have** | `Accordion variant="card"` | Content needs the pieces below. |
| Key-value with value on the right, bold | **Extend** | `CardKeyValue` | A `spread` layout (label left, value right). |
| Link chips (Customer details, Personal info) with AI tint | **Extend** | `Chip` | An AI tint variant or reuse plain chips. |
| Transaction row (title, date, amount, in/out arrow) | **Extend** | `ItemCard inList` / `SummaryCard` with trend | A trailing amount with direction. |
| Service request row (initials, number, title, priority, dates, channel, status, Escalated) | **Extend** | `PersonCard`/`ItemCard` | Rich row: leading initials, trailing priority badge, meta lines, badges. |
| Status rows (service activations) | **Have** | `ItemList` + `Badge` | — |
| Banking Portfolio card | **Have** (details differ) | `TrendCard` | Dividers in the growth strip, a "(Peak)" annotation on a bar, chips that scroll instead of wrapping. |
| Wealth Portfolio card | **Have** (details differ) | `AllocationCard` | Switch instead of segmented scope, legend with dot, value right-aligned and muted %, four parts. |
| RM Portfolio: distribution by tier (labelled horizontal bars) | **New (small)** | `Progress` | A BarList: label, bar, value per row, built from Progress. |
| RM Portfolio: donut with 2-column legend, trend without labels | **Extend** | `DonutChart`, `StackedBarChart` | Legend layout option (grid); `showValueLabels={false}` already exists. |
| Filter bottom sheet | **Have** | `BottomSheet`, `ChipGroup`, `SectionHeader`, `FieldActions` ("RM Kit/Filter/Sheet") | — |
| Lead step list (active, locked with reason) | **New (pattern)** | `ItemList` rows / `Questionnaire` | A StepList: numbered or icon step rows with active, done and locked states. |
| Documents folder row with count | **Have** | `ItemCard inList` + `Badge` | — |
| Outcome buttons (Mark won green outline, Drop lead) | **Extend** | `Button` | A success outline tone, or keep secondary + primary. |
| Remarks with Edit + activity log link | **Have** | `SummaryCard` + link `Button` | — |
| Chat (Kompanion) | **Have / Extend** | `Message`, `MessageScroller`, `InputGroup`, `Chip` | A composer pattern: input, agent selector chip, attach, round send. |
| Toast feedback | **Rework** | `sonner` | As in section 3. |
| Menu drawer | **Have / Extend** | `Sidebar` (sheet on mobile) | Icon in a tinted circle, disabled items, section label, version footer. |
| Bottom navigation with disabled items | **Have** | `BottomNavigation`, `NavigationItem` disabled | — |

## 5. Screens in the code but switched off in this build
Readable from the bundle; no Figma yet. They reuse most pieces above.
- **Tasks**: list grouped by Today, This week, Later, Overdue, Yesterday, Earlier; "Task completed" toast. Needs group headers (SectionHeader) and task rows.
- **Cases (CRM) and case detail**: case list with search; detail with case value, "Case gates" step list (Field investigation, Documents, Consent & Bureau, Submit, Query, Disbursal; locked with reasons), contact actions (Call, Message, Email, More), remarks and activity log. Needs StepList and an action bar.
- **Log interaction**: a four-step form ("Step 1 of 4 — Interaction details" … "Notes"), Previous step, and a "Confirm submission" dialog. Needs a form-wizard pattern on Field + Dropdown + AlertDialog.
- **Meeting form**: attendee type, mode (In person, Phone call), status (Scheduled, Completed, Cancelled), date shortcuts (Today, Tomorrow, Next week).
- **Add lead**: customer type, source, product, indicative amount, warmth (Hot, Warm, Cold) with field errors, and a "Discard this lead?" dialog.
- **RM SOP**: score, QTD/MTD switch, Goals / Rankings / Nudges, Revive / Upgrade / Acquire categories, nudge cards with "+20 pts", National and Region rankings.
- **Client map**: map with zoom, recentre and pin details. Nothing in the kit; out of scope unless asked.
- **Credit assessment and offers (Kompanion)**: CIBIL / Banking table with red-amber-green dots, policy checks, likely conditions, overall assessment; offer builder chat with quick replies and an EMI calculator; document upload with parsed summary.

## 6. The two component groups
**RM kit (reworked, semantic roles):** Accordion, Alert, Alert dialog, Application shell (shell, shell header, sidebar,
bottom navigation, central button, navigation item), Avatar, Badge, Breadcrumb, Button, Card + archetypes, Chart
(stacked bar, donut, trend and allocation cards), Checkbox, Chip + group, Command, Date picker, Dialog, Drawer, Dropdown
(+ Select, Combobox variants), Dropdown menu, Empty, Field, Filter sheet, Input, Input OTP, Label, Message, Message
scroller, Metric, Progress, Questionnaire, Radio group, Scroll area, Search, Section header, Separator, Sheet, Skeleton,
Slider, Slot, Switch, Tabs, Textarea. Upcoming: Table, Toggle, Toggle group, Input group (Forms).

**Stock shadcn, not yet reworked (taken post facto):** Aspect ratio, Attachment, Bubble, Button group, Carousel,
Collapsible, Context menu, Direction, Hover card, Item, Kbd, Marker, Menubar, Native select, Navigation menu,
Pagination, Popover, Resizable, Sonner, Spinner, Toast, Tooltip (their raw values are already mapped to semantic roles;
the RM design pass and stories are not done). Of these, the prototype needs **Tooltip** and **Sonner**; Popover,
Native select and Input group only for forms.

## 7. Suggested order (reuse first)
1. Rework Tooltip and Sonner (small, used on several screens).
2. Extend existing pieces the prototype leans on most: Badge tones, Switch labels, PersonCard `inList` and profile, ItemCard type tag, CardKeyValue `spread`, StatCard dividers.
3. Shell: `page` header context, hero background graphic, collapsed hero.
4. New small patterns: ActionList, StepList, BarList, AI tone.
5. Align Trend and Allocation cards with the prototype details.
6. Screens: Leads, Lead detail, Client 360, RM Portfolio as patterns; then the switched-off screens when their designs arrive.

## 8. Decisions (answered by the owner; the prototype is the source of truth)
1. Family/Individual is a labelled **Switch**. Done: `Switch` has `startLabel`/`endLabel`; `AllocationCard` uses it for a two-option scope.
2. Task card icons are **tinted by category**. Done: `TaskCard accent` = brand, warning (amber) or info (blue). Home now shows the prototype's six cards.
3. Inside-page titles are **centred**. Done in `ShellHeader` (back left, title centred, action right).
4. Main destinations follow the prototype: a **large page title** with an optional text action and no back arrow. Done: `ShellHeader context="page"`; the Clients pattern now has it, with the search and a round filter button.
5. Mark won is a **green outline**. Done: `Button variant="success"`.

## 9. AI suggestion (added after the Figma "Ai suggestions" file)
One look, two shapes, both from existing components:
- **Note** (`Alert variant="ai"`): brand-to-accent gradient (`--primary-subtle` to `--accent-subtle`), sparkle icon in the accent colour, plain 14px text, no title needed.
- **Pill** (`Chip variant="ai"`, size sm): the same gradient, hairline brand border, plain text. Used for the profile link chips (Customer details, Personal info, Contact details).
Nearest-role notes: the Figma icon colour `#F74F55` maps to `--icon-accent`; the Figma icon is a custom three-star mark, the kit uses the Lucide sparkles icon; the gradient stops (21% and 94%) are kept as written.
Still to do from the prototype: the AI row in an action list (a gradient row with a star), and the `ai` tone on `SummaryCard` if a card needs it.

## 10. Status after the owner's round (what is done, what is not)
Done:
- Shell header is generic: `home`, `page` and `inside` contexts, a `collapsed` slot and action objects. No product names.
- Scroll collapse is wired in the shell: the hero gives way to the red compact bar with the pills. Hero has the faded brand mark.
- Counters: `Button count` (filter with one filter on). Menu Tasks count is the sidebar badge (exists).
- AI suggestion is one component, `AiSuggestion` (note, pill, row), left-aligned.
- Switch labels are props on Switch (`startLabel`, `endLabel`); the separate story is gone.
- Section header uses the RM Button for its action.
- Tooltip is RM Kit (dark, from the prototype's info tooltip); StatCard metrics take an `info` hint.
- Forms are RM Kit (Input, Textarea, Search, Dropdown, Date picker) with labels and helpers; the broken stock input-group demos are removed.
- Client 360: Cues (members with cue cards, products) and Profile (banking and wealth portfolios, then the card-variant accordion with the six sections).

Not done (next):
- Leads list, Lead detail (step list, outcome buttons, Kompanion actions), Kompanion chat, the cue action sheet.
- RM Portfolio screen, Cases and case detail, the filter sheets beyond Clients.
- Product row's type tag and the Home product list details beyond the current pattern.
- Section header as a shell-level pattern: still a component; decision to confirm.

## 11. Round: counters, accordion, pattern audit (what changed, what is still open)
Done:
- Counter is an RM Kit component (`counter.tsx`, story "RM Kit/Counter"): tones default, alert and muted; `max` reads 99+; zero hidden unless `showZero`. It is used on Button (`count`), on accordion section triggers (`count`), on group cards (`count` + `countLabel`) and on the profile meetings footer.
- Button controls: label, variant, size, icon, count, loading and disabled, in the Playground ("RM Kit/Button"). Correction: the old Button story had the same title and hid it; the old file is now "RM Kit/Button/Examples".
- Accordion (card variant): the trigger takes `count` (shown as "(n)", as in the prototype), `status` and an optional `icon`; the content holds any element. Correction: until the owner's last round, no story showed this. "RM Kit/Accordion" now has Playground, ProfileSections (the prototype's six sections, matching the screenshot) and Plain.
- Clients rebuilt to the prototype: one list with dividers, "CLIENTS (n)" title, Head and Family tags, last-contacted or alert line, Auth badge on the right, no chevrons.
- Client 360 corrected: profile tags (Head, Family, Re-KYC due with dot, Auth signatory), meetings footer with counter, metric dividers, four wealth parts with value and share, eleven service activations.
- Home: "Products" heading, product rows with the type badge on the right, description and risk tags; no invented eyebrow line.
- Leads list pattern (rows with stage tag and progress bar; `progress` prop on ItemCard).
- RM Portfolio pattern (profile summary, composition trend without value labels, asset allocation donut without chips, tier bars inside a card (SummaryCard `children`), revenue and growth).
Still open:
- Lead detail (step list, outcome buttons, Kompanion action list), the Kompanion chat, the cue action sheet, the Clients filter sheet, the Cases screens.
- The Clients heading shows the filtered count (7 in the sample), the prototype shows the full count (23).

## 12. Correction round (accordion and button)
- The record in section 11 said the accordion and the button controls were done. They were not visible: the accordion had only the old stock demo and the button playground was hidden by a duplicate story title. Both are fixed and each has a story now.
- The accordion matches the prototype's profile screenshot: no section icons; counts written as "(n)"; the key-value rows put the value on the right; recent transactions show the date under the title and an amount with a red down arrow (debit) or green up arrow (credit).
- New shared pieces for this: `CardKeyValue` lays out label left and value right; `ItemCard` takes a `trailing` slot for the amount.

## 13. Round: counter default, button controls, accordion, Kompanion, Meeting Log

- Counter default is `muted` (prototype: grey count). `default` and `alert` stay as tones.
- Button controls: the playground had stale Storybook state after HMR. Restarted Storybook; the Controls panel lists the real props. Props the playground does not expose (`asChild`, `render`, `nativeButton`, `loadingLabel`, `onClick`, `className`) are not in the argTypes, so Storybook's docgen may still list them.
- Accordion card title: prototype is Medium (500) at the 16px role, not the heading weight. The trigger row now has a 12px gap between the icon and the title (`--spacing-inline-md`). Composition story added (`RM Kit/Accordion/Compositions`): Cues rows with a menu button, key-values, chips and a switch. Nothing new is built; each block is an existing component.
- Kompanion conversation built as a pattern from `Message`, `Bubble`, `Chip`, `InputGroup`, `Button` and the inside shell header (`stories/patterns/mobile-kompanion.tsx`, story `RM Kit/Application shell/Kompanion chat`).
- Meeting Log bottom sheet built as a pattern from `BottomSheetContent` (fixed header and footer, scrolling body), `ChipGroup`, `Dropdown`, `Input`, `Textarea` (`stories/patterns/meeting-log-sheet.tsx`, story `RM Kit/Bottom sheet/MeetingLog`).
