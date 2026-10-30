// Hand-written from Figma "Private Banking/Avatar". Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { UserRound } from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/rm-style/ui/avatar"

// A flat placeholder picture so the image state can be seen without a file.
const photo =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23a5b3fc'/%3E%3Ccircle cx='20' cy='16' r='7' fill='white'/%3E%3Crect x='8' y='26' width='24' height='14' rx='7' fill='white'/%3E%3C/svg%3E"

type Args = {
  size: "sm" | "default" | "lg"
  initials: string
  image: boolean
  icon: boolean
  badge: boolean
}

const meta = {
  title: "RM Kit/Avatar",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { size: "default", initials: "LP", image: false, icon: false, badge: false },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default", "lg"], description: "sm 24, default 32, lg 48." },
    initials: { control: "text", description: "Shown when there is no picture." },
    image: { control: "boolean", description: "Show a picture instead of the initials." },
    icon: { control: "boolean", description: "Show an icon instead of the initials." },
    badge: { control: "boolean", description: "Status dot on the corner." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = {
  render: ({ size, initials, image, icon, badge }) => (
    <Avatar size={size}>
      {image && <AvatarImage src={photo} alt="" />}
      <AvatarFallback>{icon ? <UserRound /> : initials}</AvatarFallback>
      {badge && <AvatarBadge />}
    </Avatar>
  ),
}

// Figma sizes: 24, 32, 48.
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-inline-lg)">
      <Avatar size="sm"><AvatarFallback>LP</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>LP</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>LP</AvatarFallback></Avatar>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-inline-lg)">
      <Avatar size="sm"><AvatarFallback><UserRound /></AvatarFallback></Avatar>
      <Avatar><AvatarFallback><UserRound /></AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback><UserRound /></AvatarFallback></Avatar>
    </div>
  ),
}

export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-inline-lg)">
      <Avatar size="sm"><AvatarImage src={photo} alt="" /><AvatarFallback>LP</AvatarFallback></Avatar>
      <Avatar><AvatarImage src={photo} alt="" /><AvatarFallback>LP</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarImage src={photo} alt="" /><AvatarFallback>LP</AvatarFallback><AvatarBadge /></Avatar>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarFallback>LP</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MV</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}
