"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/rm-style/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/rm-style/ui/command"
import { controlSize } from "./control"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select"
import { menuPanelClass } from "./menu"

// Field shell shared by Dropdown and Date picker triggers. Same look as Input:
// one blue focus, colours from semantic roles only.
const fieldTriggerVariants = cva(
  "flex w-full min-w-0 items-center justify-between gap-(--spacing-inline-sm) rounded-(--radius-lg) border-(length:--border-width-default) bg-background px-(--spacing-inset-control-x) text-left text-(color:--field-label) transition-colors outline-none focus-visible:border-field-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: controlSize,
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

// Options panel: the shared menu panel (rm-style/ui/menu.ts), as wide as the trigger.
const dropdownPanelClassName = cn(
  menuPanelClass,
  "w-(--anchor-width) gap-(--spacing-none) ring-(length:--spacing-none)"
)

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
    <div className="flex w-full min-w-0 flex-col gap-(--spacing-stack-2xs)">
      {label ? <span className="text-(length:--font-size-xs) font-(--typography-label-sm-font-weight) text-(color:--field-label)">{label}</span> : null}
      {children}
      {helper ? (
        <span className={cn("text-(length:--font-size-helper)", helperColor)}>{helper}</span>
      ) : null}
    </div>
  )
}

export type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
  /** select variant: options with the same group sit under one heading. */
  group?: string
}

