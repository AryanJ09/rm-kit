"use client"

import * as React from "react"
import { cn } from "cn"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/rm-style/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/rm-style/ui/popover"
import { FieldShell, fieldTriggerVariants } from "@/rm-style/ui/dropdown"

type DateTime = { hour: number; minute: number; period: "AM" | "PM" }

const defaultTime: DateTime = { hour: 12, minute: 0, period: "PM" }

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
})

// Writes the 12-hour clock time onto a date, keeping its day.
function withTime(base: Date, time: DateTime) {
  const next = new Date(base)
  const hour24 = (time.hour % 12) + (time.period === "PM" ? 12 : 0)
  next.setHours(hour24, time.minute, 0, 0)
  return next
}

function formatValue(
  mode: "single" | "range",
  value: Date | DateRange | undefined,
  enableTime: boolean
) {
  const fmt = (d: Date) =>
    enableTime
      ? `${dateFormat.format(d)}, ${d.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        })}`
      : dateFormat.format(d)

  if (mode === "range") {
    const range = value as DateRange | undefined
    if (!range?.from) return null
    return range.to ? `${fmt(range.from)} – ${fmt(range.to)}` : fmt(range.from)
  }
  return value instanceof Date ? fmt(value) : null
}

// Native selects keep keyboard and screen reader behaviour for free.
const timeSelectClassName =
  "h-(--field-height-sm) rounded-(--field-radius) border-(length:--field-border-width) border-field-stroke bg-background px-(--ds-spacing-8) text-sm text-field-label outline-none focus-visible:border-field-focus focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring"

type DatePickerProps = {
  id?: string
  label?: string
  helper?: string
  placeholder?: string
  mode?: "single" | "range"
  value?: Date | DateRange
  defaultValue?: Date | DateRange
  onValueChange?: (value: Date | DateRange | undefined) => void
  // Adds an hour, minute and AM/PM selector inside the popover.
  enableTime?: boolean
  state?: "default" | "success" | "error"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

function DatePicker({
  id,
  label,
  helper,
  placeholder = "Select date",
  mode = "single",
  value,
  defaultValue,
  onValueChange,
  enableTime = false,
  state = "default",
  size = "md",
  disabled = false,
  className,
}: DatePickerProps) {
  const [internal, setInternal] = React.useState<Date | DateRange | undefined>(
    defaultValue
  )
  const [open, setOpen] = React.useState(false)
  const [time, setTime] = React.useState<DateTime>(defaultTime)
  const current = value !== undefined ? value : internal

  function commit(next: Date | DateRange | undefined) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  // Applies the chosen time to any dates the user picks.
  function stamp(date: Date) {
    return enableTime ? withTime(date, time) : date
  }

  function handleSingle(date: Date | undefined) {
    commit(date ? stamp(date) : undefined)
    // With a time selector the popover stays open so the time can be set.
    if (!enableTime) setOpen(false)
  }

  function handleRange(range: DateRange | undefined) {
    if (!range) return commit(undefined)
    commit({
      from: range.from ? stamp(range.from) : undefined,
      to: range.to ? stamp(range.to) : undefined,
    })
  }

  // Changing the time rewrites the dates already chosen.
  function changeTime(next: DateTime) {
    setTime(next)
    if (!enableTime || !current) return
    if (current instanceof Date) {
      commit(withTime(current, next))
    } else {
      commit({
        from: current.from ? withTime(current.from, next) : undefined,
        to: current.to ? withTime(current.to, next) : undefined,
      })
    }
  }

  const display = formatValue(mode, current, enableTime)

  return (
    <FieldShell label={label} helper={helper} state={state}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
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
          <CalendarIcon
            aria-hidden
            className="size-(--field-icon-size) shrink-0 text-field-helper"
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto gap-(--ds-spacing-8) p-(--ds-spacing-8)"
        >
          {mode === "range" ? (
            <Calendar
              mode="range"
              selected={current as DateRange | undefined}
              onSelect={handleRange}
              defaultMonth={(current as DateRange | undefined)?.from}
            />
          ) : (
            <Calendar
              mode="single"
              selected={current instanceof Date ? current : undefined}
              onSelect={handleSingle}
              defaultMonth={current instanceof Date ? current : undefined}
            />
          )}
          {enableTime ? (
            <div className="flex items-center gap-(--ds-spacing-8) border-t border-field-stroke pt-(--ds-spacing-8)">
              <span className="text-sm text-field-label">Time</span>
              <select
                aria-label="Hour"
                className={timeSelectClassName}
                value={time.hour}
                onChange={(e) =>
                  changeTime({ ...time, hour: Number(e.target.value) })
                }
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                aria-label="Minute"
                className={timeSelectClassName}
                value={time.minute}
                onChange={(e) =>
                  changeTime({ ...time, minute: Number(e.target.value) })
                }
              >
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                aria-label="AM or PM"
                className={timeSelectClassName}
                value={time.period}
                onChange={(e) =>
                  changeTime({
                    ...time,
                    period: e.target.value as "AM" | "PM",
                  })
                }
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </FieldShell>
  )
}

export { DatePicker, formatValue, withTime }
export type { DatePickerProps, DateTime }
