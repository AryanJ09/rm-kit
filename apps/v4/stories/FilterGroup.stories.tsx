import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FilterGroup } from "@/rm-style/ui/filter-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/rm-style/ui/sheet"
import { Button } from "@/rm-style/ui/button"

// Hand-written: a filter group is a labelled set of Chips. Small groups stay inline; large groups move
// into a bottom Sheet, the same FilterGroup inside it.
const meta = {
  title: "RM Kit/Filter group",
  component: FilterGroup,
  args: { options: [{ value: "rekyc", label: "Re-KYC due" }] },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof FilterGroup>

export default meta
type Story = StoryObj<typeof meta>

const TODAY = [
  { value: "maturities", label: "Maturities due" },
  { value: "rekyc", label: "Re-KYC due" },
  { value: "birthdays", label: "Birthdays today" },
  { value: "debits", label: "Large debits/credits" },
]

const RISK = [
  { value: "secure", label: "Secure" },
  { value: "conservative", label: "Conservative" },
  { value: "moderate", label: "Moderate" },
  { value: "growth", label: "Growth" },
  { value: "aggressive", label: "Aggressive" },
]

export const Multiple: Story = {
  render: () => <MultipleExample />,
}

export const Single: Story = {
  render: () => <SingleExample />,
}

export const InBottomSheet: Story = {
  render: () => <InBottomSheetExample />,
}

function MultipleExample() {
  const [value, setValue] = useState<string[]>(["rekyc"])
  return (
    <div className="flex w-[430px] flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <FilterGroup label="Today's focus" options={TODAY} type="multiple" value={value} onValueChange={setValue} />
      <p className="text-(length:--ds-typography-font-size-12) text-text-secondary">{value.length} selected</p>
    </div>
  )
}

function SingleExample() {
  const [value, setValue] = useState<string[]>(["moderate"])
  return (
    <div className="flex w-[430px] flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <FilterGroup label="Financial risk profile" options={RISK} type="single" value={value} onValueChange={setValue} />
    </div>
  )
}

function InBottomSheetExample() {
  const [today, setToday] = useState<string[]>([])
  const [risk, setRisk] = useState<string[]>([])
  return (
    <div className="flex flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <Sheet>
        <SheetTrigger render={<Button variant="secondary" />}>Filters</SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow the client list.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-(--ds-spacing-24) p-(--ds-spacing-16)">
            <FilterGroup label="Today's focus" options={TODAY} value={today} onValueChange={setToday} />
            <FilterGroup label="Financial risk profile" options={RISK} type="single" value={risk} onValueChange={setRisk} />
          </div>
        </SheetContent>
      </Sheet>
      <p className="text-(length:--ds-typography-font-size-12) text-text-secondary">
        {today.length + risk.length} filters on
      </p>
    </div>
  )
}
