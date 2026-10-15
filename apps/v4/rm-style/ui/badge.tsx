import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-(--ds-spacing-4) overflow-hidden rounded-(--radius-sm) border border-transparent px-(--ds-spacing-8) font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-(--ds-size-10) [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive-subtle text-destructive",
        outline: "border-border text-foreground",
        ghost: "text-foreground",
        link: "text-primary",
        // Figma types: static labels with tokenised height and text. No hover, focus or link styling.
        conservative: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-conservative-background text-badge-conservative-foreground",
        moderate: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-moderate-background text-badge-moderate-foreground",
        growth: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-growth-background text-badge-growth-foreground",
        aggressive: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-aggressive-background text-badge-aggressive-foreground",
        secure: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-secure-background text-badge-secure-foreground",
        success: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-success-background text-badge-success-foreground",
        neutral: "h-(--ds-spacing-16) text-(length:--typography-micro-font-size) bg-badge-neutral-background text-badge-neutral-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
