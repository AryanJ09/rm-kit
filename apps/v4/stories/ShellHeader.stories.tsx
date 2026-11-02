// Hand-written. Not generated: edit this file directly.
// The shell header has three contexts, named by what they are (see shell-header.tsx). Every label and control is a prop.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ShellHeader } from "@/rm-style/ui/application-shell/shell-header"

const meta = {
  title: "RM Kit/Application shell/Shell header",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <div className="mx-auto w-(--size-layout-frame-width) max-w-(--size-share-full)"><Story /></div>],
} satisfies Meta

export default meta
type Story = StoryObj

type PageArgs = { title: string; actionLabel: string; time: boolean }

/** page: a main destination. A large title and an optional text action; no back arrow. */
export const Page: StoryObj<PageArgs> = {
  args: { title: "Leads", actionLabel: "Add lead", time: true },
  argTypes: {
    title: { control: "text" },
    actionLabel: { control: "text", description: "Text action at the end of the title row. Empty hides it." },
    time: { control: "boolean", description: "Device clock at the top right." },
  },
  render: ({ title, actionLabel, time }) => (
    <ShellHeader context="page" title={title} time={time ? "12:30" : undefined} action={actionLabel ? { label: actionLabel, onClick: () => {} } : undefined} />
  ),
}

type InsideArgs = {
  title: string
  titleStyle: "heading" | "text"
  description: string
  action: "none" | "plus"
  time: boolean
}

/** inside: a page opened from another. Back, a centred title, an optional description and an optional icon action. */
export const Inside: StoryObj<InsideArgs> = {
  args: { title: "Clients", titleStyle: "heading", description: "", action: "none", time: true },
  argTypes: {
    title: { control: "text" },
    titleStyle: { control: "inline-radio", options: ["heading", "text"], description: "heading: bold. text: regular, for a line such as a name and reference." },
    description: { control: "text", description: "Muted line under the title. Empty hides it." },
    action: { control: "inline-radio", options: ["none", "plus"] },
    time: { control: "boolean" },
  },
  render: ({ title, titleStyle, description, action, time }) => (
    <ShellHeader
      context="inside"
      title={title}
      titleStyle={titleStyle}
      description={description || undefined}
      time={time ? "12:30" : undefined}
      onBack={() => {}}
      action={action === "plus" ? { label: "Add", onClick: () => {} } : undefined}
    />
  ),
}

/** All three contexts, as they appear in the app. */
export const Contexts: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-inline-lg)">
      <ShellHeader context="page" title="Leads" time="12:30" action={{ label: "Add lead", onClick: () => {} }} />
      <ShellHeader context="inside" title="Clients" time="12:30" onBack={() => {}} />
      <ShellHeader context="inside" title="Jayanti Raj . 45495722" titleStyle="text" time="12:30" onBack={() => {}} />
      <ShellHeader context="inside" title="Meeting Notes" description="Rajesh Mehra" time="12:30" onBack={() => {}} action={{ label: "Add", onClick: () => {} }} />
    </div>
  ),
}

type HomeArgs = { title: string; initials: string }

/** home: the red gradient bar with the avatar, a title, the bell and the menu. */
export const Home: StoryObj<HomeArgs> = {
  args: { title: "Hi Lakshmesh", initials: "LP" },
  argTypes: {
    title: { control: "text", description: "The line next to the avatar, e.g. a greeting." },
    initials: { control: "text", description: "Initials in the avatar." },
  },
  render: ({ title, initials }) => <ShellHeader title={title} initials={initials} />,
}

/** Scrolled: once the page moves, the title and buttons give way to compact content (here, metric pills). */
export const Collapsed: Story = {
  render: () => (
    <ShellHeader
      title="Hi Lakshmesh"
      initials="LP"
      collapsed={
        <>
          {[
            { label: "CRN", value: "23" },
            { label: "RV", value: "₹250 Cr" },
            { label: "SOP", value: "58.9" },
          ].map((m) => (
            <span key={m.label} className="inline-flex items-center gap-(--spacing-stack-2xs) rounded-(--radius-pill) bg-(color:--accent-subtle) px-(--spacing-inline-sm) py-(--spacing-stack-3xs) text-(length:--font-size-xs) text-foreground">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-(--typography-label-strong-font-weight)">{m.value}</span>
            </span>
          ))}
        </>
      }
    />
  ),
}
