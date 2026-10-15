import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { BottomNavCenterIcon } from "../icons/bottom-nav-center"

const bottomNavigationCentralButtonVariants = cva(
  "inline-flex size-(--ds-size-60) shrink-0 items-center justify-center rounded-(--ds-radius-full) transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default: "bg-nav-center-background active:bg-nav-center-pressed",
        pressed: "bg-nav-center-pressed",
        disabled: "bg-surface-disabled",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

type BottomNavigationCentralButtonProps = Omit<
  React.ComponentProps<"button">,
  "children"
> &
  VariantProps<typeof bottomNavigationCentralButtonVariants>

function BottomNavigationCentralButton({
  state = "default",
  className,
  disabled,
  ...props
}: BottomNavigationCentralButtonProps) {
  const isDisabled = state === "disabled" || disabled
  const resolvedState = isDisabled ? "disabled" : state

  return (
    <button
      type="button"
      data-slot="bottom-navigation-central-button"
      data-state={resolvedState}
      disabled={isDisabled}
      className={cn(
        bottomNavigationCentralButtonVariants({ state: resolvedState }),
        className
      )}
      {...props}
    >
      <BottomNavCenterIcon className="size-(--ds-size-icon-32) text-background" />
    </button>
  )
}

export {
  BottomNavigationCentralButton,
  bottomNavigationCentralButtonVariants,
  type BottomNavigationCentralButtonProps,
}
