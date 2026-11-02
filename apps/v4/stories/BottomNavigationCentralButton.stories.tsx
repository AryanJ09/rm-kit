import { BottomNavigationCentralButton } from "@/rm-style/ui/application-shell/bottom-navigation-central-button"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { VariantGrid } from "./figma/component-set"

const meta = {
  title: "RM Kit/Application shell/Central button",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const states = ["Default", "Pressed", "Disabled"] as const

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <VariantGrid
      columns={["State"]}
      rows={states}
      cellWidth={160}
      cellHeight={104}
      cell={(_, row) => (
        <BottomNavigationCentralButton
          state={row.toLowerCase() as "default" | "pressed" | "disabled"}
          aria-label={`${row} central action`}
        />
      )}
    />
  ),
}
