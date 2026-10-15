import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// shadcn Badge structure, restyled from rm-style/theme.css.
// type = Figma Type; status = Figma Status (information, dot, icon). Only semantic tokens here.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-(--ds-spacing-4) overflow-hidden rounded-(--radius-sm) px-(--ds-spacing-8) py-(--ds-spacing-2) h-(--ds-spacing-16) font-sans text-(length:--ds-typography-font-size-10) font-(--font-weight-medium) whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-(--ds-spacing-8)",
  {
    variants: {
      type: {
        conservative: "bg-badge-conservative-background text-badge-conservative-foreground",
        moderate: "bg-badge-moderate-background text-badge-moderate-foreground",
        growth: "bg-badge-growth-background text-badge-growth-foreground",
        aggressive: "bg-badge-aggressive-background text-badge-aggressive-foreground",
        secure: "bg-badge-secure-background text-badge-secure-foreground",
        success: "bg-badge-success-background text-badge-success-foreground",
        neutral: "bg-badge-neutral-background text-badge-neutral-foreground",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
)

function Badge({
  className,
  type = "neutral",
  status = "information",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    status?: "information" | "dot" | "icon"
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-type={type}
      data-status={status}
      className={cn(badgeVariants({ type }), className)}
      {...props}
    >
      {status === "dot" && (
        <span
          data-slot="badge-dot"
          className="size-(--ds-spacing-8) shrink-0 rounded-(--ds-radius-full) bg-current"
        />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
