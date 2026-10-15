import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

import { Spinner } from "@/rm-style/ui/spinner"

// One global size scale, shared with the form fields: sm = 40, md = 48 (default), lg = 56.
// Icon buttons are square at the same height. outline and link are kept as aliases so the
// shadcn demos render: outline reads as Secondary, link reads as Text (ghost).
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-(--ds-spacing-8) rounded-(--ds-radius-full) border-(length:--border-width-default) border-transparent font-sans text-(length:--typography-label-md-font-size) font-(--typography-label-md-font-weight) leading-(--typography-label-md-line-height) tracking-(--typography-label-md-letter-spacing) whitespace-nowrap transition-all outline-none select-none focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring data-focused:ring-(length:--ds-spacing-4) data-focused:ring-primary-focus-ring disabled:pointer-events-none disabled:border-transparent disabled:bg-surface-disabled disabled:text-text-disabled data-loading:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground data-pressed:bg-primary-pressed active:bg-primary-pressed",
        secondary: "border-primary bg-background text-primary data-pressed:bg-primary-subtle active:bg-primary-subtle data-focused:border-primary focus-visible:border-primary",
        ghost: "bg-background text-primary data-pressed:border-primary data-pressed:bg-primary-subtle active:border-primary active:bg-primary-subtle",
        outline: "border-primary bg-background text-primary data-pressed:bg-primary-subtle active:bg-primary-subtle",
        link: "bg-background text-primary data-pressed:border-primary data-pressed:bg-primary-subtle active:border-primary active:bg-primary-subtle",
      },
      size: {
        sm: "h-(--size-control-sm) px-(--ds-spacing-12) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        md: "h-(--size-control-md) px-(--ds-spacing-16) [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
        lg: "h-(--size-control-lg) px-(--ds-spacing-24) [&_svg:not([class*='size-'])]:size-(--size-icon-lg)",
        "icon-sm": "size-(--size-control-sm) px-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        "icon-md": "size-(--size-control-md) px-0 [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
        "icon-lg": "size-(--size-control-lg) px-0 [&_svg:not([class*='size-'])]:size-(--size-icon-lg)",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  loading = false,
  loadingLabel = "Please wait",
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    loadingLabel?: string
  }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) return event.preventDefault()
        onClick?.(event)
      }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner aria-hidden role="presentation" className="size-(--size-icon-md)" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
