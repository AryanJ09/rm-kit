"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "cn"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  anchor,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "anchor"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        className="isolate z-(--z-index-overlay)"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-(--z-index-overlay) flex w-(--size-288) origin-(--transform-origin) flex-col gap-(--spacing-inset-md) rounded-(--radius-lg) bg-popover p-(--spacing-inset-md) text-(length:--font-size-sm) text-popover-foreground shadow-(--elevation-popover) ring-(length:--border-width-default) ring-foreground/[calc(var(--opacity-faint)*100%)] outline-hidden duration-(--motion-duration-fast) data-[side=bottom]:slide-in-from-top-(length:--motion-distance-sm) data-[side=inline-end]:slide-in-from-left-(length:--motion-distance-sm) data-[side=inline-start]:slide-in-from-right-(length:--motion-distance-sm) data-[side=left]:slide-in-from-right-(length:--motion-distance-sm) data-[side=right]:slide-in-from-left-(length:--motion-distance-sm) data-[side=top]:slide-in-from-bottom-(length:--motion-distance-sm) data-open:animate-in data-open:fade-in-(--opacity-hidden) data-open:zoom-in-(--motion-scale-enter) data-closed:animate-out data-closed:fade-out-(--opacity-hidden) data-closed:zoom-out-(--motion-scale-enter)",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-(--spacing-stack-3xs) text-(length:--font-size-sm)", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-(--typography-title-sm-font-weight)", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
