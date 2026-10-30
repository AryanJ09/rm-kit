// Hand-written from Figma "Filters" (Filter in bottomsheet, Empty filter, Filter overlay pattern). Not generated: edit this file directly.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BottomSheet, BottomSheetContent, BottomSheetTrigger } from "@/rm-style/ui/bottom-sheet"
import { Button } from "@/rm-style/ui/button"
import { ChipGroup, ChipGroupItem } from "@/rm-style/ui/chip"
import { Separator } from "@/rm-style/ui/separator"
import { Skeleton } from "@/rm-style/ui/skeleton"

type SheetState = "default" | "applied" | "loading"

// Spacing from Figma: sheet padding 20, every child 12 apart, chips 6 apart in a row (8 in a wrapping set).
const todaysFocus = ["Maturities Due", "Re-KYC due", "Birthdays today", "Large debits/credits"]
const products = [
  "3P India Equity Fund-1",
  "ICICI Prudential Contra",
  "Kotak India Focus Portfolio Investment Approach",
  "Abakkus Diversified Alpha Approach",
  "Abakkus Flexi Edge Fund",
  "Karma Capital Jasmine Fund",
  "AlfAccurate Budding Beast",
  "AlfAccurate GEMS",
  "ICICI Prudential PIPE",
]
const risk = ["Secure", "Conservative", "Moderate", "Growth", "Aggressive"]

function Group({
  label,
  options,
  multiple = false,
  value,
  wrap = false,
}: {
  label: string
  options: string[]
  multiple?: boolean
  value: string[]
  wrap?: boolean
}) {
  return (
    <div className="flex flex-col gap-(--spacing-inline-md)">
      <span className="text-(length:--font-size-sm) text-text-primary">{label}</span>
      <ChipGroup
        key={value.join()}
        multiple={multiple}
        defaultValue={value}
        aria-label={label}
        className={wrap ? "gap-(--spacing-inline-sm)" : undefined}
      >
        {options.map((o) => (
          <ChipGroupItem key={o} value={o}>{o}</ChipGroupItem>
        ))}
      </ChipGroup>
    </div>
  )
}

const summary = (text: string) => <span className="text-(length:--font-size-helper) text-text-primary">{text}</span>

// Body between the two dividers. Loading swaps the groups for three skeleton lines.
function SheetBody({ state, expanded = false }: { state: SheetState; expanded?: boolean }) {
  if (state === "loading") {
    return (
      <div className="flex flex-col gap-(--spacing-inline-md)">
        <Skeleton className="h-(--size-icon-3xs) w-full rounded-(--radius-sm) bg-surface-disabled" />
        <Skeleton className="h-(--size-icon-3xs) w-full rounded-(--radius-sm) bg-surface-disabled" />
        <Skeleton className="h-(--size-icon-3xs) w-(--size-160) rounded-(--radius-sm) bg-surface-disabled" />
      </div>
    )
  }
  const applied = state === "applied"
  return (
    <>
      <Group label="Contacted in current cycle" options={["Contacted", "Not Contacted"]} value={applied ? ["Not Contacted"] : []} />
      <Group label="Client View" options={["Only Heads", "All CRN"]} value={["Only Heads"]} />
      <Group label="Today's Focus" options={todaysFocus} multiple wrap value={applied ? ["Maturities Due"] : []} />
      {expanded ? (
        <>
          <Group label="Products" options={products} multiple wrap value={[]} />
          <Group label="Financial Risk profile" options={risk} multiple wrap value={[]} />
        </>
      ) : (
        <>
          {summary("Products · No product filters selected")}
          {summary("Financial Risk profile · All categories")}
        </>
      )}
    </>
  )
}

const footer = (state: SheetState) => (
  <>
    <Button variant="secondary">Reset</Button>
    <Button loading={state === "loading"} loadingLabel="Applying…">Apply</Button>
  </>
)

// Static copy of the sheet, drawn as a card, to show each Figma state.
function SheetCard({ state, expanded }: { state: SheetState; expanded?: boolean }) {
  return (
    <div className="flex w-(--size-layout-frame-width) max-w-full flex-col gap-(--spacing-inline-md) rounded-(--radius-2xl) border-(length:--border-width-default) border-border bg-card p-(--spacing-group)">
      <div className="flex items-center justify-between">
        <span className="text-(length:--font-size-base) font-(--typography-heading-md-font-weight) text-text-primary">Filter Clients</span>
        <span aria-hidden className="text-text-tertiary">×</span>
      </div>
      <Separator />
      <SheetBody state={state} expanded={expanded} />
      <Separator />
      <div className="flex gap-(--spacing-inline-md) *:flex-1">{footer(state)}</div>
    </div>
  )
}

const meta = {
  title: "RM Kit/Filter/Sheet",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <SheetCard state="default" /> }
export const Applied: Story = { render: () => <SheetCard state="applied" /> }
export const Loading: Story = { render: () => <SheetCard state="loading" /> }

// Figma "Empty filter": shown in the list when no client matches.
export const Empty: Story = {
  render: () => (
    <div className="flex w-(--size-layout-frame-width) max-w-full flex-col items-start gap-(--spacing-inline-md) rounded-(--radius-2xl) border-(length:--border-width-default) border-border bg-card p-(--spacing-section-sm)">
      <span className="text-(length:--font-size-base) font-(--typography-heading-md-font-weight) text-text-primary">No clients match these filters</span>
      <span className="text-(length:--font-size-helper) text-text-primary">Try removing a filter or searching by name or CRN.</span>
      <Button variant="secondary">Reset filters</Button>
    </div>
  ),
}

// The real component: opens from the bottom over the page, with the token overlay behind it.
export const Interactive: Story = {
  parameters: { layout: "fullscreen" },
  render: function Render() {
    const [state, setState] = React.useState<SheetState>("applied")
    return (
      <div className="p-(--spacing-group)">
        <BottomSheet>
          <BottomSheetTrigger render={<Button variant="secondary">Filters</Button>} />
          <BottomSheetContent
            title="Filter Clients"
            description="Choose client filters."
            footer={
              <>
                <Button variant="secondary" onClick={() => setState("default")}>Reset</Button>
                <Button onClick={() => setState("applied")}>Apply</Button>
              </>
            }
          >
            <SheetBody state={state} expanded />
          </BottomSheetContent>
        </BottomSheet>
      </div>
    )
  },
}

// Figma "Filter overlay pattern": the page dims behind the sheet, "Clients" heading on top.
export const Overlay: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="mx-auto flex w-(--size-layout-frame-width) max-w-full flex-col gap-(--spacing-stack-lg) bg-(--overlay-color) pt-(--spacing-stack-lg)">
      <span className="px-(--spacing-inline-md) text-(length:--font-size-base) font-(--typography-heading-md-font-weight) text-primary-foreground">Clients</span>
      <SheetCard state="applied" expanded />
    </div>
  ),
}
