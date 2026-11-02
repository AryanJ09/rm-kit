"use client"

// RM Kit Tabs. Two variants:
// - primary: label row with an underline on the active tab (this was the shadcn "line" variant).
// - secondary: segmented pill control from Figma "Tabs/secondary" (this was the shadcn "default" variant).
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function Tabs({
  className,
  ...props
}: Omit<TabsPrimitive.Root.Props, "orientation">) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "group/tabs flex flex-col gap-(--spacing-inline-sm)",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center",
  {
    variants: {
      variant: {
        primary: "gap-(--spacing-stack-xs) bg-transparent",
        secondary:
          "gap-(--spacing-stack-xs) rounded-(--radius-pill) bg-card p-(--spacing-stack-xs)",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

// Earlier code used the shadcn names: "line" is now "primary" and "default" is now "secondary".
const legacyVariant = { line: "primary", default: "secondary" } as const

function TabsList({
  className,
  variant = "primary",
  ...props
}: TabsPrimitive.List.Props & {
  variant?: VariantProps<typeof tabsListVariants>["variant"] | keyof typeof legacyVariant
}) {
  const resolved =
    variant && variant in legacyVariant
      ? legacyVariant[variant as keyof typeof legacyVariant]
      : ((variant ?? "primary") as "primary" | "secondary")
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={resolved}
      className={cn(tabsListVariants({ variant: resolved }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex flex-1 items-center justify-center gap-(--spacing-stack-2xs) font-sans text-(length:--typography-label-md-font-size) leading-(--typography-label-md-line-height) font-(--typography-label-md-font-weight) whitespace-nowrap transition-colors outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:pointer-events-none disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        // primary: text row, underline on the active tab
        "group-data-[variant=primary]/tabs-list:px-(--spacing-inline-md) group-data-[variant=primary]/tabs-list:py-(--spacing-inline-sm) group-data-[variant=primary]/tabs-list:text-text-tertiary group-data-[variant=primary]/tabs-list:data-active:text-primary",
        "after:absolute after:bg-primary after:opacity-(--opacity-hidden) after:transition-opacity group-data-[variant=primary]/tabs-list:data-active:after:opacity-(--opacity-full) after:inset-x-0 after:bottom-(--spacing-none) after:h-(--border-width-thick)",
        // secondary: pill segments, active segment filled
        "group-data-[variant=secondary]/tabs-list:rounded-(--radius-pill) group-data-[variant=secondary]/tabs-list:p-(--spacing-inline-md) group-data-[variant=secondary]/tabs-list:text-accent group-data-[variant=secondary]/tabs-list:data-active:bg-primary group-data-[variant=secondary]/tabs-list:data-active:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-(length:--font-size-sm) outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
