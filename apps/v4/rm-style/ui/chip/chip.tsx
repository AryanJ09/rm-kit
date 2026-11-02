"use client"

// RM Kit Chip (a selectable filter option) is built on the existing Base UI toggle primitive. Keep the toggle foundation clear for agents.
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon, XIcon } from "lucide-react"
import * as React from "react"
import { cn } from "cn"

const chipVariants = cva(
  "group/chip inline-flex items-center justify-center gap-(--spacing-stack-2xs) rounded-(--radius-pill) border-(length:--border-width-default) border-(--border-strong) bg-transparent font-sans text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) whitespace-nowrap text-text-tertiary transition-colors outline-none hover:border-primary hover:bg-background hover:text-primary focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring data-pressed:border-primary data-pressed:bg-primary-subtle data-pressed:text-primary disabled:pointer-events-none disabled:border-border disabled:bg-surface-disabled disabled:text-text-disabled aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-(length:--border-width-default) border-input bg-transparent hover:bg-muted",
      },
      size: {
        default:
          "h-(--size-control-32) min-w-(--size-control-32) px-(--spacing-inline-md) py-(--spacing-inline-xs) has-data-[icon=inline-end]:pr-(--spacing-inline-sm) has-data-[icon=inline-start]:pl-(--spacing-inline-sm)",
        sm: "h-(--size-control-36) min-w-(--size-control-36) rounded-(--radius-sm) px-(--spacing-inset-md) text-(length:--font-size-xs) has-data-[icon=inline-end]:pr-(--spacing-stack-2xs) has-data-[icon=inline-start]:pl-(--spacing-stack-2xs) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        lg: "h-(--size-control-44) min-w-(--size-control-44) px-(--spacing-inset-md) has-data-[icon=inline-end]:pr-(--spacing-inline-sm) has-data-[icon=inline-start]:pl-(--spacing-inline-sm)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ChipProps = TogglePrimitive.Props &
  VariantProps<typeof chipVariants> & {
    /** Icon shown before the label. */
    icon?: React.ReactNode
    /** Shows a close icon after the label (while the chip is on). Pressing it removes the chip and calls this. */
    onRemove?: () => void
    /** Accessible name for the close icon. */
    removeLabel?: string
    /** Shows a chevron after the label: the chip opens a menu. Use with `selectable={false}`. */
    dropdown?: boolean
    /** true: the chip toggles on and off (filter, tab). false: it is a plain button (dropdown trigger, action). */
    selectable?: boolean
  }

function Chip({
  className,
  variant = "default",
  size = "default",
  icon,
  onRemove,
  removeLabel = "Remove",
  dropdown = false,
  selectable = true,
  children,
  ...props
}: ChipProps) {
  const content = (
    <>
      {icon}
      {children}
      {dropdown && (
        // Turns half a turn while its menu is open (aria-expanded / data-popup-open come from the menu trigger).
        <ChevronDownIcon
          data-icon="inline-end"
          className="transition-transform duration-(--motion-duration-normal) ease-(--motion-easing-standard) group-aria-expanded/chip:rotate-180 group-data-popup-open/chip:rotate-180"
        />
      )}
    </>
  )
  const classes = cn(chipVariants({ variant, size, className }))
  // The close icon removes the chip. The chip hides itself and also tells the caller (onRemove), so it works on its own
  // and when a parent keeps the list.
  const [removed, setRemoved] = React.useState(false)
  if (removed) return null

  // A close icon is its own button, so it cannot live inside the toggle button: the chip becomes a
  // wrapper holding the toggle and the close button side by side. The close icon only shows while the chip
  // is on (an applied filter); an off chip has no close icon.
  if (onRemove) {
    return (
      <span
        data-slot="chip"
        data-removable=""
        className={cn(
          classes,
          "gap-(--spacing-none) p-(--spacing-none) has-data-pressed:border-primary has-data-pressed:bg-primary-subtle has-data-pressed:text-primary"
        )}
      >
        <TogglePrimitive
          data-slot="chip-label"
          className="inline-flex h-(--size-share-full) items-center gap-(--spacing-inline-xs) rounded-(--radius-pill) pr-(--spacing-inline-md) pl-(--spacing-inline-md) outline-none group-has-data-pressed/chip:pr-(--spacing-none) focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring"
          {...props}
        >
          {content}
        </TogglePrimitive>
        <button
          type="button"
          data-slot="chip-remove"
          aria-label={removeLabel}
          onClick={() => {
            onRemove()
            setRemoved(true)
          }}
          className="hidden h-(--size-share-full) items-center justify-center rounded-(--radius-pill) pr-(--spacing-inline-md) pl-(--spacing-stack-2xs) outline-none group-has-data-pressed/chip:inline-flex focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring"
        >
          <XIcon className="size-(--size-icon-3xs)" />
        </button>
      </span>
    )
  }

  if (!selectable) {
    return (
      <button
        type="button"
        data-slot="chip"
        className={classes}
        {...(props as React.ComponentProps<"button">)}
      >
        {content}
      </button>
    )
  }

  return (
    <TogglePrimitive data-slot="chip" className={classes} {...props}>
      {content}
    </TogglePrimitive>
  )
}

export { Chip, chipVariants, type ChipProps }
