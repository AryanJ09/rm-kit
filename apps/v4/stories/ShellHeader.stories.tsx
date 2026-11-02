// Hand-written from Figma "Shell header". Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ShellHeader } from "@/rm-style/ui/application-shell/shell-header"

type Args = {
  greeting: string
  initials: string
}

const meta = {
  title: "RM Kit/Application shell/Shell header",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { greeting: "Hi Lakshmesh", initials: "LP" },
  argTypes: {
    greeting: { control: "text", description: "Greeting line." },
    initials: { control: "text", description: "Initials in the avatar." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

type InsideArgs = { context: "inside-page" | "client-detail" | "inside-page-description"; title: string; description: string; time: boolean }

// Figma contexts: Inside page, Client detail, Inside-page_Description. Time is the clock shown at the top right of the bar.
export const InsidePage: StoryObj<InsideArgs> = {
  args: { context: "inside-page", title: "Clients", description: "Rajesh Mehra", time: true },
  argTypes: {
    context: { control: "inline-radio", options: ["inside-page", "client-detail", "inside-page-description"] },
    description: { description: "Shown in the inside-page-description context." },
    time: { control: "boolean", description: "Clock at the top right." },
  },
  render: ({ context, title, description, time }) => (
    <div className="mx-auto w-(--size-layout-frame-width) max-w-full">
      <ShellHeader context={context} title={title} description={description} time={time ? "12:30" : undefined} onBack={() => {}} onAction={() => {}} />
    </div>
  ),
}

// All three contexts together.
export const InsideContexts: StoryObj = {
  render: () => (
    <div className="mx-auto flex w-(--size-layout-frame-width) max-w-full flex-col gap-(--spacing-inline-lg)">
      <ShellHeader context="inside-page" title="Clients" time="12:30" onBack={() => {}} />
      <ShellHeader context="client-detail" title="Jayanti Raj . 45495722" time="12:30" onBack={() => {}} />
      <ShellHeader context="inside-page-description" title="Meeting Notes" description="Rajesh Mehra" time="12:30" onBack={() => {}} onAction={() => {}} />
    </div>
  ),
}

// The mobile top bar: avatar, greeting, notifications, menu. It is the header of the mobile Application shell.
export const Default: Story = {
  render: ({ greeting, initials }) => (
    <div className="mx-auto w-(--size-layout-frame-width) max-w-full">
      <ShellHeader greeting={greeting} initials={initials} />
    </div>
  ),
}
