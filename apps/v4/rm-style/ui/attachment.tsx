import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/rm-style/ui/button"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-(--radius-xl) border bg-card text-card-foreground transition-colors focus-within:ring-(length:--border-width-default) focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          "gap-(--spacing-inline-sm) text-(length:--font-size-sm) has-data-[slot=attachment-content]:px-(--spacing-inset-md) has-data-[slot=attachment-content]:py-(--spacing-inline-sm) has-data-[slot=attachment-media]:p-(--spacing-inline-sm)",
        sm: "gap-(--spacing-inset-md) text-(length:--font-size-xs) has-data-[slot=attachment-content]:px-(--spacing-inline-sm) has-data-[slot=attachment-content]:py-(--spacing-stack-2xs) has-data-[slot=attachment-media]:p-(--spacing-stack-2xs)",
        xs: "gap-(--spacing-stack-2xs) rounded-(--radius-lg) text-(length:--font-size-xs) has-data-[slot=attachment-content]:px-(--spacing-stack-2xs) has-data-[slot=attachment-content]:py-(--spacing-inline-xs) has-data-[slot=attachment-media]:p-(--spacing-inline-xs)",
      },
      orientation: {
        horizontal: "min-w-(--size-160) items-center",
        vertical: "w-(--size-96) flex-col has-data-[slot=attachment-content]:w-(--size-128)",
      },
    },
  }
)

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square w-(--size-40) shrink-0 items-center justify-center overflow-hidden rounded-(--radius-lg) bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-(--size-control-32) group-data-[size=xs]/attachment:w-(--size-control-28) group-data-[size=xs]/attachment:rounded-(--radius-md) group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-(--size-icon-lg)! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-(--size-icon-sm) group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-(--size-icon-lg) group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-(--size-icon-xs)",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-(--spacing-inline-xs)",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block max-w-full min-w-0 truncate font-(--typography-label-sm-font-weight) group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "mt-(--spacing-stack-3xs) block min-w-0 truncate text-(length:--font-size-xs) text-muted-foreground group-data-[state=error]/attachment:text-destructive/80",
        "max-w-full",
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-(--z-index-base) flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-(--spacing-inline-md) group-data-[orientation=vertical]/attachment:right-(--spacing-inline-md) group-data-[orientation=vertical]/attachment:gap-(--spacing-inline-xs)",
        className
      )}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant,
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      className={cn("text-icon-default hover:text-foreground [&_svg]:text-icon-default", className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: render ? type : (type ?? "button"),
        className: cn("absolute inset-(--spacing-none) z-(--z-index-base) outline-none", className),
      },
      props
    ),
    render,
    state: {
      slot: "attachment-trigger",
    },
  })
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        "flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-(--spacing-inline-md) overflow-x-auto overscroll-x-contain py-(--spacing-inline-xs) *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
