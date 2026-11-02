// Hand-written from the prototype: the "i" tooltip beside a metric ("CA/SA/TD" on the Holding count). Not generated.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { InfoIcon } from "lucide-react"

import { Button } from "@/rm-style/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/rm-style/ui/tooltip"

const meta = {
  title: "RM Kit/Tooltip",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
} satisfies Meta

export default meta
type Story = StoryObj

type Args = { text: string; side: "top" | "bottom" | "left" | "right" }

/** A text tooltip on an icon button. Hover or focus the button to see it. */
export const Playground: StoryObj<Args> = {
  args: { text: "CA/SA/TD", side: "top" },
  argTypes: {
    text: { control: "text", description: "The tooltip text." },
    side: { control: "inline-radio", options: ["top", "bottom", "left", "right"] },
  },
  render: ({ text, side }) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More information" />}>
        <InfoIcon />
      </TooltipTrigger>
      <TooltipContent side={side}>{text}</TooltipContent>
    </Tooltip>
  ),
}

/** The prototype's use: the info icon beside a metric value. */
export const OnMetric: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-inline-xs) text-(length:--font-size-sm) text-card-foreground">
      Holding <span className="font-(--typography-label-strong-font-weight)">4</span>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon-xs" aria-label="Holdings info" />}>
          <InfoIcon />
        </TooltipTrigger>
        <TooltipContent>CA/SA/TD</TooltipContent>
      </Tooltip>
    </div>
  ),
}

/** The four sides, as the tooltip flips to stay on screen. */
export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-(--spacing-inline-xl) p-(--spacing-inline-xl)">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="secondary" size="sm" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>Shown {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
