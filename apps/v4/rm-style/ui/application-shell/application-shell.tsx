"use client"

// RM Kit Application shell: the fixed frame around every screen. Rebuilt from the OneDLS reference:
// sidebar navigation (logo, profile, items with badges, service items), a header with the customer context,
// notification bell and avatar, and one scrolling content slot.
// - mobile (default): the Shell header (avatar, greeting, bell, hamburger that opens the sidebar as a sheet), content, and the
//   bottom navigation. The bottom navigation exists only in this variant.
// - desktop: the persistent sidebar, header and content. No bottom navigation.
// Workspaces (e.g. Customer / Employee): two show as a segmented control, three or more as a dropdown, at the top of the
// sidebar (so on mobile it sits inside the hamburger menu).
// Landmarks: header (banner) sits outside the single <main>; the sidebar lists are labelled <nav>s; a skip link comes first.
// `framed` draws the shell like a device (border, radius, elevation) so it reads as an app on a neutral canvas.
// Built from the kit's own Sidebar, BottomNavigation, Tabs, Chip, DropdownMenu, Avatar, Badge and Button.
import * as React from "react"
import { BellIcon, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "../avatar"
import { Badge } from "../badge"
import { BottomNavigation, type BottomNavigationProps } from "./bottom-navigation"
import { Button } from "../button"
import { ShellHeader as MobileShellHeader, type ShellHeaderProps } from "./shell-header"
import { DropdownMenu, DropdownMenuChipTrigger, DropdownMenuContent, DropdownMenuItem } from "../dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "../tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarEdgeTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "./sidebar"

type ShellNavItem = {
  id: string
  label: string
  icon: LucideIcon
  /** Count shown at the end of the item. */
  badge?: number
  /** Red label and icon, e.g. "Exit customer account". */
  destructive?: boolean
  disabled?: boolean
}

type ShellWorkspace = {
  id: string
  label: string
  /** Sidebar items for this workspace. */
  items: ShellNavItem[]
  /** Items pinned at the bottom of the sidebar: help, exit. */
  serviceItems?: ShellNavItem[]
}

type ApplicationShellProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** mobile is the default and the primary layout. */
  variant?: "mobile" | "desktop"
  /** Header main line: the customer or screen the user is working on. */
  title: React.ReactNode
  /** Header second line, e.g. the customer reference number. */
  subtitle?: React.ReactNode
  /** mobile: the greeting in the Shell header ("Hi Lakshmesh"). Defaults to the title. */
  greeting?: React.ReactNode
  /** Initials in the header avatar. */
  initials?: string
  /** Unread count on the bell. Hidden at 0, shows 99+ above 99. */
  notificationCount?: number
  onNotificationsClick?: () => void
  /** Brand at the top of the sidebar. */
  logo?: React.ReactNode
  /** Signed-in user shown under the logo in the sidebar. */
  profile?: { name: React.ReactNode; detail?: React.ReactNode; initials: string }
  /** The workspaces the user can switch between. One workspace hides the switcher. */
  workspaces: ShellWorkspace[]
  /** Current workspace id. Omit to let the shell keep its own. */
  workspace?: string
  defaultWorkspace?: string
  onWorkspaceChange?: (id: string) => void
  /** Selected item id. Omit to let the shell keep its own selection. */
  activeItem?: string
  onActiveItemChange?: (id: string) => void
  /** Draw the shell like a device: border, rounded corners and elevation. Turn off for a full-screen app. */
  framed?: boolean
  /** mobile only: props for the bottom navigation. */
  navigation?: BottomNavigationProps
  /** mobile only: content under the header on the same gradient (summary tiles, search). Omit for the plain header. */
  hero?: React.ReactNode
  /** mobile only: a small centred note at the end of the content (brand line, version, date). */
  footerNote?: React.ReactNode
  /** mobile only: replaces the home bar with the white inside-page bar (back arrow, title), for pages opened from a destination. */
  insidePage?: Omit<Extract<ShellHeaderProps, { context: string }>, "context"> & {
    context?: "inside-page" | "client-detail" | "inside-page-description"
  }
}

