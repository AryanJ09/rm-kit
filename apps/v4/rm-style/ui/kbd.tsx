import { cn } from "cn"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-(--size-icon-md) w-fit min-w-(--size-icon-md) items-center justify-center gap-(--spacing-inline-xs) rounded-(--radius-sm) bg-muted px-(--spacing-inline-xs) font-sans text-(length:--font-size-xs) font-(--typography-label-sm-font-weight) text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-(--size-icon-3xs)",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-(--spacing-inline-xs)", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
