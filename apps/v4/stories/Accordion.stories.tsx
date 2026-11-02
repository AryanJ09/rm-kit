// Hand-written. The RM Kit accordion: a plain list of sections, and the card variant, where each section is a card and its
// trigger can show an icon, a Counter and a status Badge. The content is any element (rows, tables, switches, key-values).
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontal, ReceiptIcon, ShieldCheckIcon, UserRound } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"
import { Button } from "@/rm-style/ui/button"
import { CardKeyValue, ItemCard, ItemList } from "@/rm-style/ui/cards"
import { Chip } from "@/rm-style/ui/chip/chip"
import { Switch } from "@/rm-style/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"

const icons = { none: undefined, user: <UserRound />, shield: <ShieldCheckIcon />, receipt: <ReceiptIcon /> }

// An amount with its direction: out (a debit) in red with a down arrow, in (a credit) in green with an up arrow.
function Amount({ value, direction }: { value: string; direction: "in" | "out" }) {
  const Arrow = direction === "in" ? ArrowUpIcon : ArrowDownIcon
  return (
    <span className={`flex items-center gap-(--spacing-stack-3xs) font-(--typography-label-strong-font-weight) text-(length:--font-size-sm) ${direction === "in" ? "text-(color:--category-success-text)" : "text-(color:--category-aggressive-text)"}`}>
      {value}
      <Arrow aria-label={direction === "in" ? "credit" : "debit"} className="size-(--size-icon-3xs)" />
    </span>
  )
}
const statusVariants = ["neutral", "success", "growth", "aggressive", "moderate", "conservative", "secure"] as const

type Args = {
  variant: "card" | "plain"
  chevron: "accent" | "default"
  icon: keyof typeof icons
  count: number
  statusLabel: string
  statusVariant: (typeof statusVariants)[number]
  sections: number
}

