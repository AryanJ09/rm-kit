import * as React from "react"
import { cardVariants } from "./card"
import { Badge } from "./badge"
import { Skeleton } from "./skeleton"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// "card": every item is a Card (Figma "Client cue group"): the trigger is the card header, the panel its body.
const AccordionVariant = React.createContext<"default" | "card">("default")
// Chevron colour: "accent" (the stock red) or "default" (the grey icon role). Both are kept.
const AccordionChevron = React.createContext<"accent" | "default">("accent")

function Accordion({
  className,
  variant = "default",
  chevron = "accent",
  ...props
}: AccordionPrimitive.Root.Props & {
  variant?: "default" | "card"
  chevron?: "accent" | "default"
}) {
  return (
    <AccordionChevron.Provider value={chevron}>
      <AccordionVariant.Provider value={variant}>
        <AccordionPrimitive.Root
          data-slot="accordion"
          data-variant={variant}
          className={cn(
            "flex w-(--size-share-full) flex-col",
            variant === "card" && "gap-(--spacing-inline-md)",
            className
          )}
          {...props}
        />
      </AccordionVariant.Provider>
    </AccordionChevron.Provider>
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  const card = React.useContext(AccordionVariant) === "card"
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        card ? cardVariants({ density: "default" }) : "not-last:border-b",
        className
      )}
      {...props}
    />
  )
}

/**
 * A section trigger. In the card variant it can also show what the section holds:
 * `count` shows as "(n)" after the title (the prototype writes it as text), `status` is a Badge, `icon` is optional. Plain variant: children only.
 */
function AccordionTrigger({
  className,
  children,
  icon,
  count,
  status,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  icon?: React.ReactNode
  count?: number
  status?: { label: string; variant?: React.ComponentProps<typeof Badge>["variant"] }
}) {
  const card = React.useContext(AccordionVariant) === "card"
  const iconColor =
    React.useContext(AccordionChevron) === "default"
      ? "text-icon-default"
      : "text-icon-accent"
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          card && "items-center! gap-(--spacing-inline-md) py-(--spacing-none)! hover:no-underline",
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-(--radius-lg) border border-transparent py-(--spacing-inset-md) text-left text-(length:--font-size-sm) font-(--typography-title-sm-font-weight) transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/[calc(var(--ring-opacity)*100%)] focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled) **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-(--size-icon-sm)",
          className
        )}
        {...props}
      >
        {card && icon && <span className="flex shrink-0 items-center text-icon-accent [&_svg]:size-(--size-icon-md)">{icon}</span>}
        <span className={cn("flex min-w-0 flex-1 items-center gap-(--spacing-inline-sm)", card && "text-(length:--font-size-base) font-(--typography-title-md-font-weight)")}>
          {children}
          {card && count !== undefined && <span className="font-(--typography-label-sm-font-weight) text-muted-foreground">({count})</span>}
          {card && status && <Badge variant={status.variant ?? "neutral"}>{status.label}</Badge>}
        </span>
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={cn(
            iconColor,
            "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
          )}
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className={cn(
            iconColor,
            "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  loading = false,
  ...props
}: AccordionPrimitive.Panel.Props & { loading?: boolean }) {
  const card = React.useContext(AccordionVariant) === "card"
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-(length:--font-size-sm) data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          card ? "pt-(--spacing-inline-md)" : "pt-0 pb-(--spacing-inset-md)",
          "h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-(--spacing-stack-md)",
          className
        )}
      >
        {loading ? (
          <div
            data-slot="accordion-skeleton"
            className="flex flex-col gap-(--spacing-stack-sm)"
            aria-label="Loading"
          >
            <Skeleton className="h-(--size-skeleton-line-height) w-(--size-share-full)" />
            <Skeleton className="h-(--size-skeleton-line-height) w-(--size-share-full)" />
            <Skeleton className="h-(--size-skeleton-line-height) w-(--size-skeleton-line-width)" />
          </div>
        ) : (
          children
        )}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
