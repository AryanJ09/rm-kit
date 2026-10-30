import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-(--spacing-inline-xs) overflow-hidden rounded-(--radius-sm) border border-transparent px-(--spacing-inline-sm) font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-(--size-icon-3xs) [&>svg]:shrink-0",
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
        conservative: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-conservative-surface) text-(color:--category-conservative-text)",
        moderate: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-moderate-surface) text-(color:--category-moderate-text)",
        growth: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-growth-surface) text-(color:--category-growth-text)",
        aggressive: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-aggressive-surface) text-(color:--category-aggressive-text)",
        secure: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-secure-surface) text-(color:--category-secure-text)",
        success: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-success-surface) text-(color:--category-success-text)",
        neutral: "h-(--size-icon-md) text-(length:--font-size-xs) bg-(color:--category-neutral-surface) text-(color:--category-neutral-text)",
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
