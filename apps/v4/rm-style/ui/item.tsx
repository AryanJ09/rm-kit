import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Separator } from "./separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-(--size-share-full) flex-col gap-(--spacing-inline-lg) has-data-[size=sm]:gap-(--spacing-inset-md) has-data-[size=xs]:gap-(--spacing-inline-sm)",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-(--size-share-full) flex-wrap items-center rounded-(--radius-lg) border text-(length:--font-size-sm) transition-colors duration-(--motion-duration-fast) outline-none focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/[calc(var(--opacity-half)*100%)] [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/[calc(var(--opacity-half)*100%)]",
      },
      size: {
        default: "gap-(--spacing-inset-md) px-(--spacing-inline-md) py-(--spacing-inset-md)",
        sm: "gap-(--spacing-inset-md) px-(--spacing-inline-md) py-(--spacing-inset-md)",
        xs: "gap-(--spacing-inline-sm) px-(--spacing-inset-md) py-(--spacing-inline-sm) in-data-[slot=dropdown-menu-content]:p-(--spacing-none)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  })
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-(--spacing-inline-sm) group-has-data-[slot=item-description]/item:translate-y-(--spacing-stack-3xs) group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        image:
          "size-(--size-40) overflow-hidden rounded-(--radius-sm) group-data-[size=sm]/item:size-(--size-control-32) group-data-[size=xs]/item:size-(--size-icon-lg) [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-(--spacing-inline-xs) group-data-[size=xs]/item:gap-(--spacing-none) [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-(--spacing-inline-sm) text-(length:--font-size-sm) leading-(--line-height-sm) font-(--typography-label-sm-font-weight) underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-(length:--font-size-sm) leading-(--line-height-base) font-(--typography-body-md-font-weight) text-muted-foreground group-data-[size=xs]/item:text-(length:--font-size-xs) [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-(--size-share-full) items-center justify-between gap-(--spacing-inline-sm)",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-(--size-share-full) items-center justify-between gap-(--spacing-inline-sm)",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
