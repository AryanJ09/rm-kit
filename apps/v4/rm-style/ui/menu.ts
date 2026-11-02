// RM Kit menu look, from Figma "Options". The single source for every popup that lists options or actions:
// Dropdown menu, Context menu, Menubar, Select, Combobox, Command and the Dropdown field list all use these, so changing
// the menu look is done here once. Values are semantic roles only.

/** Panel: white, hairline border, soft shadow, 8px padding. Add width and height limits where it is used. */
export const menuPanelClass =
  "origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-(--radius-md) border-(length:--border-width-default) border-(--border-strong) bg-popover p-(--spacing-inline-sm) font-sans text-popover-foreground shadow-(--elevation-popover) duration-(--motion-duration-fast) outline-none data-[side=bottom]:slide-in-from-top-(length:--motion-distance-sm) data-[side=inline-end]:slide-in-from-left-(length:--motion-distance-sm) data-[side=inline-start]:slide-in-from-right-(length:--motion-distance-sm) data-[side=left]:slide-in-from-right-(length:--motion-distance-sm) data-[side=right]:slide-in-from-left-(length:--motion-distance-sm) data-[side=top]:slide-in-from-bottom-(length:--motion-distance-sm) data-open:animate-in data-open:fade-in-(--opacity-hidden) data-open:zoom-in-(--motion-scale-enter) data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-(--opacity-hidden) data-closed:zoom-out-(--motion-scale-enter)"

/**
 * Rounded corners for a filled row: at least --radius-sm. When a filled row touches another filled row (hover next to a
 * selected row, or two selected rows), the touching corners go square so the two read as one shape with one outer radius.
 * "Filled" is any of: highlighted (hover/keyboard), checked (Base UI "" and Dropdown "true") or selected (cmdk "true").
 */
const menuCornerClass =
  "rounded-(--radius-sm) has-[+[data-highlighted]]:rounded-b-none has-[+[data-checked='']]:rounded-b-none has-[+[data-checked=true]]:rounded-b-none has-[+[data-selected=true]]:rounded-b-none [[data-highlighted]+&]:rounded-t-none [[data-checked='']+&]:rounded-t-none [[data-checked=true]+&]:rounded-t-none [[data-selected=true]+&]:rounded-t-none"

/** Option row: 32px tall, 8px side padding. Hover and keyboard focus fill it; a selected row is filled the same way. */
export const menuRowClass =
  menuCornerClass + " relative flex h-(--size-control-32) cursor-default items-center gap-(--spacing-inline-sm) px-(--spacing-inline-sm) text-(length:--font-size-xs) text-text-primary outline-hidden select-none data-highlighted:bg-primary-subtle data-highlighted:text-primary-pressed data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)"

/** Add to a row that can be selected (radio, select item, combobox item). The selected fill. */
export const menuSelectedClass = "data-checked:bg-primary-subtle data-checked:text-primary-pressed data-selected:bg-primary-subtle data-selected:text-primary-pressed"

/** Destructive row: red text, pale red fill on hover. */
export const menuDestructiveClass =
  "data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive-subtle data-[variant=destructive]:data-highlighted:text-destructive"

/** Group label above rows. */
export const menuLabelClass = "px-(--spacing-inline-sm) py-(--spacing-stack-xs) text-(length:--font-size-helper) text-text-tertiary"

/** Divider between groups, running edge to edge of the panel padding. */
export const menuSeparatorClass = "-mx-(--spacing-inline-sm) my-(--spacing-stack-xs) h-(--border-width-default) bg-border"

/** Keyboard shortcut at the end of a row. */
export const menuShortcutClass = "ml-auto text-(length:--font-size-helper) tracking-(--letter-spacing-wide) text-text-tertiary"

/** Left padding for an inset row (aligned under rows that have an icon). */
export const menuInsetClass = "data-inset:pl-(--spacing-section-md)"
