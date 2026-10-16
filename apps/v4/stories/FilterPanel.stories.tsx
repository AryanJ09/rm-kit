import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/rm-style/ui/button"
import { EmptyFilter } from "@/rm-style/ui/empty-filter"
import { Filter } from "@/rm-style/ui/filter"
import { type FilterGroupProps } from "@/rm-style/ui/filter-group"
import { FilterSheet } from "@/rm-style/ui/filter-panel"

// Hand-written example screen. Figma: Filter group pattern and Empty filter.
// The filters open as a bottom sheet on mobile and a side panel on desktop (same component).
// Applied filters appear as Filter pills above the results; if nothing matches, Empty filter shows.
const meta = {
  title: "Examples/Filter panel",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const FOCUS = [
  { value: "maturities", label: "Maturities due" },
  { value: "rekyc", label: "Re-KYC due" },
  { value: "birthdays", label: "Birthdays today" },
  { value: "debits", label: "Large debits/credits" },
]

const PRODUCTS = [
  { value: "3p-india", label: "3P India Equity Fund-1" },
  { value: "icici-contra", label: "ICICI Prudential Contra" },
  { value: "kotak-focus", label: "Kotak India Focus Portfolio Investment Approach" },
  { value: "abakkus-diversified", label: "Abakkus Diversified Alpha Approach" },
  { value: "abakkus-flexi", label: "Abakkus Flexi Edge Fund" },
  { value: "karma-jasmine", label: "Karma Capital Jasmine Fund" },
  { value: "alf-budding", label: "AlfAccurate Budding Beast" },
  { value: "alf-gems", label: "AlfAccurate GEMS" },
  { value: "icici-pipe", label: "ICICI Prudential PIPE" },
]

const RISK = [
  { value: "secure", label: "Secure" },
  { value: "conservative", label: "Conservative" },
  { value: "moderate", label: "Moderate" },
  { value: "growth", label: "Growth" },
  { value: "aggressive", label: "Aggressive" },
]

const CLIENTS = [
  { name: "Lakshmesh Patel", crn: "CRN 1041", focus: "rekyc", product: "icici-contra", risk: "moderate" },
  { name: "Asha Rao", crn: "CRN 1042", focus: "maturities", product: "kotak-focus", risk: "conservative" },
  { name: "Mohan Iyer", crn: "CRN 1043", focus: "birthdays", product: "alf-gems", risk: "aggressive" },
  { name: "Priya Shah", crn: "CRN 1044", focus: "debits", product: "3p-india", risk: "growth" },
  { name: "Dev Malhotra", crn: "CRN 1045", focus: "maturities", product: "karma-jasmine", risk: "secure" },
]

const ALL_OPTIONS = [...FOCUS, ...PRODUCTS, ...RISK]
const labelOf = (value: string) => ALL_OPTIONS.find((o) => o.value === value)?.label ?? value

function FilterScreen() {
  const [focus, setFocus] = useState<string[]>([])
  const [products, setProducts] = useState<string[]>([])
  const [risk, setRisk] = useState<string[]>([])

  const applied = [...focus, ...products, ...risk]
  const removeValue = (value: string) => {
    setFocus((f) => f.filter((x) => x !== value))
    setProducts((p) => p.filter((x) => x !== value))
    setRisk((r) => r.filter((x) => x !== value))
  }
  const reset = () => { setFocus([]); setProducts([]); setRisk([]) }

  const results = CLIENTS.filter((c) => {
    if (focus.length && !focus.includes(c.focus)) return false
    if (products.length && !products.includes(c.product)) return false
    if (risk.length && !risk.includes(c.risk)) return false
    return true
  })

  const groups: FilterGroupProps[] = [
    { label: "Today's focus", options: FOCUS, value: focus, onValueChange: setFocus },
    { label: "Products", options: PRODUCTS, value: products, onValueChange: setProducts },
    { label: "Financial risk profile", options: RISK, type: "single", value: risk, onValueChange: setRisk },
  ]

  return (
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <header className="flex items-center justify-between gap-(--ds-spacing-16) border-b border-border p-(--ds-spacing-16)">
        <div className="min-w-0">
          <h1 className="text-(length:--ds-typography-font-size-24) font-medium">Clients</h1>
          <p className="text-(length:--ds-typography-font-size-14) text-text-secondary">
            {results.length} of {CLIENTS.length} shown
          </p>
        </div>
        <FilterSheet groups={groups} resultCount={results.length} onReset={reset} onApply={() => {}} />
      </header>

      <main className="flex flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
        {applied.length > 0 ? (
          <div className="flex flex-wrap items-center gap-(--ds-spacing-8)" aria-label="Applied filters">
            {applied.map((value) => (
              <Filter key={value} label={labelOf(value)} onRemove={() => removeValue(value)} />
            ))}
            <Button variant="ghost" size="sm" onClick={reset}>Reset filters</Button>
          </div>
        ) : null}

        {results.length === 0 ? (
          <EmptyFilter
            action={<Button variant="secondary" onClick={reset}>Reset filters</Button>}
          />
        ) : (
          <ul className="flex flex-col divide-y divide-border rounded-(--ds-radius-16) border border-border">
            {results.map((client) => (
              <li key={client.crn} className="flex items-center justify-between gap-(--ds-spacing-12) p-(--ds-spacing-16)">
                <div className="min-w-0">
                  <p className="truncate font-medium">{client.name}</p>
                  <p className="text-(length:--ds-typography-font-size-12) text-text-secondary">{client.crn}</p>
                </div>
                <p className="text-(length:--ds-typography-font-size-14) text-text-secondary">{labelOf(client.product)}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

// Mobile: the filters open from the bottom.
export const Mobile: Story = {
  render: () => <FilterScreen />,
  globals: { viewport: { value: "mobile1", isRotated: false } },
}

// Desktop: the same filters open as a side panel.
export const Desktop: Story = {
  render: () => <FilterScreen />,
}