// Sidebar item, Figma "Sidebar-menu": white pill with hairline border; selected has the pink fill.
const itemClass =
  "h-(--size-control-44) gap-(--spacing-inline-lg) rounded-(--radius-2xl) border-(length:--border-width-default) border-border bg-card p-(--spacing-inline-md) text-(length:--font-size-sm) font-[family-name:var(--font-family-base)] text-text-primary [&_svg]:size-(--size-icon-md)! [&_svg]:text-icon-accent data-active:bg-(color:--accent-subtle) disabled:text-text-disabled disabled:[&_svg]:text-text-disabled data-[destructive]:text-destructive group-data-[collapsible=icon]:mx-auto! group-data-[collapsible=icon]:size-(--size-control-44)! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:bg-card! group-data-[collapsible=icon]:p-(--spacing-none)! group-data-[collapsible=icon]:[&>span]:hidden"

function ShellItem({ item, active, onSelect }: { item: ShellNavItem; active: boolean; onSelect: () => void }) {
  const Icon = item.icon
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        disabled={item.disabled}
        data-destructive={item.destructive ? "" : undefined}
        className={itemClass}
        onClick={onSelect}
      >
        <Icon />
        <span>{item.label}</span>
      </SidebarMenuButton>
      {item.badge ? <SidebarMenuBadge className="top-1/2! right-(--spacing-inline-md)! -translate-y-1/2">{item.badge}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  )
}

