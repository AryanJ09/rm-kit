import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

import { Spinner } from "@/rm-style/ui/spinner"

// shadcn Button structure, restyled from the brand Figma spec (Button.json).
// Type: default = Primary, secondary = Secondary, ghost = Text. Disabled is one shared spec.
// Focused and pressed use data-focused / data-pressed so docs can show them without interaction.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-(--ds-spacing-8) h-(--size-control-lg) rounded-(--ds-radius-full) border-(length:--border-width-default) border-transparent px-(--ds-spacing-16) font-sans text-(length:--typography-label-md-font-size) font-(--typography-label-md-font-weight) leading-(--typography-label-md-line-height) tracking-(--typography-label-md-letter-spacing) whitespace-nowrap transition-all outline-none select-none focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring data-focused:ring-(length:--ds-spacing-4) data-focused:ring-primary-focus-ring disabled:pointer-events-none disabled:border-transparent disabled:bg-surface-disabled disabled:text-text-disabled data-loading:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--ds-size-icon-16)",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground data-pressed:bg-primary-pressed active:bg-primary-pressed",
        secondary:
          "border-primary bg-background text-primary data-pressed:bg-primary-subtle active:bg-primary-subtle data-focused:border-primary focus-visible:border-primary",
        ghost:
          "bg-background text-primary data-pressed:border-primary data-pressed:bg-primary-subtle active:border-primary active:bg-primary-subtle",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
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
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, className }))}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) return event.preventDefault()
        onClick?.(event)
      }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner aria-hidden role="presentation" className="size-(--ds-size-icon-16)" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
