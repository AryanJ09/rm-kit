import type { CSSProperties, ReactNode } from "react"
import { Fragment } from "react"

// Storybook version of a Figma variant grid: column headers, row labels, dashed purple dividers.
export function VariantGrid({
  columns,
  rows,
  cellWidth,
  cellHeight,
  cellClassName = "",
  labelWidth = 120,
  cell,
}: {
  columns: readonly string[]
  rows: readonly string[]
  cellWidth: number
  cellHeight: number
  cellClassName?: string
  labelWidth?: number
  cell: (column: string, row: string) => ReactNode
}) {
  const style = {
    "--set-line": "var(--category-conservative-text)",
    gridTemplateColumns: `${labelWidth}px repeat(${columns.length}, ${cellWidth}px)`,
    gridTemplateRows: `auto repeat(${rows.length}, ${cellHeight}px)`,
  } as CSSProperties
  const label = "text-(length:--font-size-xs) text-(--set-line)"

  return (
    <div
      className="relative grid w-full min-w-max p-(--spacing-inline-lg)"
      style={style}
    >
      <div />
      {columns.map((column) => (
        <div
          key={column}
          className={`${label} pb-(--spacing-inline-sm) text-center`}
        >
          {column}
        </div>
      ))}
      {rows.map((row, r) => (
        <Fragment key={row}>
          <div
            className={`${label} flex items-center justify-end pr-(--spacing-inline-md)`}
          >
            {row}
          </div>
          {columns.map((column, c) => (
            <div
              key={`${row}-${column}`}
              className={[
                "flex items-center justify-center border-dashed border-(--set-line) p-(--spacing-inline-xl)",
                cellClassName,
                r > 0 ? "border-t" : "",
                c > 0 ? "border-l" : "",
              ].join(" ")}
            >
              {cell(column, row)}
            </div>
          ))}
        </Fragment>
      ))}
      <div
        className="pointer-events-none absolute inset-(--spacing-none) rounded-(--radius-md) border border-dashed border-(--set-line)"
        style={{ gridColumn: "2 / -1", gridRow: "2 / -1" }}
      />
    </div>
  )
}
