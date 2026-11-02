// Hand-written from Figma "Sidebar" (313:20399) and "Sidebar-menu". Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Briefcase, LogOut } from "lucide-react"

import { Sidebar, SidebarInset, SidebarMenu, SidebarProvider, SidebarTrigger } from "@/rm-style/ui/application-shell/sidebar"
import { DemoSidebar, MenuItem } from "./support/demo-sidebar"

// Storybook preview window sizes (device widths for the toolbar, not styling, so they are plain numbers here).
// Below the mobile breakpoint the sidebar becomes the mobile sheet, so each story sets its own canvas width.
const viewports = {
  rmDesktop: { name: "RM desktop", styles: { width: "1280px", height: "800px" } }, // rules-allow: preview window size
  rmMobile: { name: "RM mobile", styles: { width: "375px", height: "740px" } }, // rules-allow: preview window size
}

const meta = {
  title: "RM Kit/Application shell/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { options: viewports } },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// Desktop: one edge toggle; the panel collapses to an icon rail.
export const Desktop: Story = {
  globals: { viewport: { value: "rmDesktop", isRotated: false } },
  render: () => (
    <SidebarProvider className="min-h-svh">
      <DemoSidebar />
      <SidebarInset />
    </SidebarProvider>
  ),
}

// Mobile: one blue hamburger in the header opens the panel as a sheet with the token overlay.
export const Mobile: Story = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  render: () => (
    <SidebarProvider className="min-h-svh">
      <DemoSidebar />
      <SidebarInset>
        <header className="flex items-center border-b border-border p-(--spacing-inline-md)">
          <SidebarTrigger className="text-primary" />
        </header>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Sidebar-menu: the four states side by side, as in the Figma component.
export const MenuStates: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex w-(--size-288) flex-col p-(--spacing-group)">
        <SidebarMenu className="gap-(--spacing-inline-md)">
          <MenuItem icon={<Briefcase />} label="Default" />
          <MenuItem state="selected" icon={<Briefcase />} label="Selected" />
          <MenuItem state="disabled" icon={<Briefcase />} label="Disabled" />
          <MenuItem state="destructive" icon={<LogOut />} label="Sign out" />
        </SidebarMenu>
      </div>
    </SidebarProvider>
  ),
}
