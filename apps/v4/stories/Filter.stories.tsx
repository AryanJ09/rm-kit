import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Filter } from "@/rm-style/ui/filter"
import { Button } from "@/rm-style/ui/button"

// Hand-written: an applied filter is a Chip in its selected look with a remove control.
const meta = {
  title: "RM Kit/Atoms/Filter",
  component: Filter,
  args: { label: "Re-KYC due" },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Filter>

export default meta
type Story = StoryObj<typeof meta>

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <div className="flex flex-wrap items-center gap-(--ds-spacing-8)">
        <Filter label="Re-KYC due" size="sm" onRemove={() => {}} />
        <Filter label="Moderate" size="md" onRemove={() => {}} />
        <Filter label="Read only" size="sm" />
      </div>
    </div>
  ),
}

export const Applied: Story = {
  render: () => <AppliedExample />,
}

function AppliedExample() {
  const [filters, setFilters] = useState(["Re-KYC due", "Moderate", "Growth"])
  return (
    <div className="flex w-[430px] flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <div className="flex flex-wrap items-center gap-(--ds-spacing-8)">
        {filters.map((label) => (
          <Filter key={label} label={label} onRemove={() => setFilters((f) => f.filter((x) => x !== label))} />
        ))}
      </div>
      {filters.length === 0 ? (
        <p className="text-(length:--ds-typography-font-size-14) text-text-secondary">No filters applied.</p>
      ) : (
        <Button variant="ghost" onClick={() => setFilters([])}>Reset filters</Button>
      )}
    </div>
  )
}
