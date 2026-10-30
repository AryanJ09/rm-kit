// Shared demo content for the sidebar stories (Sidebar, Application shell). Built from Figma "Sidebar" and "Sidebar-menu".
import { Briefcase, Circle, ClipboardList, LogOut, Settings } from "lucide-react"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/rm-style/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarEdgeTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/rm-style/ui/application-shell/sidebar"

export type MenuState = "default" | "selected" | "disabled" | "destructive"

// Sidebar-menu item states, from Figma. Hover applies to enabled states only.
// Figma gives no hover state, so none is styled here.
const stateClass: Record<MenuState, string> = {
  default: "bg-card text-text-primary [&_svg]:text-icon-accent",
  selected: "data-active:bg-(color:--accent-subtle) text-text-primary [&_svg]:text-icon-accent",
  disabled: "bg-card text-text-disabled [&_svg]:text-text-disabled pointer-events-none",
  destructive: "bg-card text-destructive [&_svg]:text-icon-accent",
}

// Collapsed rail (Figma "Sidebar/collapse"): icon-only squares, white fill, centred. `!` beats the library's collapsed rules.
const itemBase =
  "h-(--size-control-44) gap-(--spacing-inline-lg) rounded-(--radius-2xl) border-(length:--border-width-default) border-border p-(--spacing-inline-md) text-(length:--font-size-sm) font-[family-name:var(--font-family-base)] [&_svg]:size-(--size-icon-md)! group-data-[collapsible=icon]:mx-auto! group-data-[collapsible=icon]:size-(--size-control-44)! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:bg-card! group-data-[collapsible=icon]:p-(--spacing-none)! group-data-[collapsible=icon]:[&>span]:hidden"

export function MenuItem({
  state = "default",
  icon,
  label,
  onSelect,
}: {
  state?: MenuState
  icon: React.ReactNode
  label: string
  onSelect?: () => void
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        disabled={state === "disabled"}
        isActive={state === "selected"}
        onClick={onSelect}
        className={`${itemBase} ${stateClass[state]}`}
      >
        {icon}
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function Identity() {
  return (
    <div className="flex gap-(--spacing-inline-md) group-data-[collapsible=icon]:justify-center">
      <Avatar>
        <AvatarFallback>LP</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-(--spacing-stack-xs) group-data-[collapsible=icon]:hidden">
        <span className="text-(length:--font-size-base) font-(--typography-heading-md-font-weight) text-text-primary">Lakshmesh Prabhu</span>
        <span className="text-(length:--font-size-xs) text-text-primary">RM · BKC Branch</span>
        <span className="text-(length:--font-size-xs) text-text-tertiary">rm-1</span>
      </div>
    </div>
  )
}

export function DemoSidebar({ side = "left" }: { side?: "left" | "right" }) {
  // Enabled items are selectable: the clicked one becomes "selected", the others go back to "default".
  const [active, setActive] = React.useState("Tasks")
  const item = (label: string, icon: React.ReactNode) => (
    <MenuItem
      state={active === label ? "selected" : "default"}
      icon={icon}
      label={label}
      onSelect={() => setActive(label)}
    />
  )
  return (
    <Sidebar variant="floating" collapsible="icon" side={side}>
      <SidebarHeader className="gap-(--spacing-inline-md) p-(--spacing-group)">
        <Identity />
      </SidebarHeader>
      <SidebarSeparator className="mx-(--spacing-group)! w-auto! group-data-[collapsible=icon]:mx-(--spacing-inline-md)!" />
      <SidebarContent className="gap-(--spacing-inline-md) px-(--spacing-group) pt-(--spacing-inline-md) group-data-[collapsible=icon]:px-(--spacing-none)!">
        <SidebarGroup className="p-(--spacing-none)">
          <SidebarMenu className="gap-(--spacing-inline-md)">
            {item("Tasks", <ClipboardList />)}
            {item("My portfolio", <Briefcase />)}
            {item("Client map", <Circle />)}
            {item("RM playbook", <Circle />)}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="p-(--spacing-none)">
          <SidebarMenu className="gap-(--spacing-inline-md)">
            <MenuItem state="disabled" icon={<Circle />} label="Notifications" />
            <MenuItem state="disabled" icon={<Settings />} label="Settings" />
            <MenuItem state="disabled" icon={<Circle />} label="Help and support" />
            <MenuItem state="disabled" icon={<LogOut />} label="Sign out" />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-(--spacing-inline-md) p-(--spacing-group) group-data-[collapsible=icon]:px-(--spacing-none)!">
        <SidebarSeparator className="mx-(--spacing-none)! w-auto! group-data-[collapsible=icon]:mx-(--spacing-inline-md)!" />
        <SidebarGroupLabel className="h-auto p-(--spacing-none) text-(length:--font-size-helper) text-text-primary group-data-[collapsible=icon]:hidden!">
          DEMO TOOLS
        </SidebarGroupLabel>
        <SidebarMenu>
          {item("Seed demo data", <Circle />)}
        </SidebarMenu>
        <span className="text-(length:--font-size-helper) text-text-tertiary group-data-[collapsible=icon]:hidden">
          Version 2.0 · prototype
        </span>
      </SidebarFooter>
      <SidebarEdgeTrigger />
      <SidebarRail />
    </Sidebar>
  )
}

