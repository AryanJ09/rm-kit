"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "cn"

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerPrimitive.Root.Props & {
  showSwipeHandle?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-(--spacing-none) z-(--z-index-overlay) min-h-dvh bg-overlay-scrim opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-(--motion-duration-slow) ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-(--opacity-hidden) data-ending-style:duration-[calc(var(--drawer-swipe-strength)*var(--motion-duration-swipe))] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-(--opacity-hidden) data-swiping:duration-(--motion-duration-none) supports-backdrop-filter:backdrop-blur-xs supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "relative z-(--z-index-base) flex shrink-0 cursor-grab transition-opacity duration-(--motion-duration-normal) group-data-nested-drawer-open/drawer-popup:opacity-(--opacity-hidden) group-data-nested-drawer-swiping/drawer-popup:opacity-(--opacity-full) group-data-[swipe-axis=x]/drawer-popup:h-(--size-share-full) group-data-[swipe-axis=x]/drawer-popup:w-(--size-icon-3xs) group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=y]/drawer-popup:h-(--size-icon-3xs) group-data-[swipe-axis=y]/drawer-popup:w-(--size-share-full) group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-start after:block after:shrink-0 after:rounded-(--radius-pill) after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-(--size-96) group-data-[swipe-axis=x]/drawer-popup:after:w-(--spacing-inline-xs) group-data-[swipe-axis=y]/drawer-popup:after:h-(--spacing-inline-xs) group-data-[swipe-axis=y]/drawer-popup:after:w-(--size-96) active:cursor-grabbing",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-(--spacing-none) z-(--z-index-overlay) select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            // Base.
            "group/drawer-popup pointer-events-auto fixed z-(--z-index-overlay) m-(--drawer-inset,var(--spacing-none)) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,var(--spacing-none)),var(--translate-y,var(--spacing-none)),0)_scale(var(--stack-scale))] flex-col bg-popover text-(length:--font-size-sm) text-popover-foreground transition-[transform,height,opacity,filter] duration-(--motion-duration-slow) ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords] data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b",
            // Nested.
            "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
            // Bleed.
            "after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=x]:after:inset-y-(--spacing-none) data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:after:inset-x-(--spacing-none) data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-direction=down]:after:top-(--size-share-full) data-[swipe-direction=left]:after:right-(--size-share-full) data-[swipe-direction=right]:after:left-(--size-share-full) data-[swipe-direction=up]:after:bottom-(--size-share-full)",
            // Sizing.
            "[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-var(--size-96))] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:sm:[--drawer-content-width:var(--size-288)]",
            // Stack.
            "[--bleed:var(--size-icon-xl)] [--peek:var(--spacing-inline-lg)] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,var(--spacing-none)))] [--stack-peek-offset:max(var(--spacing-none),calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
            // Transitions.
            "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-(--opacity-full) data-ending-style:duration-[calc(var(--drawer-swipe-strength)*var(--motion-duration-swipe))] data-nested-drawer-swiping:duration-(--motion-duration-none) data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*var(--motion-duration-swipe))] data-starting-style:transform-(--closed-transform) data-swiping:duration-(--motion-duration-none) data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*var(--motion-duration-swipe))]",
            // Axis: y.
            "data-[swipe-axis=y]:inset-x-(--spacing-none) data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)",
            // Axis: x.
            "data-[swipe-axis=x]:inset-y-(--spacing-none) data-[swipe-axis=x]:flex-row",
            // Direction: down.
            "data-[swipe-direction=down]:bottom-(--spacing-none) data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,var(--spacing-none))+var(--spacing-stack-3xs)),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,var(--spacing-none))+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: up.
            "data-[swipe-direction=up]:top-(--spacing-none) data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,var(--spacing-none))-var(--spacing-stack-3xs)),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,var(--spacing-none))+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: left.
            "data-[swipe-direction=left]:left-(--spacing-none) data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,var(--spacing-none))-var(--spacing-stack-3xs)),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
            // Direction: right.
            "data-[swipe-direction=right]:right-(--spacing-none) data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,var(--spacing-none))+var(--spacing-stack-3xs)),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
            className
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-(--motion-duration-slow) ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-(--opacity-hidden) group-data-nested-drawer-swiping/drawer-popup:opacity-(--opacity-full) group-data-swiping/drawer-popup:select-none"
            )}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-(--spacing-stack-3xs) p-(--spacing-inline-lg) pb-(--spacing-none) group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-(--spacing-stack-3xs) md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-row items-center justify-end gap-(--spacing-inline-md) p-(--spacing-inline-lg) pt-(--spacing-none)", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "cn-font-heading text-(length:--font-size-base) font-(--typography-label-sm-font-weight) text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-(length:--font-size-sm) text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
