"use client"

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "cn"

import { Chip } from "@/rm-style/ui/chip"

// A labelled set of chips. multiple lets several chips be on at once (multi-choice);
// single keeps one on at a time (single choice). Use it inline, or inside a Sheet for large groups.
type FilterGroupOption = { value: string; label: string; disabled?: boolean }

type FilterGroupProps = {
  label?: string
  helper?: string
  options: FilterGroupOption[]
  type?: "multiple" | "single"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  size?: "sm" | "md"
  className?: string
}

function FilterGroup({
  label,
  helper,
  options,
  type = "multiple",
  value,
  defaultValue,
  onValueChange,
  size = "sm",
  className,
}: FilterGroupProps) {
  return (
    <div
      data-slot="filter-group"
      className={cn("flex w-full min-w-0 flex-col gap-(--field-label-gap)", className)}
    >
      {label ? (
        <span className="text-(length:--ds-typography-font-size-12) font-medium text-field-label">{label}</span>
      ) : null}
      <ToggleGroupPrimitive
        aria-label={label}
        multiple={type === "multiple"}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className="flex flex-wrap gap-(--ds-spacing-8)"
      >
        {options.map((option) => (
          <Chip key={option.value} value={option.value} disabled={option.disabled} size={size}>
            {option.label}
          </Chip>
        ))}
      </ToggleGroupPrimitive>
      {helper ? (
        <span className="text-(length:--ds-typography-font-size-12) text-field-helper">{helper}</span>
      ) : null}
    </div>
  )
}

export { FilterGroup, type FilterGroupProps }
