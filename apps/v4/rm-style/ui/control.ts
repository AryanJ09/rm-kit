// RM Kit form control size and shell. Input, Search, Dropdown, Date picker, Select, Native select, Input group,
// Combobox, Textarea and Button all share the same height scale (sm, md, lg), so any mix of them in a form lines up.
// Change a control height here once.

/** Control height and text size. md is the default everywhere. */
export const controlSize = {
  sm: "h-(--size-control-sm) text-(length:--font-size-sm)",
  md: "h-(--size-control-md) text-(length:--font-size-sm)",
  lg: "h-(--size-control-lg) text-(length:--font-size-lg)",
} as const

/** Same scale as a minimum height, for controls that can grow (textarea, tag inputs). */
export const controlMinSize = {
  sm: "min-h-(--size-control-sm) text-(length:--font-size-sm)",
  md: "min-h-(--size-control-md) text-(length:--font-size-sm)",
  lg: "min-h-(--size-control-lg) text-(length:--font-size-lg)",
} as const

/** Border, radius, fill, text colour, focus and disabled look shared by field-style controls. */
export const controlShellClass =
  "rounded-(--radius-md) border-(length:--border-width-default) border-field-stroke bg-background px-(--spacing-inset-control-x) text-(color:--field-label) transition-colors outline-none focus-visible:border-field-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled aria-invalid:border-field-error"

export type ControlSize = keyof typeof controlSize