// Two workspaces: segmented control. Three or more: dropdown. Hidden when collapsed to the icon rail.
function WorkspaceSwitcher({
  workspaces,
  value,
  onChange,
}: {
  workspaces: ShellWorkspace[]
  value: string
  onChange: (id: string) => void
}) {
  if (workspaces.length < 2) return null
  return (
    <div data-slot="workspace-switcher" className="group-data-[collapsible=icon]:hidden">
      {workspaces.length === 2 ? (
        <Tabs value={value} onValueChange={(v) => onChange(String(v))}>
          <TabsList variant="secondary" className="w-full">
            {workspaces.map((w) => (
              <TabsTrigger key={w.id} value={w.id}>
                {w.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : (
        <DropdownMenu>
          <DropdownMenuChipTrigger>{workspaces.find((w) => w.id === value)?.label}</DropdownMenuChipTrigger>
          <DropdownMenuContent>
            {workspaces.map((w) => (
              <DropdownMenuItem key={w.id} onClick={() => onChange(w.id)}>
                {w.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

function ShellSidebar({
  logo,
  profile,
  workspaces,
  workspace,
  onWorkspaceChange,
  active,
  onSelect,
}: Pick<ApplicationShellProps, "logo" | "profile" | "workspaces"> & {
  workspace: ShellWorkspace
  onWorkspaceChange: (id: string) => void
  active: string | undefined
  onSelect: (id: string) => void
}) {
  const { items, serviceItems } = workspace
  return (
    <Sidebar variant="floating" collapsible="icon" className="h-full">
      <SidebarHeader className="gap-(--spacing-inline-md) p-(--spacing-group)">
        {logo && <div className="group-data-[collapsible=icon]:hidden">{logo}</div>}
        <WorkspaceSwitcher workspaces={workspaces} value={workspace.id} onChange={onWorkspaceChange} />
        {profile && (
          <div className="flex gap-(--spacing-inline-md) group-data-[collapsible=icon]:justify-center">
            <Avatar>
              <AvatarFallback>{profile.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col gap-(--spacing-stack-xs) group-data-[collapsible=icon]:hidden">
              <span className="truncate text-(length:--typography-title-md-font-size) font-(--typography-heading-md-font-weight) text-text-primary">{profile.name}</span>
              {profile.detail && <span className="truncate text-(length:--font-size-helper) text-text-tertiary">{profile.detail}</span>}
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarSeparator className="mx-(--spacing-group)! w-auto! group-data-[collapsible=icon]:mx-(--spacing-inline-md)!" />
      <SidebarContent className="gap-(--spacing-inline-md) px-(--spacing-group) pt-(--spacing-inline-md) group-data-[collapsible=icon]:px-(--spacing-none)!">
        <SidebarGroup className="p-(--spacing-none)">
          <nav aria-label="Main">
            <SidebarMenu className="gap-(--spacing-inline-md)">
              {items.map((item) => (
                <ShellItem key={item.id} item={item} active={active === item.id} onSelect={() => onSelect(item.id)} />
              ))}
            </SidebarMenu>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      {serviceItems && serviceItems.length > 0 && (
        <SidebarFooter className="gap-(--spacing-inline-md) p-(--spacing-group) group-data-[collapsible=icon]:px-(--spacing-none)!">
          <SidebarSeparator className="mx-(--spacing-none)! w-auto! group-data-[collapsible=icon]:mx-(--spacing-inline-md)!" />
          <nav aria-label="Service">
            <SidebarMenu className="gap-(--spacing-inline-md)">
              {serviceItems.map((item) => (
                <ShellItem key={item.id} item={item} active={active === item.id} onSelect={() => onSelect(item.id)} />
              ))}
            </SidebarMenu>
          </nav>
        </SidebarFooter>
      )}
      <SidebarEdgeTrigger />
      <SidebarRail />
    </Sidebar>
  )
}

function DesktopHeader({
  title,
  subtitle,
  initials,
  notificationCount = 0,
  onNotificationsClick,
}: Pick<ApplicationShellProps, "title" | "subtitle" | "initials" | "notificationCount" | "onNotificationsClick">) {
  return (
    <header
      data-slot="application-shell-header"
      className="flex h-(--size-header-height) shrink-0 items-center justify-between gap-(--spacing-inline-md) border-b-(length:--border-width-default) border-border bg-card px-(--spacing-inline-lg)"
    >
      <div className="flex min-w-0 items-center gap-(--spacing-inline-sm)">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-(length:--typography-title-md-font-size) leading-(--typography-title-md-line-height) font-(--typography-title-md-font-weight) text-text-primary">
            {title}
          </span>
          {subtitle && (
            <span className="truncate text-(length:--font-size-xs) leading-(--line-height-xs) text-text-secondary">{subtitle}</span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-(--spacing-inline-md)">
        <Button variant="ghost" size="icon-md" aria-label="Notifications" className="relative" onClick={onNotificationsClick}>
          <BellIcon className="text-icon-default" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-(--spacing-stack-3xs) -right-(--spacing-stack-3xs) min-w-(--size-icon-md) bg-(color:--error) px-(--spacing-stack-xs) text-(color:--primary-foreground)">
              {notificationCount > 99 ? "99+" : notificationCount}
            </Badge>
          )}
        </Button>
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

// Mobile header: the Shell header, with its menu button wired to the sidebar sheet.
function MobileHeader({
  greeting,
  initials,
  onNotificationsClick,
  hero,
}: {
  greeting: React.ReactNode
  initials: string
  onNotificationsClick?: () => void
  hero?: React.ReactNode
}) {
  const { toggleSidebar } = useSidebar()
  const header = (
    <MobileShellHeader
      greeting={greeting}
      initials={initials}
      onNotificationsClick={onNotificationsClick}
      onMenuClick={toggleSidebar}
      transparent={!!hero}
    />
  )
  if (!hero) return header
  // With a hero, one gradient sits behind the header and the hero content.
  return (
    <div data-slot="shell-hero" className="flex shrink-0 flex-col gap-(--spacing-stack-2xs) bg-linear-to-r from-error to-icon-accent pb-(--spacing-inline-sm)">
      {header}
      {hero}
    </div>
  )
}

function ApplicationShell({
  variant = "mobile",
  title,
  subtitle,
  greeting,
  initials,
  notificationCount,
  onNotificationsClick,
  logo,
  profile,
  workspaces,
  workspace,
  defaultWorkspace,
  onWorkspaceChange,
  activeItem,
  onActiveItemChange,
  navigation,
  hero,
  footerNote,
  insidePage,
  framed = true,
  className,
  children,
  ...props
}: ApplicationShellProps) {
  const [innerWorkspace, setInnerWorkspace] = React.useState(defaultWorkspace ?? workspaces[0]?.id)
  const currentId = workspace ?? innerWorkspace
  const current = workspaces.find((w) => w.id === currentId) ?? workspaces[0]
  const [innerActive, setInnerActive] = React.useState<string | undefined>(current?.items[0]?.id)
  const active = activeItem ?? innerActive
  const mainId = React.useId()
  // The sidebar sheet opens inside this frame, never over the page around it.
  const [frame, setFrame] = React.useState<HTMLDivElement | null>(null)

  const switchWorkspace = (id: string) => {
    if (workspace === undefined) setInnerWorkspace(id)
    onWorkspaceChange?.(id)
    // a new workspace starts on its first item
    const next = workspaces.find((w) => w.id === id)
    if (activeItem === undefined) setInnerActive(next?.items[0]?.id)
  }
  const select = (id: string) => {
    if (activeItem === undefined) setInnerActive(id)
    onActiveItemChange?.(id)
  }
  const isDesktop = variant === "desktop"

  return (
    <div
      ref={setFrame}
      data-slot="application-shell"
      data-variant={variant}
      data-framed={framed ? "" : undefined}
      className={cn(
        // contain-layout: the sidebar is position:fixed, this keeps it inside the shell frame instead of the browser window
        "relative flex overflow-hidden bg-background contain-layout",
        // mobile has one standard size (width and height of the frame); it shrinks only when its parent is smaller
        framed
          ? cn("rounded-(--radius-2xl) border-(length:--border-width-default) border-border shadow-(--elevation-popover)", isDesktop ? "h-full" : "h-(--size-layout-frame-height) max-h-full")
          : "h-svh",
        isDesktop ? "w-full" : "mx-auto w-(--size-layout-frame-width) max-w-full",
        className
      )}
      {...props}
    >
      {/* skip link: first thing a keyboard user reaches, jumps past the navigation to the content */}
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-(--spacing-inline-sm) focus:left-(--spacing-inline-sm) focus:z-(--z-index-overlay) focus:rounded-(--radius-pill) focus:bg-card focus:px-(--spacing-inline-md) focus:py-(--spacing-inline-sm) focus:text-(length:--font-size-sm) focus:text-primary"
      >
        Skip to content
      </a>
      {/* mobile: the sidebar is always the sheet behind the hamburger, whatever the window width */}
      <SidebarProvider mobile={!isDesktop} portalContainer={frame} className="h-full min-h-0 w-full">
        {current && (
          <ShellSidebar
            logo={logo}
            profile={profile}
            workspaces={workspaces}
            workspace={current}
            onWorkspaceChange={switchWorkspace}
            active={active}
            onSelect={select}
          />
        )}
        <div className="flex h-full min-w-0 flex-1 flex-col">
          {isDesktop ? (
            <DesktopHeader
              title={title}
              subtitle={subtitle}
              initials={initials}
              notificationCount={notificationCount}
              onNotificationsClick={onNotificationsClick}
            />
          ) : insidePage ? (
            <div data-slot="shell-inside-header" className="shrink-0 p-(--spacing-inline-sm) pb-(--spacing-none)">
              <MobileShellHeader {...insidePage} context={insidePage.context ?? "inside-page"} />
            </div>
          ) : (
            <MobileHeader greeting={greeting ?? title} initials={initials ?? ""} onNotificationsClick={onNotificationsClick} hero={hero} />
          )}
          <main id={mainId} tabIndex={-1} className="min-h-0 flex-1 overflow-auto outline-none">
            {children}
            {!isDesktop && footerNote && (
              <div data-slot="shell-footer-note" className="px-(--spacing-inline-lg) pt-(--spacing-inline-lg) pb-(--spacing-stack-lg) text-center text-(length:--font-size-xs) text-field-helper">
                {footerNote}
              </div>
            )}
          </main>
          {!isDesktop && <BottomNavigation className="shrink-0" {...navigation} />}
        </div>
      </SidebarProvider>
    </div>
  )
}

export { ApplicationShell, type ApplicationShellProps, type ShellNavItem, type ShellWorkspace }
