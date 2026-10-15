"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/rm-style/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/rm-style/ui/command"

// Field shell shared by Dropdown and Date picker triggers. Same look as Input:
// one blue focus, colours from semantic roles only.
const fieldTriggerVariants = cva(
  "flex w-full min-w-0 items-center justify-between gap-(--ds-spacing-8) rounded-(--field-radius) border-(length:--field-border-width) bg-transparent px-(--field-padding-x) text-left text-field-label transition-colors outline-none focus-visible:border-field-focus focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: {
        sm: "h-(--field-height-sm) text-sm",
        md: "h-(--field-height-md) text-base",
        lg: "h-(--field-height-lg) text-lg",
      },
      state: {
        default: "border-field-stroke",
        success: "border-field-success",
        error: "border-field-error",
      },
      open: {
        true: "border-field-focus",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      open: false,
    },
  }
)

// Options panel: radius, border, shadow and padding all come from tokens.
const dropdownPanelClassName =
  "w-(--anchor-width) gap-0 rounded-(--dropdown-panel-radius) border-(length:--field-border-width) border-field-stroke bg-background p-(--dropdown-panel-padding) text-field-label shadow-(--dropdown-panel-shadow) ring-0"

type FieldState = "default" | "success" | "error"

// Label above, helper below. Shared with the Date picker.
function FieldShell({
  label,
  helper,
  state = "default",
  children,
}: {
  label?: string
  helper?: string
  state?: FieldState
  children: React.ReactNode
}) {
  const helperColor =
    state === "error"
      ? "text-field-error"
      : state === "success"
        ? "text-field-success"
        : "text-field-helper"

  return (
    <div className="flex w-full min-w-0 flex-col gap-(--field-label-gap)">
      {label ? <span className="text-sm text-field-label">{label}</span> : null}
      {children}
      {helper ? (
        <span className={cn("text-sm", helperColor)}>{helper}</span>
      ) : null}
    </div>
  )
}

export type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
}

// The list itself, without the popover. The story renders it static for the
// Open state; Dropdown renders it inside PopoverContent.
function DropdownPanel({
  options,
  selected,
  searchable = false,
  searchPlaceholder = "Search",
  emptyText = "No results",
  onSelect,
  className,
}: {
  options: DropdownOption[]
  selected: string[]
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  onSelect?: (value: string) => void
  className?: string
}) {
  return (
    <Command
      className={cn(
        "rounded-none bg-transparent p-0 text-field-label",
        className
      )}
    >
      {searchable ? (
        <CommandInput
          placeholder={searchPlaceholder}
          className="text-field-label placeholder:text-field-placeholder"
        />
      ) : null}
      <CommandList className="max-h-none overflow-visible p-0">
        <CommandEmpty className="px-(--dropdown-option-padding-x) py-(--dropdown-option-padding-y) text-sm text-field-helper">
          {emptyText}
        </CommandEmpty>
        <CommandGroup className="p-0">
          {options.map((option) => {
            const checked = selected.includes(option.value)
            return (
              <CommandItem
                key={option.value}
                // cmdk filters and highlights by value, so use the visible label.
                value={option.label}
                disabled={option.disabled}
                onSelect={() => onSelect?.(option.value)}
                // CommandItem draws its own check when data-checked is true.
                data-checked={checked}
                aria-checked={checked}
                className={cn(
                  "rounded-none px-(--dropdown-option-padding-x) py-(--dropdown-option-padding-y) text-sm text-field-label data-selected:bg-surface-hover data-disabled:text-text-disabled",
                  checked && "font-medium"
                )}
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

type DropdownProps = {
  id?: string
  label?: string
  helper?: string
  placeholder?: string
  options: DropdownOption[]
  mode?: "single" | "multiple"
  searchable?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  state?: FieldState
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

function Dropdown({
  id,
  label,
  helper,
  placeholder = "Select an option",
  options,
  mode = "single",
  searchable = false,
  value,
  defaultValue = [],
  onValueChange,
  state = "default",
  size = "md",
  disabled = false,
  className,
}: DropdownProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const selected = value ?? internal

  const selectedLabels = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label)
  const display = selectedLabels.length ? selectedLabels.join(", ") : null

  function handleSelect(optionValue: string) {
    const next =
      mode === "multiple"
        ? selected.includes(optionValue)
          ? selected.filter((v) => v !== optionValue)
          : [...selected, optionValue]
        : [optionValue]

    if (value === undefined) setInternal(next)
    onValueChange?.(next)
    // Single select closes on pick. Multi select stays open so several can be chosen.
    if (mode === "single") setOpen(false)
  }

  const Icon = open ? ChevronUpIcon : ChevronDownIcon

  return (
    <FieldShell label={label} helper={helper} state={state}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            fieldTriggerVariants({ size, state, open }),
            className
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              !display && "text-field-placeholder"
            )}
          >
            {display ?? placeholder}
          </span>
          <Icon
            aria-hidden
            className="size-(--field-icon-size) shrink-0 text-field-helper"
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={dropdownPanelClassName}
        >
          <DropdownPanel
            options={options}
            selected={selected}
            searchable={searchable}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </FieldShell>
  )
}

export {
  Dropdown,
  DropdownPanel,
  FieldShell,
  dropdownPanelClassName,
  fieldTriggerVariants,
}
