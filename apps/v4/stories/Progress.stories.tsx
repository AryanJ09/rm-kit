// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Progress } from "@/rm-style/ui/progress"
import { ProgressControlled as DemoProgressControlled } from "@/examples/base/progress-controlled"
import DemoProgressDemo from "@/examples/base/progress-demo"
import { ProgressWithLabel as DemoProgressLabel } from "@/examples/base/progress-label"

const meta = {
  title: "RM Kit/Progress",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Controlled: Story = { render: () => <DemoProgressControlled /> }
export const Demo: Story = { render: () => <DemoProgressDemo /> }
export const Label: Story = { render: () => <DemoProgressLabel /> }

type GoalArgs = { value: number; size: "sm" | "lg"; tone: "primary" | "secure" | "deep"; showLabel: boolean; target: number; cap: number }

/** The bar with its options: size, fill tone, a label inside the fill, and Target and Cap flags over the track. */
export const Goal: StoryObj<GoalArgs> = {
  args: { value: 64, size: "lg", tone: "primary", showLabel: true, target: 100, cap: 0 },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "inline-radio", options: ["sm", "lg"], description: "sm: the thin line. lg: a tall bar that can carry a label." },
    tone: { control: "inline-radio", options: ["primary", "secure", "deep"] },
    showLabel: { control: "boolean", description: "A label inside the fill (size lg)." },
    target: { control: { type: "range", min: 0, max: 100 }, description: "Where the Target flag sits (0 hides it)." },
    cap: { control: { type: "range", min: 0, max: 100 }, description: "Where the Cap flag sits (0 hides it)." },
  },
  render: ({ value, size, tone, showLabel, target, cap }) => (
    <div className="w-(--size-layout-frame-width) max-w-full p-(--spacing-inline-lg)">
      <Progress
        value={value}
        size={size}
        tone={tone}
        valueLabel={showLabel ? `Achieved: ${value}%` : undefined}
        markers={[
          ...(target ? [{ value: target, label: "Target 100%" }] : []),
          ...(cap ? [{ value: cap, label: "Cap 120%", tone: "accent" as const }] : []),
        ]}
      />
    </div>
  ),
}
