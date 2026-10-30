// Hand-written. Not generated: edit this file directly.
// The six card archetypes (rm-style/ui/cards.tsx). Every card in a product is one of these, picked with
// rm-style/golden-rules/03-card-catalog.md and filled with data props.
import * as React from "react"
import { ArrowLeftRightIcon, CakeIcon, CalendarDaysIcon, ShieldCheckIcon } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Chip } from "@/rm-style/ui/chip/chip"
import {
  GroupCard,
  ItemCard,
  PersonCard,
  StatCard,
  SummaryCard,
  TaskCard,
  type CardState,
} from "@/rm-style/ui/cards"
import { Skeleton } from "@/rm-style/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"

const states: CardState[] = ["default", "loading", "empty", "error"]
const column = "flex w-(--size-layout-frame-width) flex-col gap-(--spacing-inline-md)"

type Shared = { state: CardState; interactive: boolean; selected: boolean; disabled: boolean }
const sharedArgs: Shared = { state: "default", interactive: false, selected: false, disabled: false }
const sharedTypes = {
  state: { control: "inline-radio", options: states },
  interactive: { control: "boolean", description: "Whole card is one click target." },
  selected: { control: "boolean" },
  disabled: { control: "boolean" },
} as const
const common = ({ state, interactive, selected, disabled }: Shared) => ({
  state,
  selected,
  disabled,
  onClick: interactive ? () => {} : undefined,
  onRetry: () => {},
})

