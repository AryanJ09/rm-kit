"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/styles/base-nova/ui/button"
import { Input } from "@/styles/base-nova/ui/input"
import { Separator } from "@/styles/base-nova/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/styles/base-nova/ui/sheet"
import { Skeleton } from "@/styles/base-nova/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-nova/ui/tooltip"
import { MenuIcon, PanelLeftIcon } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  /** Collapsed rail currently opened by the pointer hovering it (not pinned open). */
  hoverOpen: boolean
  setHoverOpen: (hover: boolean) => void
  /** Set after the user collapses it: no hover-expand until the pointer leaves and comes back. */
  hoverLocked: boolean
  setHoverLocked: (locked: boolean) => void
  /** Where the mobile sheet opens. Undefined: the page. */
  portalContainer?: HTMLElement | null
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  mobile,
  portalContainer,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Force the mobile (sheet) or desktop behaviour instead of following the window width. */
  mobile?: boolean
  /** Mobile sheet opens inside this element instead of the page. */
  portalContainer?: HTMLElement | null
}) {
  const detectedMobile = useIsMobile()
  const isMobile = mobile ?? detectedMobile
  const [openMobile, setOpenMobile] = React.useState(false)
  const [hoverOpen, setHoverOpen] = React.useState(false)
  const [hoverLocked, setHoverLocked] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) return setOpenMobile((open) => !open)
    // Collapsing (from pinned or from a hover-open rail) stays collapsed until the pointer re-enters.
    if (open || hoverOpen) {
      setOpen(false)
      setHoverOpen(false)
      setHoverLocked(true)
      return
    }
    setOpen(true)
  }, [isMobile, open, hoverOpen, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open || hoverOpen ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      hoverOpen,
      setHoverOpen,
      hoverLocked,
      setHoverLocked,
      portalContainer,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, hoverOpen, hoverLocked, portalContainer]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={style}
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, open, setOpen, openMobile, setOpenMobile, hoverOpen, setHoverOpen, hoverLocked, setHoverLocked, portalContainer } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--size-288) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          showCloseButton={false}
          container={portalContainer}
          className="w-(--size-288)! bg-card p-(--spacing-none) font-[family-name:var(--font-family-base)] text-sidebar-foreground shadow-(--elevation-popover) [&>button]:hidden"
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-pinned={open}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      // Icon rail: hover opens it over the page; a click inside pins it open; the toggle collapses it again.
      onMouseEnter={() => {
        if (collapsible === "icon" && !open && !hoverLocked) setHoverOpen(true)
      }}
      onMouseLeave={() => {
        setHoverOpen(false)
        setHoverLocked(false)
      }}
      onClick={(event) => {
        if (!hoverOpen || open) return
        if ((event.target as HTMLElement).closest('[data-slot="sidebar-edge-trigger"]')) return
        setOpen(true)
      }}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--size-288) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          // Hover-open icon rail floats over the page: the layout gap keeps the rail width until it is pinned open.
          collapsible === "icon" &&
            "group-data-[pinned=false]:w-[calc(var(--size-control-44)+var(--spacing-group)*2)]",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--size-control-44)+var(--spacing-group)*2)]"
            : "group-data-[collapsible=icon]:w-(--size-control-md)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--size-288) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:-translate-x-full data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:translate-x-full md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-(--spacing-inline-sm) group-data-[collapsible=icon]:w-[calc(var(--size-control-44)+var(--spacing-group)*2)]"
            : "group-data-[collapsible=icon]:w-(--size-control-md) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="relative flex size-full flex-col bg-card group-data-[variant=floating]:rounded-(--radius-2xl) group-data-[variant=floating]:border-(length:--border-width-default) group-data-[variant=floating]:border-border group-data-[variant=floating]:shadow-(--elevation-card)"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {isMobile ? <MenuIcon /> : <PanelLeftIcon className="cn-rtl-flip" />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