const meta = {
  title: "RM Kit/Accordion",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { variant: "card", chevron: "accent", icon: "user", count: 13, statusLabel: "", statusVariant: "neutral", sections: 3 },
  argTypes: {
    variant: { control: "inline-radio", options: ["card", "plain"], description: "card: each section is a card. plain: a list with dividers." },
    chevron: { control: "inline-radio", options: ["accent", "default"], description: "accent: the red chevron. default: the grey icon role." },
    icon: { control: "inline-radio", options: Object.keys(icons), description: "An icon before the title (card only)." },
    count: { control: { type: "number", min: 0 }, description: "A Counter after the title (card only). 0 shows 0." },
    statusLabel: { control: "text", description: "A status Badge after the title (card only). Empty hides it." },
    statusVariant: { control: "select", options: statusVariants },
    sections: { control: { type: "number", min: 1, max: 4 } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const bodies: Record<string, React.ReactNode> = {
  "Personal details": (
    <div className="flex flex-col gap-(--spacing-inline-md)">
      <CardKeyValue label="Date of birth">21 Aug 1962</CardKeyValue>
      <CardKeyValue label="Client category">Platinum</CardKeyValue>
      <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
        <Chip>Customer details</Chip>
        <Chip>Personal info</Chip>
        <Chip>Contact details</Chip>
      </div>
    </div>
  ),
  "Family details": (
    <FamilyBody />
  ),
  "Recent transactions": (
    <ItemList>
      <ItemCard inList title="UPI merchant payment" meta="5 August 2026" trailing={<Amount value="₹1.7 K" direction="out" />} />
      <ItemCard inList title="Salary credit NEFT" meta="1 August 2026" trailing={<Amount value="₹68 K" direction="in" />} />
    </ItemList>
  ),
  "Off-us relationships": (
    <div className="flex flex-col gap-(--spacing-inline-sm)">
      <CardKeyValue label="Loan sanction"><span className="font-(--typography-label-strong-font-weight)">₹46.5 L</span></CardKeyValue>
      <CardKeyValue label="Working capital"><span className="font-(--typography-label-strong-font-weight)">₹4 Cr</span></CardKeyValue>
    </div>
  ),
}

function FamilyBody() {
  const [auth, setAuth] = React.useState(true)
  return (
    <div className="flex flex-col gap-(--spacing-inline-md)">
      <Switch startLabel="Auth" endLabel="Non-Auth" checked={!auth} onCheckedChange={(v) => setAuth(!v)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name ↑</TableHead>
            <TableHead>CRN</TableHead>
            <TableHead>AUM</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auth ? (
            <TableRow>
              <TableCell>Anchal Mehra</TableCell>
              <TableCell>70011001</TableCell>
              <TableCell>₹2.1 Cr</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">No family members match this filter.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const names = ["Personal details", "Family details", "Recent transactions", "Off-us relationships"]

/** Playground: every control of the card variant's trigger and the chevron. */
export const Playground: Story = {
  render: ({ variant, chevron, icon, count, statusLabel, statusVariant, sections }) => (
    <div className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Accordion variant={variant === "card" ? "card" : "default"} chevron={chevron} defaultValue={[names[0]]}>
        {names.slice(0, sections).map((n) => (
          <AccordionItem key={n} value={n}>
            <AccordionTrigger
              icon={variant === "card" ? icons[icon] : undefined}
              count={variant === "card" ? count : undefined}
              status={variant === "card" && statusLabel ? { label: statusLabel, variant: statusVariant } : undefined}
            >
              {n}
            </AccordionTrigger>
            <AccordionContent>{bodies[n]}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}

/** The profile sections of Client 360, as in the prototype: a title with its count in parentheses, a chevron, and the content. */
export const ProfileSections: Story = {
  render: () => (
    <div className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Accordion variant="card" defaultValue={["Personal details", "Family details", "Recent transactions"]}>
        <AccordionItem value="Personal details">
          <AccordionTrigger>Personal details</AccordionTrigger>
          <AccordionContent>{bodies["Personal details"]}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Family details">
          <AccordionTrigger count={1}>Family details</AccordionTrigger>
          <AccordionContent>{bodies["Family details"]}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Recent transactions">
          <AccordionTrigger count={2}>Recent transactions</AccordionTrigger>
          <AccordionContent>{bodies["Recent transactions"]}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Service activations">
          <AccordionTrigger>Service activations</AccordionTrigger>
          <AccordionContent>
            <ItemList>
              <ItemCard inList title="WhatsApp" meta="Active since: not specified" tags={[{ label: "Active", variant: "success" }]} />
              <ItemCard inList title="Credit card" meta="Active since: 0 days" tags={[{ label: "Not active", variant: "aggressive" }]} />
            </ItemList>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Service requests">
          <AccordionTrigger count={1}>Service requests</AccordionTrigger>
          <AccordionContent>
            <ItemList>
              <ItemCard inList title="Payment related · funds transfer request" meta="SR 02939293 · created 10 days ago" tags={[{ label: "High", variant: "aggressive" }]} />
            </ItemList>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Off-us relationships">
          <AccordionTrigger count={1}>Off-us relationships</AccordionTrigger>
          <AccordionContent>{bodies["Off-us relationships"]}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

/** The plain variant: a list with dividers, no card, no icon, no counter. */
export const Plain: Story = {
  render: () => (
    <div className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Accordion defaultValue={["Personal details"]}>
        {names.map((n) => (
          <AccordionItem key={n} value={n}>
            <AccordionTrigger>{n}</AccordionTrigger>
            <AccordionContent>{bodies[n]}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}

/**
 * Composition: what an agent can put inside a card-variant section. The trigger carries the heading (a name, a count as text,
 * a status); the body takes any of these, one at a time or mixed. Nothing here is a new component: each block is an existing one.
 */
export const Compositions: Story = {
  render: () => (
    <div className="flex w-(--size-layout-frame-width) max-w-(--size-share-full) flex-col gap-(--spacing-inline-lg)">
      <Accordion variant="card" defaultValue={["cues"]}>
        <AccordionItem value="cues">
          <AccordionTrigger>
            <span className="flex flex-col">
              <span>Pooja Chawla</span>
              <span className="text-(length:--font-size-xs) font-(--typography-caption-font-weight) text-muted-foreground">CRN: 56792328</span>
            </span>
            <span className="ml-auto text-(length:--font-size-sm) text-muted-foreground">3 Cues</span>
          </AccordionTrigger>
          <AccordionContent>
            <ItemList>
              <ItemCard inList title="FD" description="Recurring deposit matures in 9 days. Pitch a laddered FD renewal." trailing={<Button variant="ghost" size="icon-sm" aria-label="More actions" className="text-icon-default"><MoreHorizontal /></Button>} />
              <ItemCard inList title="SIP Top-up" description="SIP running two years without a step-up. Suggest a top-up aligned to the salary revision." trailing={<Button variant="ghost" size="icon-sm" aria-label="More actions" className="text-icon-default"><MoreHorizontal /></Button>} />
              <ItemCard inList title="Credit Card" description="No card on file despite steady salary credits. Pitch the entry variant." trailing={<Button variant="ghost" size="icon-sm" aria-label="More actions" className="text-icon-default"><MoreHorizontal /></Button>} />
            </ItemList>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion variant="card" defaultValue={["key-values"]}>
        <AccordionItem value="key-values">
          <AccordionTrigger icon={<UserRound />} count={3}>Key values</AccordionTrigger>
          <AccordionContent>
            <CardKeyValue label="Date of birth">14 Mar 1984</CardKeyValue>
            <CardKeyValue label="Client category">Premium</CardKeyValue>
            <CardKeyValue label="Segment">Individual</CardKeyValue>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion variant="card" defaultValue={["mixed"]}>
        <AccordionItem value="mixed">
          <AccordionTrigger count={2} status={{ label: "Mandatory", variant: "aggressive" }}>Mandatory</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-(--spacing-inline-sm)">
              <Chip>Equity</Chip>
              <Chip>Fixed income</Chip>
            </div>
            <Switch startLabel="Members" endLabel="Products" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
