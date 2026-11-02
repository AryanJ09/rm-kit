"use client"

import { cn } from "cn"
import * as ResizablePrimitive from "react-resizable-panels"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-(--size-share-full) w-(--size-share-full) aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-(--border-width-default) items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-(--spacing-none) after:left-(--size-share-half) after:w-(--spacing-inline-xs) after:-translate-x-(--size-share-half) focus-visible:ring-(length:--border-width-default) focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-(--border-width-default) aria-[orientation=horizontal]:w-(--size-share-full) aria-[orientation=horizontal]:after:left-(--spacing-none) aria-[orientation=horizontal]:after:h-(--spacing-inline-xs) aria-[orientation=horizontal]:after:w-(--size-share-full) aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-(--size-share-half) [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-(--z-index-base) flex h-(--size-icon-lg) w-(--spacing-inline-xs) shrink-0 rounded-(--radius-lg) bg-border" />
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
