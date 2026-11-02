"use client"

// RM Kit Bottom sheet: a Sheet docked to the bottom edge, as in the prototype. From the top: a drag handle bar, the title
// with a close button, a divider, the body (scrolls on its own) and a footer (sticky, under a divider, primary action last).
// Built on the existing Sheet, so the overlay and animation are shared. Everything is a semantic role.
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "./button"
import { Separator } from "./separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

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
  /** Buttons row, pinned under a divider. Primary action last. */
  footer?: React.ReactNode
}) {
  return (
    <SheetContent
      side="bottom"
      showCloseButton={false}
      className={cn(
        "mx-auto flex max-h-(--viewport-sheet-max-height) w-(--size-share-full) max-w-(--size-layout-frame-width) flex-col gap-(--spacing-inline-md) overflow-hidden rounded-t-(--radius-2xl) p-(--spacing-none)",
        className
      )}
      {...props}
    >
      <div data-slot="bottom-sheet-handle" aria-hidden className="mx-auto mt-(--spacing-inline-sm) h-(--size-track) w-(--size-control-32) shrink-0 rounded-(--radius-pill) bg-(color:--border-strong)" />
      <div data-slot="bottom-sheet-heading" className="flex shrink-0 items-center justify-between gap-(--spacing-inline-md) px-(--spacing-group)">
        <SheetTitle className="text-(length:--font-size-base) font-(--typography-heading-md-font-weight) text-text-primary">{title}</SheetTitle>
        <SheetClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" className="text-icon-default" />}>
          <XIcon />
        </SheetClose>
      </div>
      <SheetDescription className="sr-only">{description ?? ""}</SheetDescription>
      <div className="shrink-0 px-(--spacing-group)">
        <Separator />
      </div>
      <div data-slot="bottom-sheet-body" className="min-h-0 flex-1 overflow-y-auto px-(--spacing-group)">
        {children}
      </div>
      {footer && (
        <div data-slot="bottom-sheet-footer" className="shrink-0 px-(--spacing-group) pb-(--spacing-group)">
          <Separator />
          <div className="mt-(--spacing-inline-md) flex gap-(--spacing-inline-md) *:flex-1">{footer}</div>
        </div>
      )}
    </SheetContent>
  )
}

export { BottomSheet, BottomSheetTrigger, BottomSheetContent }
