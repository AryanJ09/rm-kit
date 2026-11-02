"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/rm-style/ui/button"
import { Input } from "@/rm-style/ui/input"
import { Textarea } from "@/rm-style/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-(--size-control-md) w-full min-w-0 items-center rounded-(--radius-md) border-(length:--border-width-default) border-field-stroke bg-background text-(color:--field-label) transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-(length:--spacing-none) has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-field-focus has-[[data-slot=input-group-control]:focus-visible]:ring-(length:--focus-ring-width) has-[[data-slot=input-group-control]:focus-visible]:ring-primary-focus-ring has-[[data-slot][aria-invalid=true]]:border-field-error has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-(--spacing-inline-md) has-[>[data-align=block-start]]:[&>input]:pb-(--spacing-inline-md) has-[>[data-align=inline-end]]:[&>input]:pr-(--spacing-stack-2xs) has-[>[data-align=inline-start]]:[&>input]:pl-(--spacing-stack-2xs)",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-(--spacing-inline-sm) py-(--spacing-stack-2xs) text-(length:--font-size-sm) font-(--typography-label-sm-font-weight) text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-(--radius-sm) [&>svg:not([class*='size-'])]:size-(--size-icon-sm)",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-(--spacing-inline-sm) has-[>button]:-ms-(--spacing-inline-xs) has-[>kbd]:-ms-(--spacing-stack-3xs)",
        "inline-end":
          "order-last pr-(--spacing-inline-sm) has-[>button]:-me-(--spacing-inline-xs) has-[>kbd]:-me-(--spacing-stack-3xs)",
        "block-start":
          "order-first w-full justify-start px-(--spacing-inset-md) pt-(--spacing-inline-sm) group-has-[>input]/input-group:pt-(--spacing-inline-sm) [.border-b]:pb-(--spacing-inline-sm)",
        "block-end":
          "order-last w-full justify-start px-(--spacing-inset-md) pb-(--spacing-inline-sm) group-has-[>input]/input-group:pb-(--spacing-inline-sm) [.border-t]:pt-(--spacing-inline-sm)",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-(--spacing-inline-sm) text-(length:--font-size-sm) shadow-none",
  {
    variants: {
      size: {
        xs: "h-(--size-icon-lg) gap-(--spacing-inline-xs) rounded-(--radius-md) px-(--spacing-stack-2xs) [&>svg:not([class*='size-'])]:size-(--size-icon-xs)",
        sm: "",
        "icon-xs":
          "size-(--size-icon-lg) rounded-(--radius-md) p-(--spacing-none) has-[>svg]:p-(--spacing-none)",
        "icon-sm": "size-(--size-control-32) p-(--spacing-none) has-[>svg]:p-(--spacing-none)",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-(--spacing-inline-sm) text-(length:--font-size-sm) text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "size">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full flex-1 rounded-none border-(length:--spacing-none) bg-transparent shadow-none ring-(length:--spacing-none) focus-visible:ring-(length:--spacing-none) disabled:bg-transparent aria-invalid:ring-(length:--spacing-none) dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-(length:--spacing-none) bg-transparent py-(--spacing-inline-sm) shadow-none ring-(length:--spacing-none) focus-visible:ring-(length:--spacing-none) disabled:bg-transparent aria-invalid:ring-(length:--spacing-none) dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
