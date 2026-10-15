import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Info } from "lucide-react"
import { Badge } from "@/rm-style/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"

// Hand-written: this file is not regenerated. Badges are static labels: no hover, no focus.
const meta = {
  title: "RM Kit/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const types = ["conservative", "moderate", "growth", "aggressive", "secure", "success", "neutral"] as const
const label = (t: string) => t[0].toUpperCase() + t.slice(1)

// Rows are the seven types; columns are the three statuses.
export const AllStates: Story = {
  render: () => (
    <Table className="w-full p-(--ds-spacing-16)">
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Information</TableHead>
          <TableHead>Dot</TableHead>
          <TableHead>Icon</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {types.map((t) => (
          <TableRow key={t}>
            <TableCell>{label(t)}</TableCell>
            <TableCell><Badge variant={t}>{label(t)}</Badge></TableCell>
            <TableCell>
              <Badge variant={t}>
                <span className="size-(--ds-spacing-6) rounded-(--ds-radius-full) bg-current" />
                {label(t)}
              </Badge>
            </TableCell>
            <TableCell>
              {/* The icon is a slot: any svg child is sized by the badge, so swap Info for the real icon. */}
              <Badge variant={t}>
                <Info />
                {label(t)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Real use: a client list with a risk badge per row.
export const InContext: Story = {
  render: () => (
    <Table className="w-full p-(--ds-spacing-16)">
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Risk profile</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Lakshmesh Patel</TableCell><TableCell><Badge variant="moderate">Moderate</Badge></TableCell></TableRow>
        <TableRow><TableCell>Asha Rao</TableCell><TableCell><Badge variant="conservative">Conservative</Badge></TableCell></TableRow>
        <TableRow><TableCell>Mohan Iyer</TableCell><TableCell><Badge variant="aggressive">Aggressive</Badge></TableCell></TableRow>
      </TableBody>
    </Table>
  ),
}
