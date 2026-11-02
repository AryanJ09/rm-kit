// Hand-written. The Counter is an RM Kit component: a number on a corner, beside a label, or on a card.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BellIcon } from "lucide-react"

import { Button } from "@/rm-style/ui/button"
import { Counter } from "@/rm-style/ui/counter"
import { GroupCard, SummaryCard } from "@/rm-style/ui/cards"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"

const meta = {
  title: "RM Kit/Counter",
  component: Counter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { count: 4, max: 99, tone: "muted", showZero: false },
  argTypes: {
    count: { control: { type: "number", min: 0 }, description: "The number. Zero hides it unless showZero is on." },
    max: { control: { type: "number", min: 1 }, description: "Above this reads as max+ (99+)." },
    tone: { control: "inline-radio", options: ["default", "alert", "muted"], description: "muted (the default): grey, most counts. default: ink. alert: an overdue or unread count." },
    showZero: { control: "boolean" },
  },
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

/** Every control of the counter. */
export const Playground: Story = {}

/** Tones: default on a light surface, alert for an unread or overdue count, muted on a card. */
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-inline-md)">
      <Counter count={4} tone="default" />
      <Counter count={9} tone="alert" />
      <Counter count={3} tone="muted" />
      <Counter count={120} max={99} tone="alert" />
      <Counter count={0} showZero tone="muted" />
    </div>
  ),
}

/** On a button: the filter with one filter on, the bell with unread notifications. */
export const OnButtons: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-inline-lg) p-(--spacing-inline-lg)">
      <Button size="icon-md" variant="secondary" aria-label="Filter clients" count={1}>
        <BellIcon />
      </Button>
      <Button variant="secondary" count={3}>Filters</Button>
    </div>
  ),
}

/** On cards: the cues in a group header, and the item count in an accordion section. */
export const OnCards: Story = {
  render: () => (
    <div className="flex w-(--size-layout-frame-width) max-w-(--size-share-full) flex-col gap-(--spacing-inline-md)">
      <GroupCard title="Rajesh Mehra" subtitle="CRN: 56792323" initials="R" count={4} countLabel="Cues" defaultOpen>
        <SummaryCard title="Nominee update" note="No nominee recorded on the primary savings account." />
      </GroupCard>
      <Accordion variant="card" defaultValue={["family"]}>
        <AccordionItem value="family">
          <AccordionTrigger count={13}>Family details</AccordionTrigger>
          <AccordionContent>Family members appear here.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
