// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Spinner } from "@/rm-style/ui/spinner"

// Hand-written. The RM Kit spinner: the loading mark used by Button (loading) and by any region that is loading.
const meta = { title: "RM Kit/Spinner", component: Spinner, tags: ["autodocs"], parameters: { layout: "centered" } } satisfies Meta<typeof Spinner>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: {} }
export const InRegion: Story = {
  render: () => (
    <div aria-busy="true" className="flex items-center gap-(--spacing-inline-sm) text-(length:--font-size-sm) text-muted-foreground">
      <Spinner />
      Loading clients
    </div>
  ),
}
