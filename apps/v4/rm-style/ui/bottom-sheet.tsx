"use client"

// RM Kit Bottom sheet: a Sheet docked to the bottom edge, with the Figma structure
// (heading + close, divider, body, divider, footer). Built on the existing Sheet, so overlay and animation stay shared.
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "cn"

import { Separator } from "@/styles/base-nova/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/styles/base-nova/ui/sheet"

const BottomSheet = Sheet
const BottomSheetTrigger = SheetTrigger

function BottomSheetContent({
  className,
  title,
  description,
  footer,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SheetContent>, "side" | "title"> & {
  title: React.ReactNode
  /** Read by screen readers only. */
  description?: string
  /** Buttons row, shown under a divider. */
  footer?: React.ReactNode
}) {
  return (
    <SheetContent
      side="bottom"
      showCloseButton={false}
      className={cn(
        "mx-auto max-h-(--viewport-sheet-max-height) w-full max-w-(--size-layout-frame-width) gap-(--spacing-inline-md) overflow-y-auto rounded-t-(--radius-2xl) p-(--spacing-group)",
        className
      )}
      {...props}
    >
      <div data-slot="bottom-sheet-heading" className="flex items-center justify-between">
        <SheetTitle className="text-(length:--font-size-base) font-(--typography-heading-md-font-weight) text-text-primary">{title}</SheetTitle>
        <SheetClose
          aria-label="Close"
          className="inline-flex size-(--size-icon-md) items-center justify-center rounded-(--radius-pill) text-text-tertiary outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring"
        >
          <XIcon className="size-(--size-icon-xs)" />
        </SheetClose>
      </div>
      <SheetDescription className="sr-only">{description ?? ""}</SheetDescription>
      <Separator />
      {children}
      {footer && (
        <>
          <Separator />
          <div data-slot="bottom-sheet-footer" className="flex gap-(--spacing-inline-md) *:flex-1">
            {footer}
          </div>
        </>
      )}
    </SheetContent>
  )
}

export { BottomSheet, BottomSheetTrigger, BottomSheetContent }
