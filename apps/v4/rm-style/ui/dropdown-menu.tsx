"use client"

// RM Kit Dropdown menu, from Figma "Options": a white panel with a hairline border and soft shadow, holding 32px option
// rows. The hovered or selected row is filled with the primary subtle colour and its text turns primary pressed.
import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"
import { useTokenPx } from "../lib/token-px"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

import {
  menuDestructiveClass,
  menuInsetClass,
  menuLabelClass,
  menuPanelClass,
  menuRowClass,
  menuSelectedClass,
  menuSeparatorClass,
  menuShortcutClass,
} from "./menu"
import { Chip, type ChipProps } from "./chip"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

// A dropdown menu is opened from a chip, and a chip that opens a menu always shows the dropdown chevron. That is fixed:
// `dropdown`, `selectable` and `onRemove` are not props here. Use DropdownMenuTrigger only for a non-chip trigger such as an avatar.
function DropdownMenuChipTrigger({
  children,
  ...props
}: Omit<MenuPrimitive.Trigger.Props, "render" | "children"> &
  Omit<ChipProps, "dropdown" | "selectable" | "onRemove" | "pressed" | "defaultPressed" | "onPressedChange" | keyof MenuPrimitive.Trigger.Props> & {
    children: React.ReactNode
  }) {
  const { icon, variant, size, ...triggerProps } = props as Record<string, unknown>
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      render={<Chip dropdown selectable={false} icon={icon as React.ReactNode} variant={variant as ChipProps["variant"]} size={size as ChipProps["size"]} />}
      {...(triggerProps as MenuPrimitive.Trigger.Props)}
    >
      {children}
    </MenuPrimitive.Trigger>
  )
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const gap = useTokenPx({ offset: "--spacing-inline-xs" })
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-(--z-index-top) outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset ?? gap.offset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            menuPanelClass,
            "z-(--z-index-top) max-h-(--available-height) w-(--anchor-width) min-w-(--size-128)",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        menuLabelClass,
        menuInsetClass,
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        menuRowClass,
        "group/dropdown-menu-item",
        menuInsetClass,
        menuDestructiveClass,
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        menuRowClass,
        menuInsetClass,
        "data-popup-open:bg-primary-subtle data-popup-open:text-primary-pressed data-open:bg-primary-subtle data-open:text-primary-pressed",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="cn-rtl-flip ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  const gap = useTokenPx({ offset: "--spacing-inline-xs" })
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-(--size-96)", className)}
      align={align}
      alignOffset={alignOffset ?? -gap.offset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

// A checkbox row keeps a check at the end: unlike a single choice, a tick is the only sign of "on".
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(menuRowClass, menuInsetClass, "pr-(--spacing-section-md)", className)}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-(--spacing-inline-sm) flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

// Single choice: the selected row is filled, as in Figma. No tick.
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        menuRowClass,
        menuSelectedClass,
        menuInsetClass,
        className
      )}
      {...props}
    >
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(menuSeparatorClass, className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(menuShortcutClass, className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuChipTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
