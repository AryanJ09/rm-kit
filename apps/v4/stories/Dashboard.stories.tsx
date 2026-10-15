import { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/rm-style/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/rm-style/ui/avatar"
import { Badge } from "@/rm-style/ui/badge"
import { BottomNavigation } from "@/rm-style/ui/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/rm-style/ui/card"
import { Checkbox } from "@/rm-style/ui/checkbox"
import { DatePicker } from "@/rm-style/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/rm-style/ui/dialog"
import { Dropdown } from "@/rm-style/ui/dropdown"
import { Input } from "@/rm-style/ui/input"
import { Label } from "@/rm-style/ui/label"
import { Message, MessageAvatar, MessageContent, MessageGroup } from "@/rm-style/ui/message"
import { RadioGroup, RadioGroupItem } from "@/rm-style/ui/radio-group"
import { Search } from "@/rm-style/ui/search"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/rm-style/ui/sheet"
import { Switch } from "@/rm-style/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"
import { Textarea } from "@/rm-style/ui/textarea"

// Hand-written example. One responsive screen built only from RM Kit components, so every
// breakpoint can be reviewed: Desktop (table + side panel), Tablet (two-column stats),
// Mobile (cards, filters in a sheet, bottom navigation). Pick the device in the Viewport menu
// or open the matching story, which sets it for you.
const meta = {
  title: "Examples/Dashboard",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type Risk = "conservative" | "moderate" | "growth" | "aggressive"
type Client = { id: string; name: string; risk: Risk; aum: string; active: boolean }

const CLIENTS: Client[] = [
  { id: "c1", name: "Lakshmesh Patel", risk: "moderate", aum: "1.20 Cr", active: true },
  { id: "c2", name: "Asha Rao", risk: "conservative", aum: "84 L", active: true },
  { id: "c3", name: "Mohan Iyer", risk: "aggressive", aum: "2.65 Cr", active: false },
  { id: "c4", name: "Priya Shah", risk: "growth", aum: "1.05 Cr", active: true },
  { id: "c5", name: "Dev Malhotra", risk: "moderate", aum: "56 L", active: true },
]

const RISK_OPTIONS = [
  { value: "conservative", label: "Conservative" },
  { value: "moderate", label: "Moderate" },
  { value: "growth", label: "Growth" },
  { value: "aggressive", label: "Aggressive" },
]

const STATS = [
  { title: "Clients", value: "128", note: "6 added this month" },
  { title: "Assets under management", value: "86.4 Cr", note: "Up 2.1% this week" },
  { title: "Open leads", value: "34", note: "9 need a follow-up" },
  { title: "Reviews due", value: "12", note: "Next one is today" },
]

const label = (t: string) => t[0].toUpperCase() + t.slice(1)
const initials = (name: string) => name.split(" ").map((p) => p[0]).join("")

function Filters({
  risk, setRisk, activeOnly, setActiveOnly, view, setView,
}: {
  risk: string[]; setRisk: (v: string[]) => void
  activeOnly: boolean; setActiveOnly: (v: boolean) => void
  view: string; setView: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-(--ds-spacing-16)">
      <Dropdown label="Risk profile" placeholder="All profiles" mode="multiple" options={RISK_OPTIONS} value={risk} onValueChange={setRisk} />
      <DatePicker label="Review date" mode="range" placeholder="Pick a range" />
      <div className="flex items-center justify-between gap-(--ds-spacing-16)">
        <Label htmlFor="active-only">Active clients only</Label>
        <Switch id="active-only" checked={activeOnly} onCheckedChange={setActiveOnly} />
      </div>
      <RadioGroup value={view} onValueChange={setView} aria-label="Sort clients">
        <div className="flex items-center gap-(--ds-spacing-8)"><RadioGroupItem value="name" id="sort-name" /><Label htmlFor="sort-name">Sort by name</Label></div>
        <div className="flex items-center gap-(--ds-spacing-8)"><RadioGroupItem value="aum" id="sort-aum" /><Label htmlFor="sort-aum">Sort by assets</Label></div>
      </RadioGroup>
    </div>
  )
}

function AddClient() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Add client</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add client</DialogTitle>
          <DialogDescription>Capture the basics now. You can finish the profile later.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-(--ds-spacing-16)">
          <div className="flex flex-col gap-(--ds-spacing-8)"><Label htmlFor="client-name">Full name</Label><Input id="client-name" placeholder="Client name" /></div>
          <div className="flex flex-col gap-(--ds-spacing-8)"><Label htmlFor="client-note">Note</Label><Textarea id="client-note" placeholder="How did you meet?" /></div>
        </div>
        <DialogFooter><Button>Save client</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Dashboard() {
  const [query, setQuery] = useState("")
  const [risk, setRisk] = useState<string[]>([])
  const [activeOnly, setActiveOnly] = useState(false)
  const [view, setView] = useState("name")
  const [selected, setSelected] = useState<string[]>([])
  const [removing, setRemoving] = useState<Client | null>(null)
  const [removed, setRemoved] = useState<string[]>([])

  const rows = useMemo(
    () =>
      CLIENTS.filter((c) => !removed.includes(c.id))
        .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
        .filter((c) => risk.length === 0 || risk.includes(c.risk))
        .filter((c) => !activeOnly || c.active)
        .sort((a, b) => (view === "name" ? a.name.localeCompare(b.name) : b.aum.localeCompare(a.aum, undefined, { numeric: true }))),
    [query, risk, activeOnly, view, removed]
  )

  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id))
  const someSelected = rows.some((r) => selected.includes(r.id)) && !allSelected
  const toggle = (id: string, on: boolean) => setSelected((s) => (on ? [...s, id] : s.filter((x) => x !== id)))
  const filters = { risk, setRisk, activeOnly, setActiveOnly, view, setView }

  return (
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <header className="flex flex-col gap-(--ds-spacing-16) border-b border-border p-(--ds-spacing-16) md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-(length:--ds-typography-font-size-24) font-medium">Clients</h1>
          <p className="text-(length:--ds-typography-font-size-14) text-text-secondary">{rows.length} of {CLIENTS.length - removed.length} shown</p>
        </div>
        <div className="flex items-center gap-(--ds-spacing-8)">
          <Search className="flex-1 md:w-(--ds-size-288) md:flex-none" placeholder="Search clients" value={query} onValueChange={setQuery} onClear={() => setQuery("")} />
          <Sheet>
            <SheetTrigger render={<Button variant="secondary" className="lg:hidden" />}>Filters</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow the client list.</SheetDescription>
              </SheetHeader>
              <div className="p-(--ds-spacing-16)"><Filters {...filters} /></div>
            </SheetContent>
          </Sheet>
          <AddClient />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-(--ds-spacing-24) p-(--ds-spacing-16) pb-(--ds-size-layout-nav-clearance) md:pb-(--ds-spacing-16)">
        <section aria-label="Summary" className="grid gap-(--ds-spacing-16) sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <CardDescription>{s.title}</CardDescription>
                <CardTitle className="text-(length:--ds-typography-font-size-28)">{s.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-(length:--ds-typography-font-size-12) text-text-secondary">{s.note}</CardContent>
            </Card>
          ))}
        </section>

        <div className="grid gap-(--ds-spacing-24) lg:grid-cols-3">
          <section aria-label="Client list" className="flex flex-col gap-(--ds-spacing-16) lg:col-span-2">
            <div className="hidden lg:block"><Filters {...filters} /></div>

            {/* Mobile: one card per client. */}
            <ul className="flex flex-col gap-(--ds-spacing-8) md:hidden">
              {rows.map((c) => (
                <li key={c.id} className="flex items-center gap-(--ds-spacing-12) rounded-(--radius-md) border border-border p-(--ds-spacing-12)">
                  <Avatar><AvatarFallback>{initials(c.name)}</AvatarFallback></Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-(--ds-spacing-4)">
                    <span className="truncate font-medium">{c.name}</span>
                    <Badge variant={c.risk}>{label(c.risk)}</Badge>
                  </div>
                  <span className="text-(length:--ds-typography-font-size-14) text-text-secondary">{c.aum}</span>
                </li>
              ))}
            </ul>

            {/* Tablet and desktop: selectable table. */}
            <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><Checkbox aria-label="Select all" checked={allSelected} indeterminate={someSelected} onCheckedChange={(on) => setSelected(on ? rows.map((r) => r.id) : [])} /></TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Risk profile</TableHead>
                  <TableHead>Assets</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell><Checkbox aria-label={`Select ${c.name}`} checked={selected.includes(c.id)} onCheckedChange={(on) => toggle(c.id, on)} /></TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell><Badge variant={c.risk}>{label(c.risk)}</Badge></TableCell>
                    <TableCell>{c.aum}</TableCell>
                    <TableCell><Button variant="ghost" size="sm" onClick={() => setRemoving(c)}>Remove</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
            {rows.length === 0 && <p className="text-text-secondary">No clients match these filters.</p>}
          </section>

          <aside aria-label="Recent messages">
            <Card>
              <CardHeader>
                <CardTitle>Recent messages</CardTitle>
                <CardDescription>Latest from your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <MessageGroup>
                  <Message>
                    <MessageAvatar><Avatar><AvatarFallback>AR</AvatarFallback></Avatar></MessageAvatar>
                    <MessageContent>Can we move the review to Friday?</MessageContent>
                  </Message>
                  <Message align="end">
                    <MessageContent>Friday works. I will send an invite.</MessageContent>
                  </Message>
                </MessageGroup>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Mobile only: primary navigation pinned to the bottom edge. */}
      <div className="fixed inset-x-0 bottom-0 flex justify-center md:hidden">
        <BottomNavigation defaultActive="Clients" />
      </div>

      <AlertDialog open={removing !== null} onOpenChange={(open) => !open && setRemoving(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removing?.name}?</AlertDialogTitle>
            <AlertDialogDescription>They leave this list. Their history stays in the CRM.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep client</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (removing) setRemoved((r) => [...r, removing.id]); setRemoving(null) }}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export const Desktop: Story = { render: () => <Dashboard /> }
export const Tablet: Story = { render: () => <Dashboard />, globals: { viewport: { value: "tablet", isRotated: false } } }
export const Mobile: Story = { render: () => <Dashboard />, globals: { viewport: { value: "mobile1", isRotated: false } } }
