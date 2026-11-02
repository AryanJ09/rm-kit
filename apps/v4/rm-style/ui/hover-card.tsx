"use client"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "cn"

import { useTokenPx } from "../lib/token-px"
import { menuPanelClass } from "./menu"

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

// A hover card is a popup, so it wears the shared RM panel look (menu.ts). Its offsets are read from the spacing role.
function HoverCardContent({
  className,
  side = "bottom",
  sideOffset,
  align = "center",
  alignOffset,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const gap = useTokenPx({ offset: "--spacing-inline-xs" })
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset ?? gap.offset}
        side={side}
        sideOffset={sideOffset ?? gap.offset}
        className="isolate z-(--z-index-overlay)"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            menuPanelClass,
            "z-(--z-index-overlay) w-(--size-288) p-(--spacing-inset-md) text-(length:--font-size-sm)",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
