# Card catalog

Read this before making any card. A requirement maps to one archetype; the archetype takes data, not layout. Never compose
a new card from `Card` and slots in product code (D30), and never style a card's shell: it is locked.

Figma "Cards" is guidance only (it was extracted from an AI-built HTML prototype). The archetypes, their props and the
shared states below are the source of truth.

## 1. Pick the archetype

Go down the list; the first question that answers "yes" wins. The words in brackets are what a requirement usually says.

| # | Ask | Archetype |
|---|---|---|
| 1 | Is the main content a number or a set of numbers? (KPI, metric, total, sum, balance, AUM, amount, value, count, score, rate, percentage, growth, trend, figure, stat, summary of numbers, dashboard tile) | **StatCard** |
| 2 | Is it a number of things to do that opens a list? (tasks, to-dos, pending, due, overdue, reminders, alerts count, follow-ups, approvals, queue, inbox, action items, renewals, birthdays) | **TaskCard** |
| 3 | Is a person the subject? (client, customer, attendee, participant, contact, member, user, employee, advisor, nominee, family member, profile) | **PersonCard** |
| 4 | Is it a record someone taps to open? (product, fund, scheme, plan, document, file, listing, search result, order, transaction, offer, recommendation) | **ItemCard** |
| 5 | Does it hold other cards, opened and closed together? (group, section, folder, category, expandable list, grouped cues, accordion of cards) | **GroupCard** |
| 5b | Did a total change over time? (history, trend, growth, performance, YoY, timeline, monthly, stacked bars, movement) | **TrendCard** |
| 5c | Is a total split into parts right now? (mix, split, share, composition, allocation, breakdown by class, donut, pie, distribution) | **AllocationCard** |
| 6 | Is it rows with the same columns? (table, list of members, ledger, statement, comparison) | **Table** (not a card; rows may be compact SummaryCards) |
| 7 | Anything else: labelled facts or text about one thing (details, overview, info, profile details, callout, notice, banner, cue, nudge, insight, note, key-value row, breakdown row) | **SummaryCard** |

## 2. Fill the props

| Archetype | Props |
|---|---|
| StatCard | `metrics[]` (label, value, trend up/down/neutral, change, period), `layout: tile \| inline` |
| SummaryCard | `title`, `subtitle`, `status`, `items[]` (label, value, trend), `description`, `note`, `choices[]`, `onMore`, `tone: default \| info`, `density: default \| compact` |
| TaskCard | `count`, `title`, `text`, `icon`, `emptyText` (raised card; the colour is always the brand, only the icon changes per category) |
| ItemCard | `eyebrow`, `title`, `meta`, `tags[]`; a chevron shows when it has `onClick` |
| PersonCard | `name`, `initials`, `lines[]`, `role`, `mode: read \| edit \| removable`, `field`, `onRemove` |
| GroupCard | `title`, `subtitle`, `initials`, `count`, `defaultOpen`, children = other archetypes |
| TrendCard | `title`, `subtitle`, `tabs`, `headline`, `growth[]`, `chart` (series, points, unit, scale), `rows[]`, `footnote`; states default, loading, empty, error |
| AllocationCard | `title`, `scope`, `total`, `parts[]` (series, share, value, cost, returns, benchmark, products), `tab`, `emptyText`; states default, loading, empty |

## 3. Shared states (every archetype, same behaviour)

| Need | Prop |
|---|---|
| Whole card is a click target | `onClick` (inner buttons, chips and fields keep their own click) |
| One card picked | `selected` (several picked: a Checkbox or Radio carries it, never the card alone) |
| Not available | `disabled` |
| Waiting for data | `state="loading"` (skeleton lines) |
| No data | `state="empty"` (values show "—", TaskCard shows 0 and the all-clear text) |
| Failed | `state="error"` with `errorTitle`, `errorText`, `onRetry` |
| Value missing | leave `value` out: it shows "—" |

## 4. Badges and tone

Badge `variant` uses the category roles only: `conservative` (purple), `moderate` (blue), `growth` (orange), `aggressive`
(red), `secure`, `success`, `neutral`. A mandatory or overdue item uses `aggressive` (red). Task cards never take a colour:
the icon circle is always the brand tint, and only the icon changes (calendar, shield, cake, arrows).

## 5. When nothing fits

Stop and ask. A new need becomes a new prop on an archetype, or a new archetype, added here first. Tokens are the
semantic roles only, even for a one-off.

## Figma map (where each Figma set went)

| Figma set | Archetype and props |
|---|---|
| Client KPI strip | StatCard `layout="inline"` |
| Family summary, AUM summary, RM metric tile | StatCard `layout="tile"` |
| Task card | TaskCard |
| Product row | ItemCard |
| Advisory callout | SummaryCard `tone="info"`, `description` |
| Key-value row, Investment category row | SummaryCard `density="compact"`, `items` (with `trend`) |
| Holding summary, Meeting detail section, Meeting card, Cue row, Personal detail panel | SummaryCard |
| Meeting attendee card | PersonCard `mode` |
| Client cue group | GroupCard |
| Client family table and row | Table |
| RM breakdown row | dropped |

## 6. Cards on a hero band, and lists of items

- **Dark tile on the hero band:** `StatCard tone="inverse" layout="inline"` (a translucent dark card, white text). It is a normal card with a tone, not a separate component.
- **List of items:** put `ItemCard inList` rows inside one `ItemList`: a single white surface with an inset separator between rows. Do not stack bordered ItemCards for a list.
- **Section title:** use `SectionHeader` (uppercase title, optional action such as "View all") above a list or group.

## 7. Mobile screen patterns

A screen of the mobile application shell is an example in Storybook (`RM Kit/Patterns/Mobile`), assembled from kit
components, never a new component. Home is the first; Leads, Clients and CRM follow, one per bottom-navigation item.

| Zone | Component | Slot or prop |
|---|---|---|
| Header with greeting, bell and hamburger | `ApplicationShell` (ShellHeader) | built in |
| Summary tiles and search under the header, on the same gradient | `StatCard tone="inverse"`, `Search` | `hero` |
| Task grid | `TaskCard` in a two-column grid | children |
| Titled list | `SectionHeader` + `ItemList` of `ItemCard inList` | children |
| Empty, loading, failed | `Empty`, card `state`, `Alert` + Retry | children |
| Brand line, version, date | plain text | `footerNote` |
| Bottom navigation, central button | `ApplicationShell` | `navigation` (central button stays visible; no screen yet) |

## 8. How to add the next screen

See [../02-screen-build-order.md](../02-screen-build-order.md): the build order that Home and Clients followed.
