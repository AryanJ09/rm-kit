// Example data, not part of the design system. Your product's series labels and colours live here, and the
// stories and patterns pass them into the charts as `seriesMeta`. The kit itself names no product series.
import type { SeriesMeta } from "@/rm-style/ui/stacked-bar-chart"

export const productSeries: SeriesMeta = {
  deposits: { label: "Deposits", colour: "var(--chart-deposits)" },
  ca: { label: "CA", colour: "var(--chart-deposits)" },
  sa: { label: "SA", colour: "var(--chart-savings)" },
  td: { label: "TD", colour: "var(--chart-term)" },
  investments: { label: "Investments", colour: "var(--chart-investments)" },
  equity: { label: "Equity", colour: "var(--chart-investments)" },
  fixedIncome: { label: "Fixed income", colour: "var(--chart-fixed-income)" },
  altFixedIncome: { label: "Alternate fixed income", colour: "var(--chart-alternate)" },
  cash: { label: "Cash", colour: "var(--chart-cash)" },
  assets: { label: "Assets", colour: "var(--chart-assets)" },
  insurance: { label: "Insurance", colour: "var(--chart-insurance)" },
  equityAllocation: { label: "Equity allocation", colour: "var(--chart-wealth-equity)" },
  fixedIncomeAllocation: { label: "Fixed income allocation", colour: "var(--chart-wealth-fixed-income)" },
  bookDeposits: { label: "Deposits", colour: "var(--chart-deposits)" },
  bookAssets: { label: "Assets", colour: "var(--chart-book-assets)" },
  bookInvestments: { label: "Investments", colour: "var(--chart-book-investments)" },
  bookInsurance: { label: "Insurance", colour: "var(--chart-book-insurance)" },
  homeLoan: { label: "Home loan", colour: "var(--chart-6)" },
  lap: { label: "LAP", colour: "var(--chart-7)" },
  personalLoan: { label: "Personal loan", colour: "var(--chart-8)" },
  life: { label: "Life", colour: "var(--chart-9)" },
  health: { label: "Health", colour: "var(--chart-10)" },
  general: { label: "General", colour: "var(--chart-6)" },
}
