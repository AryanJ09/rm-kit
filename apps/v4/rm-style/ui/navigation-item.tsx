import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const navigationItemVariants = cva(
  "flex w-(--ds-size-72) h-(--ds-size-74) flex-col items-center justify-center gap-(--ds-spacing-8) font-medium text-(length:--ds-typography-font-size-12) transition-colors outline-none focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed active:text-destructive",
  {
    variants: {
      state: {
        inactive: "text-field-helper",
        active: "text-destructive",
        pressed: "text-destructive",
        disabled: "text-text-disabled opacity-(--ds-opacity-50)",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
)

const navigationItemWellVariants = cva(
  "flex w-(--ds-size-icon-48) h-(--ds-size-icon-28) items-center justify-center rounded-(--ds-radius-full)",
  {
    variants: {
      state: {
        inactive: "bg-transparent active:bg-destructive-subtle",
        active: "bg-destructive-subtle",
        pressed: "bg-destructive-subtle",
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
        <Icon className="size-(--ds-size-icon-24)" aria-hidden="true" />
      </span>
      <span>{label}</span>
    </button>
  )
}

export { NavigationItem, navigationItemVariants, type NavigationItemProps }
