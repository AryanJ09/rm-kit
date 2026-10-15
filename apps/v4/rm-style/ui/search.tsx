"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Spinner } from "@/rm-style/ui/spinner"

// Pill-shaped search field. The wrapper draws the border and focus ring so the
// icons and the text share one outline.
const searchVariants = cva(
  "group flex w-full min-w-0 items-center rounded-(--ds-radius-full) border-(length:--field-border-width) bg-background text-field-label transition-colors has-disabled:cursor-not-allowed has-disabled:bg-surface-disabled has-disabled:text-text-disabled has-[input:read-only]:bg-surface-hover focus-within:border-field-focus focus-within:ring-(length:--field-focus-ring-width) focus-within:ring-primary-focus-ring",
  {
    variants: {
      size: {
        sm: "h-(--field-height-sm) text-sm",
        md: "h-(--field-height-md) text-base",
        lg: "h-(--field-height-lg) text-lg",
      },
      state: {
        default: "border-field-stroke",
        error: "border-field-error",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
)

type SearchProps = Omit<React.ComponentProps<"input">, "size" | "onChange"> &
  VariantProps<typeof searchVariants> & {
    value?: string
    onValueChange?: (value: string) => void
    onClear?: () => void
    loading?: boolean
  }

function Search({
  className,
  size,
  state,
  value,
  onValueChange,
  onClear,
  loading = false,
  placeholder = "Search",
  ...props
}: SearchProps) {
  const hasValue = typeof value === "string" && value.length > 0

  return (
    <div
      data-slot="search"
      data-size={size}
      data-state={state}
      aria-busy={loading || undefined}
      className={cn(searchVariants({ size, state }), className)}
    >
      <SearchIcon
        aria-hidden
        className="ml-(--field-padding-x) size-(--field-icon-size) shrink-0 text-field-placeholder"
      />
      <InputPrimitive
        type="search"
        data-slot="search-input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange?.(event.target.value)}
        className="h-full min-w-0 flex-1 bg-transparent px-(--ds-spacing-8) outline-none placeholder:text-field-placeholder disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />
      {loading ? (
        <Spinner className="mr-(--field-padding-x) size-(--field-icon-size) shrink-0 text-field-placeholder" />
      ) : hasValue && onClear ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          disabled={props.disabled}
          className="mr-(--ds-spacing-8) flex shrink-0 items-center justify-center rounded-(--ds-radius-full) text-field-placeholder hover:text-field-label disabled:pointer-events-none"
        >
          <XIcon aria-hidden className="size-(--field-icon-size)" />
        </button>
      ) : null}
    </div>
  )
}

export { Search, searchVariants }
