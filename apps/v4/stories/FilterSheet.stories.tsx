import { useState } from "react"
import { Button } from "@/rm-style/ui/button"
import { Filter } from "@/rm-style/ui/filter"
import { FilterGroup, FilterGroupItem } from "@/rm-style/ui/filter-group"
import { Separator } from "@/rm-style/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/rm-style/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/rm-style/ui/tabs"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Check, X } from "lucide-react"

const meta = {
  title: "RM Kit/Filter",
  parameters: { layout: "centered" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

// Filter is the kit’s toggle-based selection primitive; FilterGroup is its toggle-group base.
const groups = {
  "Today's Focus": [
    "Maturities Due",
    "Re-KYC due",
    "Birthdays today",
    "Large debits/credits",
  ],
  Products: [
    "Mutual funds",
    "Fixed deposits",
    "Insurance",
    "Bonds",
    "PMS",
    "AIF",
    "Structured products",
    "Loans",
    "Other",
  ],
  "Risk profile": ["Conservative", "Moderate", "Aggressive"],
} as const

type FilterGroup = keyof typeof groups

function FilterChip({
  label,
  selected,
  onToggle,
  removable = false,
}: {
  label: string
  selected: boolean
  onToggle: () => void
  removable?: boolean
}) {
  return (
    <Filter
      pressed={selected}
      onPressedChange={onToggle}
      className="border-control-stroke-default text-text-secondary data-[state=on]:bg-primary-subtle disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled h-auto min-h-(--size-control-sm) rounded-(--radius-pill) border bg-transparent px-(--spacing-inline-md) py-(--spacing-inline-sm) text-(length:--typography-label-sm-font-size) font-medium hover:border-primary hover:bg-background hover:text-primary data-[state=on]:border-primary data-[state=on]:text-primary"
    >
      {label}
      {removable && selected && (
        <X className="ml-(--spacing-stack-2xs) size-(--size-icon-sm)" />
      )}
    </Filter>
  )
}

function FilterSheet() {
  const [selectedGroups, setSelectedGroups] = useState<FilterGroup[]>([
    "Today's Focus",
  ])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "Re-KYC due",
  ])
  const [selectionMode, setSelectionMode] = useState<
    Record<FilterGroup, "single" | "multiple">
  >({
    "Today's Focus": "multiple",
    Products: "multiple",
    "Risk profile": "single",
  })
  const [contacted, setContacted] = useState("Contacted")
  const [clientView, setClientView] = useState("Only Heads")
  const [applied, setApplied] = useState(false)
  const toggleGroup = (group: FilterGroup) =>
    setSelectedGroups((current) =>
      current.includes(group)
        ? current.filter((x) => x !== group)
        : [...current, group]
    )
  const toggleFilter = (filter: string) =>
    setSelectedFilters((current) =>
      current.includes(filter)
        ? current.filter((x) => x !== filter)
        : [...current, filter]
    )
  const reset = () => {
    setSelectedGroups([])
    setSelectedFilters([])
    setContacted("")
    setClientView("")
    setApplied(false)
  }

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary">Filters</Button>} />
      <SheetContent
        side="bottom"
        className="mx-auto max-h-(--viewport-sheet-max-height) w-full max-w-(--size-layout-frame-width) gap-(--spacing-inline-md) overflow-y-auto rounded-t-(--radius-2xl) p-(--spacing-inline-xl)"
      >
        <SheetHeader className="flex-row items-center justify-between space-y-0 p-0">
          <SheetTitle className="text-(length:--typography-title-md-font-size)">
            Filter Clients
          </SheetTitle>
          <SheetDescription className="sr-only">
            Choose client filters.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <FilterTabs
          label="Contacted in current cycle"
          value={contacted}
          onValueChange={setContacted}
          options={["Contacted", "Not Contacted"]}
        />
        <FilterTabs
          label="Client View"
          value={clientView}
          onValueChange={setClientView}
          options={["Only Heads", "All CRN"]}
        />
        {selectedGroups.map((group) => (
          <FilterChoice
            key={group}
            label={group}
            onRemove={() => {
              toggleGroup(group)
              setSelectedFilters((current) =>
                current.filter((filter) => !groups[group].includes(filter))
              )
            }}
          >
            <FilterGroup
              multiple={selectionMode[group] === "multiple"}
              value={
                selectionMode[group] === "single"
                  ? (selectedFilters.find((filter) =>
                      groups[group].includes(filter)
                    ) ?? "")
                  : selectedFilters.filter((filter) =>
                      groups[group].includes(filter)
                    )
              }
              onValueChange={(value) => {
                const next = Array.isArray(value) ? value : value ? [value] : []
                setSelectedFilters((current) => [
                  ...current.filter((x) => !groups[group].includes(x)),
                  ...next,
                ])
              }}
              className="flex-wrap"
              spacing={8}
            >
              {groups[group].map((filter) => (
                <FilterGroupItem
                  key={filter}
                  value={filter}
                  aria-label={filter}
                  className="border-control-stroke-default text-text-secondary data-[state=on]:bg-primary-subtle h-auto min-h-0 rounded-(--radius-pill) border bg-background px-(--spacing-inline-md) py-(--spacing-inline-sm) text-(length:--font-size-xs) data-[state=on]:border-primary data-[state=on]:text-primary"
                >
                  {filter}
                  {selectedFilters.includes(filter) && (
                    <X className="ml-(--spacing-stack-2xs) size-(--size-icon-sm)" />
                  )}
                </FilterGroupItem>
              ))}
            </FilterGroup>
          </FilterChoice>
        ))}
        <Separator />
        <div className="flex justify-between gap-(--spacing-inline-md)">
          <Button variant="secondary" className="flex-1" onClick={reset}>
            Reset
          </Button>
          <Button className="flex-1" onClick={() => setApplied(true)}>
            {applied ? (
              <>
                <Check className="size-(--size-icon-sm)" /> Applied
              </>
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function FilterTabs({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: string[]
}) {
  const tabValue = value || "__none__"
  return (
    <section className="flex flex-col gap-(--spacing-inline-sm)">
      <h3 className="text-text-primary text-(length:--typography-label-md-font-size) font-medium">
        {label}
      </h3>
      <Tabs
        value={tabValue}
        onValueChange={(next) => onValueChange(next === "__none__" ? "" : next)}
      >
        <TabsList className="h-auto flex-wrap rounded-none bg-transparent p-0">
          {options.map((option) => (
            <TabsTrigger
              key={option}
              value={option}
              className="border-control-stroke-default text-text-secondary data-active:bg-primary-subtle h-auto min-h-(--size-control-36) rounded-(--radius-pill) border bg-background px-(--spacing-inline-md) py-(--spacing-inline-sm) text-(length:--font-size-xs) data-active:border-primary data-active:text-primary"
            >
              {option}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </section>
  )
}

function FilterChoice({
  label,
  children,
  onRemove,
}: {
  label: string
  children: React.ReactNode
  onRemove?: () => void
}) {
  return (
    <section className="flex flex-col gap-(--spacing-inline-sm)">
      <div className="flex items-center justify-between">
        <h3 className="text-text-primary text-(length:--typography-label-md-font-size) font-medium">
          {label}
        </h3>
        {onRemove && (
          <button
            type="button"
            aria-label={`Remove ${label} filter group`}
            className="text-text-secondary"
            onClick={onRemove}
          >
            <X className="size-(--size-icon-sm)" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-(--spacing-inline-sm)">{children}</div>
    </section>
  )
}

export const BottomSheet: Story = { render: () => <FilterSheet /> }
