"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"
import { useTokenPx } from "../lib/token-px"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const gap = useTokenPx({ offset: "--spacing-inline-xs" })
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset ?? gap.offset}
        className="isolate z-(--z-index-overlay)"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-(--z-index-overlay) inline-flex w-fit max-w-(--size-panel-xs) origin-(--transform-origin) items-center gap-(--spacing-stack-2xs) rounded-(--radius-md) bg-foreground px-(--spacing-inline-md) py-(--spacing-stack-2xs) text-(length:--font-size-xs) text-background has-data-[slot=kbd]:pr-(--spacing-stack-2xs) data-[side=bottom]:slide-in-from-top-(length:--motion-distance-sm) data-[side=inline-end]:slide-in-from-left-(length:--motion-distance-sm) data-[side=inline-start]:slide-in-from-right-(length:--motion-distance-sm) data-[side=left]:slide-in-from-right-(length:--motion-distance-sm) data-[side=right]:slide-in-from-left-(length:--motion-distance-sm) data-[side=top]:slide-in-from-bottom-(length:--motion-distance-sm) **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-(--z-index-overlay) **:data-[slot=kbd]:rounded-(--radius-sm) data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-(--opacity-hidden) data-[state=delayed-open]:zoom-in-(--motion-scale-enter) data-open:animate-in data-open:fade-in-(--opacity-hidden) data-open:zoom-in-(--motion-scale-enter) data-closed:animate-out data-closed:fade-out-(--opacity-hidden) data-closed:zoom-out-(--motion-scale-enter)",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="z-(--z-index-overlay) size-(--size-dot-md) translate-y-[calc(-50%-var(--spacing-stack-3xs))] rotate-45 rounded-(--radius-xs) bg-foreground fill-foreground data-[side=bottom]:top-(--spacing-inline-xs) data-[side=inline-end]:top-(--size-share-half)! data-[side=inline-end]:-left-(--spacing-inline-xs) data-[side=inline-end]:-translate-y-(--size-share-half) data-[side=inline-start]:top-(--size-share-half)! data-[side=inline-start]:-right-(--spacing-inline-xs) data-[side=inline-start]:-translate-y-(--size-share-half) data-[side=left]:top-(--size-share-half)! data-[side=left]:-right-(--spacing-inline-xs) data-[side=left]:-translate-y-(--size-share-half) data-[side=right]:top-(--size-share-half)! data-[side=right]:-left-(--spacing-inline-xs) data-[side=right]:-translate-y-(--size-share-half) data-[side=top]:-bottom-(--spacing-inset-md)" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
