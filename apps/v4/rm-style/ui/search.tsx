"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Spinner } from "@/rm-style/ui/spinner"
import { controlSize } from "./control"

// Pill-shaped search field. The wrapper draws the border and focus ring so the
// icons and the text share one outline.
const searchVariants = cva(
  "group flex w-full min-w-0 items-center rounded-(--radius-pill) border-(length:--border-width-default) bg-background text-(color:--field-label) transition-colors has-disabled:cursor-not-allowed has-disabled:border-control-disabled has-disabled:bg-surface-disabled has-disabled:text-text-disabled has-[input:read-only]:bg-surface-hover focus-within:border-field-focus focus-within:ring-(length:--focus-ring-width) focus-within:ring-primary-focus-ring",
  {
    variants: {
      size: controlSize,
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
  defaultValue,
  onValueChange,
  onClear,
  loading = false,
  placeholder = "Search",
  ...props
}: SearchProps) {
  // Works controlled (value) or on its own (defaultValue). The clear icon empties the field either way.
  const [inner, setInner] = React.useState(String(defaultValue ?? ""))
  const current = value ?? inner
  const hasValue = current.length > 0
  const inputRef = React.useRef<HTMLInputElement>(null)
  const change = (next: string) => {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }

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
        className="ml-(--spacing-inset-control-x) size-(--size-icon-md) shrink-0 text-field-placeholder"
      />
      <InputPrimitive
        type="search"
        data-slot="search-input"
        ref={inputRef}
        value={current}
        placeholder={placeholder}
        onChange={(event) => change(event.target.value)}
        className="h-full min-w-0 flex-1 bg-transparent px-(--spacing-inline-sm) outline-none placeholder:text-field-placeholder disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />
      {loading ? (
        <Spinner className="mr-(--spacing-inset-control-x) size-(--size-icon-sm) shrink-0 text-field-placeholder" />
      ) : hasValue ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            change("")
            onClear?.()
            inputRef.current?.focus()
          }}
          disabled={props.disabled}
          className="mr-(--spacing-inline-sm) flex shrink-0 items-center justify-center rounded-(--radius-pill) text-field-placeholder hover:text-(color:--field-label) disabled:pointer-events-none"
        >
          <XIcon aria-hidden className="size-(--size-icon-sm)" />
        </button>
      ) : null}
    </div>
  )
}

export { Search, searchVariants }