// Desktop toggle that straddles the panel edge: half inside, half outside, fixed near the top.
// Hidden on mobile, where SidebarTrigger (hamburger) takes over.
function SidebarEdgeTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar, isMobile } = useSidebar()
  if (isMobile) return null

  return (
    <button
      data-sidebar="edge-trigger"
      data-slot="sidebar-edge-trigger"
      aria-label="Toggle Sidebar"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      className={cn(
        "absolute top-(--spacing-group) z-20 flex size-(--size-control-sm) items-center justify-center rounded-(--radius-pill) border-(length:--border-width-default) border-border bg-card text-sidebar-foreground outline-hidden hover:bg-(--surface-hover) focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring",
        // Expanded: straddle the panel edge. data-collapsible is empty only when expanded.
        "in-data-[collapsible=]:in-data-[side=left]:right-0 in-data-[collapsible=]:in-data-[side=left]:translate-x-1/2",
        "in-data-[collapsible=]:in-data-[side=right]:left-0 in-data-[collapsible=]:in-data-[side=right]:-translate-x-1/2",
        // Collapsed: Figma has no toggle on the icon rail, so hide it. SidebarRail or Cmd/Ctrl+B expands again.
        "in-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    >
      <PanelLeftIcon className="size-(--spacing-inline-lg) cn-rtl-flip" />
    </button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-(--spacing-inline-lg) transition-all ease-linear group-data-[side=left]:-right-(--spacing-inline-lg) group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-(--ring-width) hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-(--spacing-inline-sm)",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-(--spacing-inline-sm)",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-(--spacing-inline-sm) md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-(--radius-xl) md:peer-data-[variant=inset]:shadow-(--elevation-scale-sm) md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-(--size-control-32) w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-(--spacing-inline-sm) p-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-(--spacing-inline-sm) p-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-(--spacing-inline-sm) w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-(--spacing-none) overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-(--size-control-32) shrink-0 items-center rounded-(--radius-md) px-(--spacing-inline-sm) text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-(length:--focus-ring-width) [&>svg]:size-(--size-icon-sm) [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  })
}

function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-(--spacing-inset-nav) right-(--spacing-inline-md) flex aspect-square w-(--size-icon-md) items-center justify-center rounded-(--radius-md) p-(--spacing-none) text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-(--spacing-inline-sm) hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--focus-ring-width) md:after:hidden [&>svg]:size-(--size-icon-sm) [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  })
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-(length:--font-size-sm)", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-(--spacing-none)", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-(--spacing-inline-sm) overflow-hidden rounded-(--radius-md) p-(--spacing-inline-sm) text-left text-(length:--font-size-sm) ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-(--spacing-section-md) group-data-[collapsible=icon]:size-(--size-control-32)! group-data-[collapsible=icon]:p-(--spacing-inline-sm)! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--focus-ring-width) active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-(--typography-title-sm-font-weight) data-active:text-sidebar-accent-foreground [&_svg]:size-(--size-icon-sm) [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_var(--border-width-default)_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_var(--border-width-default)_var(--sidebar-accent)]",
      },
      size: {
        default: "h-(--size-control-32) text-(length:--font-size-sm)",
        sm: "h-(--size-control-28) text-(length:--font-size-xs)",
        lg: "h-(--size-control-md) text-(length:--font-size-sm) group-data-[collapsible=icon]:p-(--spacing-none)!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar()
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  })

  if (!tooltip) {
    return comp
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean
  }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-(--spacing-stack-2xs) right-(--spacing-stack-xs) flex aspect-square w-(--size-icon-md) items-center justify-center rounded-(--radius-md) p-(--spacing-none) text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-(--spacing-stack-2xs) peer-data-[size=lg]/menu-button:top-(--spacing-inset-md) peer-data-[size=sm]/menu-button:top-(--spacing-stack-xs) after:absolute after:-inset-(--spacing-inline-sm) hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--focus-ring-width) md:after:hidden [&>svg]:size-(--size-icon-sm) [&>svg]:shrink-0",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  })
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-(--spacing-stack-xs) flex h-(--size-icon-md) min-w-(--size-icon-md) items-center justify-center rounded-(--radius-md) px-(--spacing-stack-xs) text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-(--spacing-stack-2xs) peer-data-[size=lg]/menu-button:top-(--spacing-inset-md) peer-data-[size=sm]/menu-button:top-(--spacing-stack-xs) peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-(--size-control-32) items-center gap-(--spacing-inline-sm) rounded-(--radius-md) px-(--spacing-inline-sm)", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-(--size-icon-sm) rounded-(--radius-md)"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-(--size-icon-sm) max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-(--spacing-inset-nav) flex min-w-0 translate-x-px flex-col gap-(--spacing-stack-xs) border-l border-sidebar-border px-(--spacing-inset-md) py-(--spacing-stack-3xs) group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md"
    isActive?: boolean
  }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "flex h-(--size-control-28) min-w-0 -translate-x-px items-center gap-(--spacing-inline-sm) overflow-hidden rounded-(--radius-md) px-(--spacing-inline-sm) text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--focus-ring-width) active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-(length:--font-size-sm) data-[size=sm]:text-(length:--font-size-xs) data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-(--size-icon-sm) [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  })
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarEdgeTrigger,
  SidebarTrigger,
  useSidebar,
}
