// Hand-written from Figma "Tabs/secondary". Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tabs, TabsList, TabsTrigger } from "@/rm-style/ui/tabs"

type Args = {
  variant: "primary" | "secondary"
  disableLast: boolean
}

const meta = {
  title: "RM Kit/Tabs",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { variant: "primary", disableLast: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary"], description: "primary: underline tabs. secondary: segmented pill (Figma Tabs/secondary)." },
    disableLast: { control: "boolean", description: "Disables the last tab." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

// Use the Controls panel to switch variant and the disabled tab.
export const Playground: Story = {
  render: ({ variant, disableLast }) => (
    <Tabs defaultValue="cues" className="w-(--size-layout-frame-width)">
      <TabsList variant={variant}>
        <TabsTrigger value="cues">Cues</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="activity" disabled={disableLast}>Activity</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}

export const Primary: Story = {
  args: { variant: "primary" },
  render: () => (
    <Tabs defaultValue="cues" className="w-(--size-layout-frame-width)">
      <TabsList variant="primary">
        <TabsTrigger value="cues">Cues</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}

// Figma "Tabs/secondary": two equal segments, the selected one filled with the primary colour.
export const Secondary: Story = {
  args: { variant: "secondary" },
  render: () => (
    <Tabs defaultValue="cues" className="w-(--size-layout-frame-width)">
      <TabsList variant="secondary" className="w-(--size-share-full)">
        <TabsTrigger value="cues">Cues</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}
