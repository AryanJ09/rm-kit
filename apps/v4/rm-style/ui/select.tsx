"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "cn"

import { controlShellClass, controlSize, type ControlSize } from "./control"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

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

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-(--spacing-stack-xs) p-(--spacing-none)", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "md",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  /** Same height scale as Input and Button. "default" is the old name for "md". */
  size?: ControlSize | "default"
}) {
  const resolved: ControlSize = size === "default" ? "md" : size
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={resolved}
      className={cn(
        controlShellClass,
        controlSize[resolved],
        "group/select-trigger flex w-fit items-center justify-between gap-(--spacing-inline-sm) text-left whitespace-nowrap select-none data-placeholder:text-field-placeholder *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-(--spacing-inline-sm) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-(--size-icon-sm) text-text-tertiary transition-transform duration-(--motion-duration-normal) ease-(--motion-easing-standard) group-data-popup-open/select-trigger:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  // false: the list opens below the trigger. true would slide the list over the trigger to line the selected row up.
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-(--z-index-overlay)"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            menuPanelClass, "relative isolate z-(--z-index-top) max-h-(--available-height) w-(--anchor-width) min-w-(--size-128)",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(menuLabelClass, className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        menuRowClass, menuSelectedClass, "w-(--size-share-full)",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-(--spacing-inline-sm) whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none", menuSeparatorClass, className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-(--spacing-none) z-(--z-index-base) flex w-(--size-share-full) cursor-default items-center justify-center bg-popover py-(--spacing-stack-xs) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-(--spacing-none) z-(--z-index-base) flex w-(--size-share-full) cursor-default items-center justify-center bg-popover py-(--spacing-stack-xs) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
