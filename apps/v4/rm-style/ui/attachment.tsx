import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "./button"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-(--size-share-full) min-w-0 shrink-0 flex-wrap text-foreground transition-colors focus-within:ring-(length:--border-width-default) focus-within:ring-ring/[calc(var(--opacity-half)*100%)] has-[>a,>button]:hover:bg-muted/[calc(var(--opacity-half)*100%)]",
  {
    variants: {
      // inline: the prototype's attachment, a steel-blue file icon and its name on the surface. card: a bordered card (a dashed one while idle).
      appearance: {
        inline: "gap-(--spacing-inline-md)",
        card: "rounded-(--radius-xl) border bg-card data-[state=error]:border-destructive/[calc(var(--opacity-soft)*100%)] data-[state=idle]:border-dashed",
      },
      size: {
        default: "text-(length:--font-size-sm)",
        sm: "text-(length:--font-size-xs)",
        xs: "text-(length:--font-size-xs)",
      },
      orientation: {
        horizontal: "items-center",
        vertical: "w-(--size-96) flex-col has-data-[slot=attachment-content]:w-(--size-128)",
      },
    },
    compoundVariants: [
      { appearance: "card", orientation: "horizontal", className: "min-w-(--size-160)" },
      { appearance: "card", size: "default", className: "gap-(--spacing-inline-sm) has-data-[slot=attachment-content]:px-(--spacing-inset-md) has-data-[slot=attachment-content]:py-(--spacing-inline-sm) has-data-[slot=attachment-media]:p-(--spacing-inline-sm)" },
      { appearance: "card", size: "sm", className: "gap-(--spacing-inset-md) has-data-[slot=attachment-content]:px-(--spacing-inline-sm) has-data-[slot=attachment-content]:py-(--spacing-stack-2xs) has-data-[slot=attachment-media]:p-(--spacing-stack-2xs)" },
      { appearance: "card", size: "xs", className: "gap-(--spacing-stack-2xs) rounded-(--radius-lg) has-data-[slot=attachment-content]:px-(--spacing-stack-2xs) has-data-[slot=attachment-content]:py-(--spacing-inline-xs) has-data-[slot=attachment-media]:p-(--spacing-inline-xs)" },
    ],
    defaultVariants: { appearance: "inline" },
  }
)

function Attachment({
  className,
  state = "done",
  appearance = "inline",
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
      data-appearance={appearance}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ appearance, size, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square w-(--size-40) shrink-0 items-center justify-center overflow-hidden rounded-(--radius-lg) bg-muted text-foreground group-data-[appearance=inline]/attachment:aspect-auto group-data-[appearance=inline]/attachment:w-auto group-data-[appearance=inline]/attachment:bg-transparent group-data-[appearance=inline]/attachment:text-(color:--category-secure-text) group-data-[orientation=vertical]/attachment:w-(--size-share-full) group-data-[appearance=card]/attachment:group-data-[size=sm]/attachment:w-(--size-control-32) group-data-[appearance=card]/attachment:group-data-[size=xs]/attachment:w-(--size-control-28) group-data-[appearance=card]/attachment:group-data-[size=xs]/attachment:rounded-(--radius-md) group-data-[state=error]/attachment:bg-destructive/[calc(var(--opacity-faint)*100%)] group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-(--size-icon-lg)! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-(--size-icon-sm) group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-(--size-icon-lg) group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-(--size-icon-xs)",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-(--opacity-strong) group-data-[state=done]/attachment:opacity-(--opacity-full) group-data-[state=idle]/attachment:opacity-(--opacity-full) *:[img]:aspect-square *:[img]:w-(--size-share-full) *:[img]:object-cover",
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
        "max-w-(--size-share-full) min-w-0 flex-1 leading-(--line-height-sm) group-data-[orientation=vertical]/attachment:px-(--spacing-inline-xs)",
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
        "block max-w-(--size-share-full) min-w-0 truncate font-(--typography-label-sm-font-weight) group-data-[appearance=inline]/attachment:font-(--typography-caption-font-weight) group-data-[appearance=inline]/attachment:text-muted-foreground group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
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
        "mt-(--spacing-stack-3xs) block min-w-0 truncate text-(length:--font-size-xs) text-muted-foreground group-data-[state=error]/attachment:text-destructive/[calc(var(--opacity-heavy)*100%)]",
        "max-w-(--size-share-full)",
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
