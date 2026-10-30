import { Skeleton } from "@/rm-style/ui/skeleton"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-(--spacing-inset-md) text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/[calc(var(--ring-opacity)*100%)] focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled) **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-(--size-icon-sm)",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="text-icon-accent pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="text-icon-accent pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
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
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-(--spacing-inset-md) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-(--spacing-stack-md)",
          className
        )}
      >
        {loading ? (
          <div
            data-slot="accordion-skeleton"
            className="flex flex-col gap-(--spacing-stack-sm)"
            aria-label="Loading"
          >
            <Skeleton className="h-(--size-skeleton-line-height) w-full" />
            <Skeleton className="h-(--size-skeleton-line-height) w-full" />
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
