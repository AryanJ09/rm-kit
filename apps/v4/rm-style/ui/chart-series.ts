export type ChartSeries = {
  label: string
  colour?: string
  token?: string
}

const series: Record<string, ChartSeries> = {
  deposits: { label: "Deposits", colour: "var(--chart-deposits)", token: "deposits" },
  ca: { label: "CA", colour: "var(--chart-deposits)", token: "deposits" },
  sa: { label: "SA", colour: "var(--chart-savings)", token: "savings" },
  td: { label: "TD", colour: "var(--chart-term)", token: "term" },
  investments: { label: "Investments", colour: "var(--chart-investments)", token: "investments" },
  equity: { label: "Equity", colour: "var(--chart-investments)", token: "investments" },
  fixedIncome: { label: "Fixed income", colour: "var(--chart-fixed-income)", token: "fixed-income" },
  altFixedIncome: { label: "Alternate fixed income", colour: "var(--chart-alternate)", token: "alternate" },
  cash: { label: "Cash", colour: "var(--chart-cash)", token: "cash" },
  assets: { label: "Assets", colour: "var(--chart-assets)", token: "assets" },
  insurance: { label: "Insurance", colour: "var(--chart-insurance)", token: "insurance" },
  equityAllocation: { label: "Equity allocation", colour: "var(--chart-wealth-equity)", token: "wealth-equity" },
  fixedIncomeAllocation: { label: "Fixed income allocation", colour: "var(--chart-wealth-fixed-income)", token: "wealth-fixed-income" },
  bookDeposits: { label: "Deposits", colour: "var(--chart-deposits)", token: "deposits" },
  bookAssets: { label: "Assets", colour: "var(--chart-book-assets)", token: "book-assets" },
  bookInvestments: { label: "Investments", colour: "var(--chart-book-investments)", token: "book-investments" },
  bookInsurance: { label: "Insurance", colour: "var(--chart-book-insurance)", token: "book-insurance" },
  homeLoan: { label: "Home loan", colour: "var(--chart-6)" },
  lap: { label: "LAP", colour: "var(--chart-7)" },
  personalLoan: { label: "Personal loan", colour: "var(--chart-8)" },
  life: { label: "Life", colour: "var(--chart-9)" },
  health: { label: "Health", colour: "var(--chart-10)" },
  general: { label: "General", colour: "var(--chart-6)" },
}

export const getChartSeries = (key: string) => series[key]
export const getChartSeriesColorIndex = (key: string) => {
  const index = Object.keys(series).indexOf(key)
  return index < 0 ? undefined : index
}
export const getChartSeriesLabel = (key: string) => series[key]?.label ?? key
export const getChartSeriesColor = (key: string, fallback: string) => series[key]?.colour ?? fallback
