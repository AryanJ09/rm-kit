import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const navigationItemVariants = cva(
  "flex w-(--size-72) h-(--size-nav-surface-height) flex-col items-center justify-center gap-(--spacing-stack-2xs) font-(--typography-label-sm-font-weight) text-(length:--font-size-xs) transition-colors outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed active:text-destructive",
  {
    variants: {
      state: {
        inactive: "text-field-helper",
        active: "text-destructive",
        pressed: "text-destructive",
        disabled: "text-text-disabled opacity-(--opacity-half)",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
)

const navigationItemWellVariants = cva(
  "flex w-(--size-icon-xl) h-(--size-control-28) items-center justify-center rounded-(--radius-pill)",
  {
    variants: {
      state: {
        inactive: "bg-transparent active:bg-(color:--accent-subtle)",
        active: "bg-(color:--accent-subtle)",
        pressed: "bg-(color:--accent-subtle)",
        disabled: "bg-transparent",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
)

type NavigationItemProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof navigationItemVariants> & {
    label: string
    icon: LucideIcon
  }

function NavigationItem({
  label,
  icon: Icon,
  state = "inactive",
  className,
  disabled,
  ...props
}: NavigationItemProps) {
  const isDisabled = state === "disabled" || disabled
  const resolvedState = isDisabled ? "disabled" : state

  return (
    <button
      type="button"
      data-slot="navigation-item"
      data-state={resolvedState}
      disabled={isDisabled}
      className={cn(navigationItemVariants({ state: resolvedState }), className)}
      {...props}
    >
      <span className={navigationItemWellVariants({ state: resolvedState })}>
        <Icon className="size-(--size-icon-lg)" aria-hidden="true" />
      </span>
      <span>{label}</span>
    </button>
  )
}

export { NavigationItem, navigationItemVariants, type NavigationItemProps }
