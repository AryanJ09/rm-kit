# How to add the next mobile screen

Learned from building Home and Clients. Do these in order and stop at the first step that already covers the need (reuse before you build).

Every screen so far came out of the same few moves, so the next one should too. Do them in this order and stop at the first
step that already covers the need (rule: reuse before you build).

1. **Frame:** `ApplicationShell` mobile. Main destinations (Home, Clients...) keep the red home bar. A page opened from a
   destination uses `insidePage` (back chevron, title; `inside-page-description` adds a description line and the plus action).
2. **Zones, top to bottom:** header (and `hero` on Home only) → search → chosen filter chips → list or cards → `footerNote`.
   The bottom navigation stays pinned; the content scrolls.
3. **Search:** `Search` with `helper` for "Loading…" and error lines. Typing filters the list live (by surname or reference);
   a chip under the search is a chosen filter and its × removes it. Nothing else filters.
4. **List rows:** a person is `PersonCard` (chevron when clickable, `notes` for a status line and an alert line). A record is
   `ItemCard`. Several records in one surface are `ItemList` rows. A number is `StatCard`; a to-do count is `TaskCard`.
5. **The same five states on every screen:** default (or populated), filtered when it applies, empty, loading, error. They
   are `state` props, not new layouts. Empty explains and offers one action (`SummaryCard action`, e.g. "Reset filters");
   error is the red `Alert` plus one "Try again" button; loading is skeleton rows, with the search showing its own helper.
6. **Form inputs:** `Input`, `Textarea`, `Search`, `Dropdown` and `Date picker` all take `label` and `helper` (one shared
   `FieldShell`), so a helper looks the same everywhere.
7. **Story:** one story per screen with a `state` control and a `footerNote` toggle, one all-states grid, and the screen
   joins the interactive phone.
8. **If something is missing:** extend the existing component with a prop (a card gains a tone, a header a context, an
   input a helper). Do not make a new component, and use semantic roles only.
