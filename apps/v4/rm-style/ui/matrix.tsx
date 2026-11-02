"use client"

// RM Kit Matrix: a grid of tinted value tiles. Rows name a group (with an optional caption), columns name a bucket (a colour
// dot and a dotted-underlined heading; `hint` explains it in a tooltip). Each cell shows one value on a tile whose tint comes
// from its column's tone. Labels, values and tones are all data; the matrix names no product.
import * as React from "react"
import { cn } from "cn"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

// Tint and dot colour per tone, from the category roles.
const tones = {
  success: { tile: "bg-(color:--category-success-surface)", dot: "bg-(color:--category-success-text)" },
  aggressive: { tile: "bg-(color:--category-aggressive-surface)", dot: "bg-(color:--category-aggressive-text)" },
  growth: { tile: "bg-(color:--category-growth-surface)", dot: "bg-(color:--category-growth-text)" },
  moderate: { tile: "bg-(color:--category-moderate-surface)", dot: "bg-(color:--category-moderate-text)" },
  conservative: { tile: "bg-(color:--category-conservative-surface)", dot: "bg-(color:--category-conservative-text)" },
  secure: { tile: "bg-(color:--category-secure-surface)", dot: "bg-(color:--category-secure-text)" },
  neutral: { tile: "bg-(color:--category-neutral-surface)", dot: "bg-(color:--category-neutral-text)" },
} as const

type MatrixTone = keyof typeof tones
type MatrixColumn = { id: string; label: string; tone?: MatrixTone; hint?: string }
type MatrixRow = { id: string; label: string; caption?: string }

type MatrixProps = Omit<React.ComponentProps<"div">, "children"> & {
  columns: MatrixColumn[]
  rows: MatrixRow[]
  /** values[rowId][columnId] */
  values: Record<string, Record<string, React.ReactNode>>
  /** Makes each tile a button. */
  onCellClick?: (rowId: string, columnId: string) => void
}

function Matrix({ columns, rows, values, onCellClick, className, ...props }: MatrixProps) {
  return (
    <TooltipProvider>
    <div
      data-slot="matrix"
      role="table"
      className={cn("grid w-(--size-share-full) items-center gap-x-(--spacing-inline-sm) gap-y-(--spacing-inline-md)", className)}
      style={{ gridTemplateColumns: `auto repeat(${columns.length}, minmax(0, 1fr))` }}
      {...props}
    >
      <div role="row" className="contents">
        <span role="columnheader" aria-hidden />
        {columns.map((c) => {
          const tone = tones[c.tone ?? "neutral"]
          const heading = (
            <span className="flex flex-col items-center gap-(--spacing-stack-xs)">
              <span aria-hidden className={cn("size-(--spacing-inline-xs) rounded-(--radius-pill)", tone.dot)} />
              <span className="text-(length:--font-size-sm) leading-(--line-height-sm) text-foreground underline decoration-dotted underline-offset-(--spacing-stack-3xs)">
                {c.label}
              </span>
            </span>
          )
          return (
            <div key={c.id} role="columnheader" className="flex justify-center">
              {c.hint ? (
                <Tooltip>
                  <TooltipTrigger render={<button type="button" className="cursor-pointer" />}>{heading}</TooltipTrigger>
                  <TooltipContent>{c.hint}</TooltipContent>
                </Tooltip>
              ) : (
                heading
              )}
            </div>
          )
        })}
      </div>
      {rows.map((r) => (
        <div key={r.id} role="row" className="contents">
          <div role="rowheader" className="flex min-w-0 flex-col">
            <span className="text-(length:--font-size-sm) leading-(--line-height-sm) text-foreground">{r.label}</span>
            {r.caption && (
              <span className="text-(length:--font-size-sm) leading-(--line-height-sm) font-(--typography-label-md-font-weight) text-muted-foreground">{r.caption}</span>
            )}
          </div>
          {columns.map((c) => {
            const tile = cn(
              "flex w-(--size-share-full) items-center justify-center rounded-(--radius-sm) px-(--spacing-inline-xs) py-(--spacing-stack-xs) text-(length:--font-size-lg) leading-(--line-height-lg) font-(--typography-label-strong-font-weight) text-primary",
              tones[c.tone ?? "neutral"].tile
            )
            const value = values[r.id]?.[c.id]
            return (
              <div key={c.id} role="cell">
                {onCellClick ? (
                  <button type="button" className={cn(tile, "cursor-pointer")} onClick={() => onCellClick(r.id, c.id)}>
                    {value}
                  </button>
                ) : (
                  <span className={tile}>{value}</span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
    </TooltipProvider>
  )
}

export { Matrix, type MatrixProps, type MatrixColumn, type MatrixRow, type MatrixTone }
