// Hand-written from Figma "Ai suggestions" and the prototype. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AiSuggestion } from "@/rm-style/ui/ai-suggestion"

type Args = { variant: "note" | "pill" | "row"; text: string; tappable: boolean }

const meta = {
  title: "RM Kit/AI suggestion",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-(--size-layout-frame-width) max-w-(--size-share-full)"><Story /></div>],
  args: { variant: "note", text: "KYC review is pending and a journey drop-off was recorded -- a quick call could unblock both.", tappable: true },
  argTypes: {
    variant: { control: "inline-radio", options: ["note", "pill", "row"], description: "note: a sentence. pill: a short tappable suggestion. row: a full-width action row." },
    text: { control: "text" },
    tappable: { control: "boolean", description: "pill and row only: makes it a button." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = {
  render: ({ variant, text, tappable }) => (
    <AiSuggestion variant={variant} onClick={tappable ? () => {} : undefined}>
      {text}
    </AiSuggestion>
  ),
}

// The three shapes side by side, with the copy from Figma and the prototype.
export const Variants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-(--spacing-stack-lg)">
      <AiSuggestion>KYC review is pending and a journey drop-off was recorded -- a quick call could unblock both.</AiSuggestion>
      <div className="flex flex-wrap gap-(--spacing-inline-sm)">
        {["Customer details", "Personal info", "Contact details"].map((label) => (
          <AiSuggestion key={label} variant="pill" onClick={() => {}}>
            {label}
          </AiSuggestion>
        ))}
      </div>
      <div className="flex flex-col gap-(--spacing-inline-sm)">
        <AiSuggestion variant="row" onClick={() => {}}>Personalised REIT script for Rajesh Mehra</AiSuggestion>
        <AiSuggestion variant="row" onClick={() => {}}>Simulate credit assessment</AiSuggestion>
      </div>
    </div>
  ),
}
