# Charts: strategy, self-questions and decisions

Written before building, by asking the questions the owner would ask and answering them from the rules we already have.

## What Charts.json holds
1. **Client banking portfolio**: title, subtitle, choice chips (RV, Deposits, Investments, Assets, Insurance), a headline value,
   a three-metric growth strip, a stacked-bar chart, a divider and breakdown rows. Client (Rajesh, Jayanti) is data.
2. **Portfolio stacked-bar chart**: states Populated, Loading, No data; category (RV, Deposits, Investments, Book) is data.
3. **Portfolio chart legend item**: a square marker and a label, 13 categories (colour comes from the series).
4. **Wealth allocation donut**: states Summary, Loading, Empty; centre total, two legend rows with value and share.
5. **Wealth portfolio**: a Family or Individual scope control, tabs (Summary, Equity, Fixed income, Alternate fixed income,
   Cash). Summary shows the donut. A part shows current value, share, holding cost, returns, benchmark, and product rows.

## What already exists
`StackedBarChart` (engine, three states plus error), `chart.tsx` (shadcn chart wrapper), `chart-series.ts` (named colours),
`Chip`, `Tabs` (secondary is the pill control), `SummaryCard`, `Skeleton`, `Separator`.
Missing: a donut, and the two panels that wrap a chart with tabs, headline numbers and detail rows.

## Self-questions and answers
- **New chart component or evolve the existing one?** Evolve. The stacked bar stays as it is. A donut is new because nothing
  draws one; it uses the same wrapper, the same named colours and the same states.
- **Is each Figma panel its own component?** No. They share one pattern: a card with a title, choice chips, numbers and a
  chart. Two data-driven archetypes cover them: `TrendCard` (how a total changed over time) and `AllocationCard`
  (how a total is split right now). Client, tab and category are data, never variants.
- **Do panels follow the card rule?** Yes. A chart always sits in a card, the shell is locked, and the panels are archetypes
  in `rm-style/ui/chart-cards.tsx`. D30 now counts eight archetypes.
- **Tabs or chips?** Figma draws the tabs as pills, which is the Chip. The Family or Individual control is the existing
  secondary Tabs. Nothing new.
- **Legend item a component?** No. The marker colour is the series colour, so the legend is rendered by the chart and by a
  small row inside AllocationCard.
- **States?** Trend: default, loading, empty (No data), error. Allocation: default, loading, empty. Same prop names as every
  other archetype.
- **Where does sample data live?** In the stories, generic. Real data arrives as props. The existing `chart-data.json` feeds
  the TrendCard stories.
- **Colours?** Named chart roles only (`chart-series.ts`). The wealth equity and fixed-income golds already exist.
- **Geometry in numbers?** Recharts needs numbers (plot height, donut size). They stay as named constants in the chart
  file, like the existing stacked bar; every colour, space and text size is a semantic role.
- **Naming?** By meaning, not by screen: Trend and Allocation. The decision tree lists the words people use for each.
