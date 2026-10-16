import { XIcon } from "lucide-react"
import { cn } from "cn"

import { chipVariants } from "@/rm-style/ui/chip"

// An applied filter. It is a Chip in its selected look, with a remove control that only
// removes the filter; it is not a toggle, so it has no pressed state of its own.
type FilterProps = {
  label: string
  onRemove?: () => void
  size?: "sm" | "md" | "lg"
  className?: string
}

function Filter({ label, onRemove, size = "sm", className }: FilterProps) {
  return (
    <span
      data-slot="filter"
      data-size={size}
      className={cn(
        chipVariants({ size }),
        "border-(--chip-selected-stroke) bg-(--chip-selected-background) text-(--chip-selected-text)",
        onRemove ? "pe-(--ds-spacing-8)" : null,
        className
      )}
    >
      <span className="min-w-0 truncate">{label}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="flex size-(--ds-spacing-24) shrink-0 items-center justify-center rounded-(--ds-radius-full) text-(--chip-selected-text) transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring outline-none"
        >
          <XIcon aria-hidden className="size-(--size-icon-sm)" />
        </button>
      ) : null}
    </span>
  )
}

export { Filter, type FilterProps }