const meta = {
  title: "RM Kit/Card/Archetypes",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta

/* ----- playgrounds: one per archetype, every prop a control ----- */

export const Stat: StoryObj<Shared & { layout: "tile" | "inline" }> = {
  args: { ...sharedArgs, layout: "tile" },
  argTypes: { ...sharedTypes, layout: { control: "inline-radio", options: ["tile", "inline"] } },
  render: (a) => (
    <div className={column}>
      <StatCard
        {...common(a)}
        layout={a.layout}
        metrics={
          a.layout === "tile"
            ? [{ label: "AUM", value: "₹9.17 Cr", trend: "up", change: "+3.3%", period: "QoQ Change" }]
            : [
                { label: "Family AUM", value: "₹22.6 Cr" },
                { label: "Individual AUM", value: "₹11.3 Cr" },
                { label: "Holding", value: "4" },
              ]
        }
      />
    </div>
  ),
}

export const Summary: StoryObj<Shared & { tone: "default" | "info"; density: "default" | "compact"; status: boolean; items: boolean; description: boolean; note: boolean; choices: boolean; more: boolean }> = {
  args: { ...sharedArgs, tone: "default", density: "default", status: true, items: true, description: false, note: false, choices: false, more: false },
  argTypes: {
    ...sharedTypes,
    tone: { control: "inline-radio", options: ["default", "info"] },
    density: { control: "inline-radio", options: ["default", "compact"] },
  },
  render: (a) => (
    <div className={column}>
      <SummaryCard
        {...common(a)}
        tone={a.tone}
        density={a.density}
        title="Meeting"
        subtitle="20 Feb 2026, 11:41 am"
        status={a.status ? { label: "Scheduled" } : undefined}
        items={
          a.items
            ? [
                { label: "Type", value: "First Interaction" },
                { label: "Mode", value: "Video Conference" },
                { label: "Returns", value: "+8.42%", trend: "up" },
                { label: "Customer" },
              ]
            : undefined
        }
        description={a.description ? "KYC review is pending and a journey drop was detected." : undefined}
        note={a.note ? "Remarks: follow up next week" : undefined}
        choices={a.choices ? [{ label: "Customer details", selected: true }, { label: "Personal info" }, { label: "Contact details" }] : undefined}
        onMore={a.more ? () => {} : undefined}
      />
    </div>
  ),
}

export const Task: StoryObj<Shared & { count: number }> = {
  args: { ...sharedArgs, interactive: true, count: 4 },
  argTypes: sharedTypes,
  render: (a) => (
    <div className="w-(--size-288)">
      <TaskCard
        {...common(a)}
        count={a.count}
        icon={CalendarDaysIcon}
        title="Maturities Due"
        text="Renewals and maturities in the next 45 days"
      />
    </div>
  ),
}

export const Item: StoryObj<Shared & { tags: boolean }> = {
  args: { ...sharedArgs, interactive: true, tags: true },
  argTypes: sharedTypes,
  render: (a) => (
    <div className={column}>
      <ItemCard
        {...common(a)}
        eyebrow="Alternate Equity Income"
        title="3P India Equity Fund-1"
        meta="AIF"
        tags={a.tags ? [{ label: "Conservative", variant: "conservative" }, { label: "Moderate", variant: "moderate" }, { label: "Growth", variant: "growth" }, { label: "Aggressive", variant: "aggressive" }] : undefined}
        errorTitle="Products unavailable"
      />
    </div>
  ),
}

export const Person: StoryObj<Shared & { mode: "read" | "edit" | "removable"; avatar: boolean }> = {
  args: { ...sharedArgs, mode: "read", avatar: true },
  argTypes: { ...sharedTypes, mode: { control: "inline-radio", options: ["read", "edit", "removable"] } },
  render: (a) => (
    <div className={column}>
      <PersonCard
        {...common(a)}
        mode={a.mode}
        name="Samata Khemalapure"
        initials={a.avatar ? "SK" : undefined}
        lines={["samata.k@example.com"]}
        role={{ label: "Organizer", variant: "neutral" }}
        field={{
          label: "Attendee type",
          helper: "Selected attendee",
          options: [{ value: "user", label: "User (bank employee)" }, { value: "lead", label: "Lead" }],
          value: ["user"],
        }}
        onRemove={() => {}}
      />
    </div>
  ),
}

export const Group: StoryObj<{ open: boolean; loading: boolean }> = {
  args: { open: true, loading: false },
  render: ({ open, loading }) => (
    <div className={column}>
      <GroupCard key={String(open)} title="Jayanti Raj" subtitle="CRN: 45495722" initials="J" count="2 CUES" defaultOpen={open} state={loading ? "loading" : "default"}>
        <SummaryCard tone="info" title="KYC Re-verification" status={{ label: "Mandatory", variant: "aggressive" }} note="Video KYC abandoned at document upload." />
        <SummaryCard title="Mutual Fund" onMore={() => {}} note="First-time investor profile. Pitch a starter SIP." />
      </GroupCard>
    </div>
  ),
}

/* ----- all states: every archetype in every shared state ----- */

export const AllStates: StoryObj = {
  name: "All States",
  parameters: { layout: "padded" },
  render: () => {
    const row = (render: (s: CardState) => React.ReactNode) => (
      <div className="grid grid-cols-4 gap-(--spacing-inline-md)">{states.map((s) => <div key={s}>{render(s)}</div>)}</div>
    )
    return (
      <div className="flex flex-col gap-(--spacing-stack-lg)">
        <div className="grid grid-cols-4 gap-(--spacing-inline-md) text-(length:--font-size-xs) text-muted-foreground">
          {states.map((s) => <span key={s}>{s}</span>)}
        </div>
        {row((s) => <StatCard state={s} onRetry={() => {}} metrics={[{ label: "AUM", value: "₹9.17 Cr", trend: "up", change: "+3.3%", period: "QoQ" }]} />)}
        {row((s) => <SummaryCard state={s} onRetry={() => {}} title="Equity" subtitle="22.21% of portfolio" items={[{ label: "Current value", value: "₹6.81 Cr" }, { label: "Returns", value: "8.42%", trend: "up" }]} />)}
        {row((s) => <TaskCard state={s} onClick={() => {}} onRetry={() => {}} count={4} icon={CalendarDaysIcon} title="Maturities Due" text="Renewals in the next 45 days" />)}
        {row((s) => <ItemCard state={s} onClick={() => {}} onRetry={() => {}} eyebrow="Alternate Equity Income" title="3P India Equity Fund-1" meta="AIF" tags={[{ label: "Growth", variant: "growth" }]} />)}
        {row((s) => <PersonCard state={s} onRetry={() => {}} name="Piyush Sahu" initials="PS" lines={["Bank representative"]} />)}
      </div>
    )
  },
}

/* ----- task cards: only the icon changes per category ----- */

export const TaskIcons: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-(--spacing-inline-md)">
      <TaskCard onClick={() => {}} icon={CalendarDaysIcon} count={4} title="Maturities Due" text="Next 45 days" />
      <TaskCard onClick={() => {}} icon={ShieldCheckIcon} count={2} title="Re-KYC" text="Pending verification" />
      <TaskCard onClick={() => {}} icon={CakeIcon} count={3} title="Birthdays" text="This week" />
      <TaskCard onClick={() => {}} icon={ArrowLeftRightIcon} count={7} title="Transactions" text="Awaiting review" />
    </div>
  ),
}

/* ----- Table hosts the rows (Figma "Client family table"): not a card ----- */

const members = [
  { name: "Member A", auth: true, crn: "45495722", aum: "₹22.6 Cr" },
  { name: "Member B", auth: false, crn: "45495723", aum: undefined },
]
export const FamilyTable: StoryObj<{ state: "populated" | "loading" | "no match" }> = {
  args: { state: "populated" },
  argTypes: { state: { control: "inline-radio", options: ["populated", "loading", "no match"] } },
  render: ({ state }) => {
    const [auth, setAuth] = React.useState(true)
    const rows = state === "no match" ? [] : members.filter((m) => m.auth === auth)
    return (
      <div className={column}>
        <div className="flex gap-(--spacing-stack-2xs)">
          <Chip pressed={auth} onPressedChange={() => setAuth(true)}>Auth</Chip>
          <Chip pressed={!auth} onPressedChange={() => setAuth(false)}>Non-Auth</Chip>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>CRN</TableHead>
              <TableHead>AUM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state === "loading" ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Skeleton className="h-(--size-skeleton-line-height) w-full" />
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((m) => (
                <TableRow key={m.name}>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.crn}</TableCell>
                  <TableCell>{m.aum ?? "—"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">No family members match this filter.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  },
}
