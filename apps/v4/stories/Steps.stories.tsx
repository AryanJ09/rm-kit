// Hand-written. The RM Kit steps: stages taken in order. Done, active (the one you can open) and locked.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Steps, type StepItem } from "@/rm-style/ui/steps"

const meta = { title: "RM Kit/Steps", component: Steps, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof Steps>
export default meta
type Story = StoryObj<typeof meta>

const steps: StepItem[] = [
  { id: "qualify", title: "Qualify this lead", description: "Confirm the customer's requirement and details.", state: "done" },
  { id: "offer", title: "Construct an offer", description: "Pick a preset and share indicative terms with the customer.", state: "active" },
  { id: "next", title: "Set next steps", description: "Name the readiness gaps and what happens next.", state: "locked", lockedHint: 'Complete "Construct an offer" first' },
]

/** Done, active and locked together. Only the active step opens. */
export const Playground: Story = {
  args: { steps },
  render: (args) => (
    <div className="w-(--size-layout-frame-width) max-w-full">
      <Steps {...args} />
    </div>
  ),
}

/** Tap the active step: it completes and the next one unlocks. */
export const Progressing: Story = {
  args: { steps },
  render: () => {
    const [done, setDone] = React.useState(0)
    const list = steps.map((s, i): StepItem => ({ ...s, state: i < done ? "done" : i === done ? "active" : "locked" }))
    return (
      <div className="w-(--size-layout-frame-width) max-w-full">
        <Steps steps={list} onOpen={() => setDone((d) => Math.min(d + 1, steps.length))} />
      </div>
    )
  },
}
