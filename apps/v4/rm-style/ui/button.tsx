import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

import { Spinner } from "@/rm-style/ui/spinner"

// One global size scale, shared with the form fields: sm = 40, md = 48 (default), lg = 56.
// Icon buttons are square at the same height. shadcn's names (outline, link, destructive, xs, default,
// xl, icon, icon-xs) are kept as aliases so its demos render at the kit scale; an unknown size would
// otherwise drop the height and padding silently.
const sm = "h-(--size-control-sm) px-(--ds-spacing-12) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)"
const md = "h-(--size-control-md) px-(--ds-spacing-16) [&_svg:not([class*='size-'])]:size-(--size-icon-md)"
const lg = "h-(--size-control-lg) px-(--ds-spacing-24) [&_svg:not([class*='size-'])]:size-(--size-icon-lg)"
const iconSm = "size-(--size-control-sm) px-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)"
const iconMd = "size-(--size-control-md) px-0 [&_svg:not([class*='size-'])]:size-(--size-icon-md)"
const iconLg = "size-(--size-control-lg) px-0 [&_svg:not([class*='size-'])]:size-(--size-icon-lg)"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-(--ds-spacing-8) rounded-(--ds-radius-full) border-(length:--border-width-default) border-transparent font-sans text-(length:--typography-label-md-font-size) font-(--typography-label-md-font-weight) leading-(--typography-label-md-line-height) tracking-(--typography-label-md-letter-spacing) whitespace-nowrap transition-all outline-none select-none focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring data-focused:ring-(length:--ds-spacing-4) data-focused:ring-primary-focus-ring disabled:pointer-events-none disabled:border-transparent disabled:bg-surface-disabled disabled:text-text-disabled data-loading:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground data-pressed:bg-primary-pressed active:bg-primary-pressed",
        secondary: "border-primary bg-background text-primary data-pressed:bg-primary-subtle active:bg-primary-subtle data-focused:border-primary focus-visible:border-primary",
        ghost: "bg-background text-primary data-pressed:border-primary data-pressed:bg-primary-subtle active:border-primary active:bg-primary-subtle",
        destructive: "bg-destructive text-destructive-foreground data-pressed:bg-destructive-pressed active:bg-destructive-pressed",
        outline: "border-primary bg-background text-primary data-pressed:bg-primary-subtle active:bg-primary-subtle",
        link: "bg-background text-primary data-pressed:border-primary data-pressed:bg-primary-subtle active:border-primary active:bg-primary-subtle",
      },
      size: {
        sm, md, lg,
        "icon-sm": iconSm,
        "icon-md": iconMd,
        "icon-lg": iconLg,
        // shadcn names, kept so its demos render at the kit scale instead of collapsing.
        xs: sm,
        default: md,
        xl: lg,
        icon: iconMd,
        "icon-xs": iconSm,
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
  render,
  nativeButton: _nativeButton,
  loading = false,
  loadingLabel = "Please wait",
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** base-ui style: render the button as another element, e.g. render={<a href="#" />}. */
    render?: React.ReactElement<Record<string, unknown>>
    /** Accepted for base-ui compatibility; a rendered link needs no extra handling. */
    nativeButton?: boolean
    loading?: boolean
    loadingLabel?: string
  }) {
  const Comp = asChild ? Slot.Root : "button"
  if (render) {
    return React.cloneElement(
      render,
      {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: cn(buttonVariants({ variant, size }), render.props.className as string | undefined, className),
        onClick,
        ...props,
      },
      children
    )
  }
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
          <Spinner aria-hidden role="presentation" className="size-(--size-icon-sm)" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
