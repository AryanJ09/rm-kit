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
    "--set-line": "#9747ff",
    gridTemplateColumns: `${labelWidth}px repeat(${columns.length}, ${cellWidth}px)`,
    gridTemplateRows: `auto repeat(${rows.length}, ${cellHeight}px)`,
  } as CSSProperties
  const label = "text-(length:--ds-typography-font-size-12) text-(--set-line)"

  return (
    <div
      className="relative grid w-full min-w-max p-(--ds-spacing-16)"
      style={style}
    >
      <div />
      {columns.map((column) => (
        <div
          key={column}
          className={`${label} pb-(--ds-spacing-8) text-center`}
        >
          {column}
        </div>
      ))}
      {rows.map((row, r) => (
        <Fragment key={row}>
          <div
            className={`${label} flex items-center justify-end pr-(--ds-spacing-12)`}
          >
            {row}
          </div>
          {columns.map((column, c) => (
            <div
              key={`${row}-${column}`}
              className={[
                "flex items-center justify-center border-dashed border-(--set-line) p-(--ds-spacing-24)",
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
        className="pointer-events-none absolute inset-0 rounded-(--ds-radius-8) border border-dashed border-(--set-line)"
        style={{ gridColumn: "2 / -1", gridRow: "2 / -1" }}
      />
    </div>
  )
}
