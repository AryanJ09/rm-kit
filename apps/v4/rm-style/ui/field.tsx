"use client"

import { useMemo } from "react"
import { Label } from "./label"
import { Separator } from "./separator"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-(--spacing-inline-lg) has-[>[data-slot=checkbox-group]]:gap-(--spacing-inline-md) has-[>[data-slot=radio-group]]:gap-(--spacing-inline-md)",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-(--spacing-stack-2xs) font-(--typography-label-sm-font-weight) data-[variant=label]:text-(length:--font-size-sm) data-[variant=legend]:text-(length:--font-size-base)",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-(--size-share-full) flex-col gap-(--spacing-group) data-[slot=checkbox-group]:gap-(--spacing-inline-md) *:data-[slot=field-group]:gap-(--spacing-inline-lg)",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-(--size-share-full) gap-(--spacing-inline-sm) data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-(--size-share-full) [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-(--border-width-default)",
        responsive:
          "flex-col *:w-(--size-share-full) @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-(--border-width-default)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-(--spacing-stack-xs) leading-(--line-height-base)",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit group-data-[disabled=true]/field:opacity-(--opacity-disabled) has-data-checked:border-primary/[calc(var(--opacity-soft)*100%)] has-data-checked:bg-primary/[calc(var(--opacity-faint)*100%)] has-[>[data-slot=field]]:rounded-(--radius-lg) has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/[calc(var(--opacity-half)*100%)] has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-(length:--focus-ring-width) has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/[calc(var(--ring-opacity)*100%)] *:data-[slot=field]:p-(--spacing-inset-md) dark:has-data-checked:border-primary/[calc(var(--opacity-subtle)*100%)] dark:has-data-checked:bg-primary/[calc(var(--opacity-faint)*100%)]",
        "has-[>[data-slot=field]]:w-(--size-share-full) has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-(--spacing-inline-sm) text-(length:--font-size-sm) font-(--typography-label-sm-font-weight) group-data-[disabled=true]/field:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-(length:--font-size-sm) leading-(--line-height-base) font-(--typography-body-md-font-weight) text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-(--spacing-stack-2xs)",
        "last:mt-0 nth-last-2:-mt-(--spacing-stack-xs)",
        "[&>a]:underline [&>a]:underline-offset-(--spacing-inline-xs) [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-(--spacing-inline-sm) h-(--size-icon-md) text-(length:--font-size-sm) group-data-[variant=outline]/field-group:-mb-(--spacing-inline-sm)",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-(--spacing-none) top-(--size-share-half)" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-(--spacing-inline-sm) text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-(--spacing-inline-lg) flex list-disc flex-col gap-(--spacing-stack-xs)">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-(length:--font-size-sm) font-(--typography-body-md-font-weight) text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

// Action row at the end of a form. The primary action is always the last child and sits at the right:
// secondary actions first (Cancel, Reset), primary last (Submit, Save). Order in the DOM matches what the eye and keyboard see.
function FieldActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-actions"
      className={cn("flex w-(--size-share-full) items-center justify-end gap-(--spacing-inline-md)", className)}
      {...props}
    />
  )
}

export {
  Field,
  FieldActions,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
