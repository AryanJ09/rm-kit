// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TableActions as DemoTableActions } from "@/examples/base/table-actions"
import { TableDemo as DemoTableDemo } from "@/examples/base/table-demo"
import { TableFooterExample as DemoTableFooter } from "@/examples/base/table-footer"
import { Table } from "@/rm-style/ui/table"

const meta = {
  title: "RM Kit/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Actions: Story = { render: () => <DemoTableActions /> }
export const Demo: Story = { render: () => <DemoTableDemo /> }
export const Footer: Story = { render: () => <DemoTableFooter /> }