// The list itself, without the popover. The story renders it static for the Open state; Dropdown renders it inside
// PopoverContent. There is no search box in here: when a dropdown is searchable, the field itself becomes the search
// (see Dropdown) and hands this list the already-filtered options.
function DropdownPanel({
  options,
  selected,
  emptyText = "No results",
  mode = "single",
  active,
  onActiveChange,
  onSelect,
  className,
}: {
  options: DropdownOption[]
  selected: string[]
  emptyText?: string
  /** single: the picked row is filled. multiple: filled rows also keep a tick at the end. */
  mode?: "single" | "multiple"
  /** Highlighted row (its label). Lets the search field move the highlight with the arrow keys. */
  active?: string
  onActiveChange?: (label: string) => void
  onSelect?: (value: string) => void
  className?: string
}) {
  return (
    <Command
      // The caller filters, so cmdk must not filter or reorder again.
      shouldFilter={false}
      value={active}
      onValueChange={onActiveChange}
      className={cn(
        "rounded-none bg-transparent p-0 text-(color:--field-label)",
        className
      )}
    >
      <CommandList className="max-h-none overflow-visible p-(--spacing-none)">
        <CommandEmpty className="px-(--spacing-inset-sm) py-(--spacing-inset-sm) text-(length:--font-size-sm) text-field-helper">
          {emptyText}
        </CommandEmpty>
        <CommandGroup className="p-0">
          {options.map((option) => {
            const checked = selected.includes(option.value)
            return (
              <CommandItem
                key={option.value}
                // cmdk highlights by value, so use the visible label.
                value={option.label}
                disabled={option.disabled}
                onSelect={() => onSelect?.(option.value)}
                data-checked={checked}
                aria-checked={checked}
                className="data-[checked=true]:bg-primary-subtle data-[checked=true]:text-primary-pressed"
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                {mode === "multiple" && checked ? <CheckIcon aria-hidden /> : null}
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// The three kinds of dropdown field. All share the label, helper, state, size and the menu look; they differ in how you choose.
//  default   a button that opens a list. Pick one, or several (mode="multiple"). Optional search in the field (searchable).
//  select    a button that opens a list for ONE value. Options can sit under group headings. No search, no multiple:
//            the plain "choose one" field for forms.
//  combobox  a text field you type into: the list filters as you type and the choice is committed from it. Several choices
//            (mode="multiple") show as chips inside the field.
type DropdownVariant = "default" | "select" | "combobox"

type DropdownProps = {
  id?: string
  variant?: DropdownVariant
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

const stateBorder = { default: "", success: "border-field-success", error: "border-field-error" } as const

// select variant: Base UI Select with the field look. One value, grouped options.
function SelectField({
  id, label, helper, placeholder, options, selected, onChange, state, size, disabled, className,
}: {
  id?: string; label?: string; helper?: string; placeholder: string; options: DropdownOption[]; selected: string[];
  onChange: (next: string[]) => void; state: FieldState; size: "sm" | "md" | "lg"; disabled: boolean; className?: string
}) {
  const current = selected[0] ?? null
  const display = options.find((o) => o.value === current)?.label
  const groups = options.reduce<{ name?: string; items: DropdownOption[] }[]>((acc, o) => {
    const g = acc.find((x) => x.name === o.group)
    if (g) g.items.push(o)
    else acc.push({ name: o.group, items: [o] })
    return acc
  }, [])
  const item = (o: DropdownOption) => (
    <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
      {o.label}
    </SelectItem>
  )
  return (
    <FieldShell label={label} helper={helper} state={state}>
      <Select value={current} onValueChange={(v) => v != null && onChange([String(v)])} disabled={disabled}>
        <SelectTrigger id={id} size={size} className={cn("w-full", stateBorder[state], className)}>
          <SelectValue>{display ?? <span className="text-field-placeholder">{placeholder}</span>}</SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} className="w-(--anchor-width)">
          {groups.map((g) =>
            g.name ? (
              <SelectGroup key={g.name}>
                <SelectLabel>{g.name}</SelectLabel>
                {g.items.map(item)}
              </SelectGroup>
            ) : (
              g.items.map(item)
            )
          )}
        </SelectContent>
      </Select>
    </FieldShell>
  )
}

// combobox variant: Base UI Combobox. Type to filter; the choice is committed from the list. Several choices become chips.
function ComboboxField({
  id, label, helper, placeholder, options, selected, onChange, state, size, mode, disabled, className,
}: {
  id?: string; label?: string; helper?: string; placeholder: string; options: DropdownOption[]; selected: string[];
  onChange: (next: string[]) => void; state: FieldState; size: "sm" | "md" | "lg"; mode: "single" | "multiple";
  disabled: boolean; className?: string
}) {
  const anchor = useComboboxAnchor()
  const labels = options.map((o) => o.label)
  const toLabels = (values: string[]) => options.filter((o) => values.includes(o.value)).map((o) => o.label)
  const toValues = (ls: string[]) => options.filter((o) => ls.includes(o.label)).map((o) => o.value)
  const list = (
    <>
      <ComboboxEmpty>No results</ComboboxEmpty>
      <ComboboxList>
        {(l: string) => (
          <ComboboxItem key={l} value={l} disabled={options.find((o) => o.label === l)?.disabled}>
            {l}
          </ComboboxItem>
        )}
      </ComboboxList>
    </>
  )
  return (
    <FieldShell label={label} helper={helper} state={state}>
      {mode === "multiple" ? (
        <Combobox multiple items={labels} value={toLabels(selected)} onValueChange={(ls) => onChange(toValues(ls as string[]))} disabled={disabled}>
          <ComboboxChips ref={anchor} className={cn("w-full", stateBorder[state], className)}>
            <ComboboxValue>
              {(values: string[]) => (
                <React.Fragment>
                  {values.map((v) => (
                    <ComboboxChip key={v}>{v}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput id={id} placeholder={values.length ? "" : placeholder} />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>{list}</ComboboxContent>
        </Combobox>
      ) : (
        <Combobox items={labels} value={toLabels(selected)[0] ?? null} onValueChange={(l) => onChange(l ? toValues([l as string]) : [])} disabled={disabled}>
          <ComboboxInput id={id} placeholder={placeholder} showClear className={cn("w-full", controlSize[size], stateBorder[state], className)} />
          <ComboboxContent>{list}</ComboboxContent>
        </Combobox>
      )}
    </FieldShell>
  )
}

function Dropdown({
  id,
  variant = "default",
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
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState<string | undefined>()
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const selected = value ?? internal

  function commit(next: string[]) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  if (variant === "select") {
    return (
      <SelectField id={id} label={label} helper={helper} placeholder={placeholder} options={options} selected={selected}
        onChange={commit} state={state} size={size} disabled={disabled} className={className} />
    )
  }
  if (variant === "combobox") {
    return (
      <ComboboxField id={id} label={label} helper={helper} placeholder={placeholder} options={options} selected={selected}
        onChange={commit} state={state} size={size} mode={mode} disabled={disabled} className={className} />
    )
  }

  const selectedLabels = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label)
  const display = selectedLabels.length ? selectedLabels.join(", ") : null

  // Searchable: the field is the search. Typing filters the options handed to the list.
  const visible =
    searchable && query
      ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
      : options
  const enabled = visible.filter((o) => !o.disabled)

  function close() {
    setOpen(false)
    setQuery("")
  }

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
    if (mode === "single") close()
  }

  const chevron = (
    <ChevronDownIcon
      aria-hidden
      className={cn(
        "size-(--size-icon-sm) shrink-0 text-field-helper transition-transform duration-(--motion-duration-normal) ease-(--motion-easing-standard)",
        open && "rotate-180"
      )}
    />
  )

  if (!searchable) {
    return (
      <FieldShell label={label} helper={helper} state={state}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            className={cn(fieldTriggerVariants({ size, state, open }), className)}
          >
            <span className={cn("min-w-0 flex-1 truncate", !display && "text-field-placeholder")}>
              {display ?? placeholder}
            </span>
            {chevron}
          </PopoverTrigger>
          <PopoverContent align="start" className={dropdownPanelClassName}>
            <DropdownPanel options={options} selected={selected} mode={mode} onSelect={handleSelect} />
          </PopoverContent>
        </Popover>
      </FieldShell>
    )
  }

  // Search mode. The field keeps the dropdown shape (not a pill). Pressing it turns the text into an input; a close icon
  // appears before the chevron and empties what was typed (then the selection, if nothing is typed).
  return (
    <FieldShell label={label} helper={helper} state={state}>
      <Popover
        open={open}
        onOpenChange={(next, details) => {
          // A press on the field itself is not an outside press.
          const target = (details?.event as Event | undefined)?.target as Node | undefined
          if (!next && target && anchorRef.current?.contains(target)) return
          if (next) setOpen(true)
          else close()
        }}
      >
        <div
          ref={anchorRef}
          data-slot="dropdown-search"
          data-open={open ? "" : undefined}
          aria-disabled={disabled || undefined}
          onClick={() => {
            if (disabled) return
            setOpen(true)
            inputRef.current?.focus()
          }}
          className={cn(
            fieldTriggerVariants({ size, state, open }),
            "cursor-text aria-disabled:cursor-not-allowed aria-disabled:border-control-disabled aria-disabled:bg-surface-disabled",
            className
          )}
        >
          <input
            ref={inputRef}
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-controls={open ? `${id ?? "dropdown"}-list` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            disabled={disabled}
            // Closed: shows the chosen value. Open: shows what is being typed, the chosen value waits as the placeholder.
            value={open ? query : (display ?? "")}
            placeholder={open ? (display ?? placeholder) : placeholder}
            onFocus={() => !disabled && setOpen(true)}
            onChange={(event) => {
              setOpen(true)
              setQuery(event.target.value)
              setActive(undefined)
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") return close()
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault()
                setOpen(true)
                if (!enabled.length) return
                const at = enabled.findIndex((o) => o.label === active)
                const step = event.key === "ArrowDown" ? 1 : -1
                setActive(enabled[(at + step + enabled.length) % enabled.length].label)
              }
              if (event.key === "Enter" && open) {
                event.preventDefault()
                const pick = enabled.find((o) => o.label === active) ?? enabled[0]
                if (pick) handleSelect(pick.value)
              }
            }}
            className={cn(
              "min-w-0 flex-1 truncate bg-transparent outline-none placeholder:text-field-placeholder disabled:cursor-not-allowed",
              !open && display && "text-(color:--field-label)"
            )}
          />
          {open ? (
            <button
              type="button"
              aria-label="Clear"
              // Keep focus in the input: a press on the icon must not close the list.
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.stopPropagation()
                if (query) setQuery("")
                else if (selected.length) {
                  if (value === undefined) setInternal([])
                  onValueChange?.([])
                }
                inputRef.current?.focus()
              }}
              className="flex shrink-0 items-center justify-center rounded-(--radius-pill) text-field-helper outline-none hover:text-(color:--field-label)"
            >
              <XIcon aria-hidden className="size-(--size-icon-sm)" />
            </button>
          ) : null}
          {chevron}
        </div>
        <PopoverContent
          align="start"
          anchor={anchorRef}
          // Focus stays in the field's input; the list is only looked at and chosen from.
          initialFocus={false}
          finalFocus={false}
          id={`${id ?? "dropdown"}-list`}
          className={dropdownPanelClassName}
        >
          <DropdownPanel
            options={visible}
            selected={selected}
            mode={mode}
            active={active ?? enabled[0]?.label}
            onActiveChange={setActive}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </FieldShell>
  )
}

export type { DropdownVariant }
export {
  Dropdown,
  DropdownPanel,
  FieldShell,
  dropdownPanelClassName,
  fieldTriggerVariants,
}
