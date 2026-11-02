import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-(--size-share-max) min-w-0 flex-col gap-(--spacing-inline-xs) group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-(--size-share-full)",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/[calc(var(--opacity-heavy)*100%)]",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-surface-active",
        muted:
          "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-surface-active",
        // tinted: the brand tint (primary-subtle), one step stronger on hover (accent).
        tinted:
          "*:data-[slot=bubble-content]:bg-primary-subtle *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        outline:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/[calc(var(--opacity-soft)*100%)]",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-(--spacing-none) [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/[calc(var(--opacity-half)*100%)]",
        destructive:
          "*:data-[slot=bubble-content]:bg-destructive/[calc(var(--opacity-faint)*100%)] *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/[calc(var(--opacity-subtle)*100%)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/[calc(var(--opacity-subtle)*100%)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/[calc(var(--opacity-soft)*100%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-(--size-share-full) min-w-0 overflow-hidden rounded-(--radius-xl) border border-transparent px-(--spacing-inline-md) py-(--spacing-inline-sm) text-(length:--font-size-sm) leading-(--line-height-lg) wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-(length:--focus-ring-width) [button,a]:focus-visible:ring-ring/[calc(var(--opacity-half)*100%)]",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

const bubbleReactionsVariants = cva(
  "absolute z-(--z-index-base) flex w-fit shrink-0 items-center justify-center gap-(--spacing-inline-xs) rounded-(--radius-pill) bg-muted px-(--spacing-stack-2xs) py-(--spacing-stack-3xs) text-(length:--font-size-sm) ring-(length:--focus-ring-width) ring-card has-[button]:p-(--spacing-none)",
  {
    variants: {
      side: {
        top: "top-(--spacing-none) -translate-y-(--size-share-three-quarters)",
        bottom: "bottom-(--spacing-none) translate-y-(--size-share-three-quarters)",
      },
      align: {
        start: "left-(--spacing-inline-md)",
        end: "right-(--spacing-inline-md)",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
