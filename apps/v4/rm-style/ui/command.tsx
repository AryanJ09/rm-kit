"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "cn"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "./input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

import {
  menuRowClass,
  menuShortcutClass,
} from "./menu"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-(--radius-md)! bg-popover p-(--spacing-inline-sm) text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-(--size-share-third) translate-y-0 overflow-hidden rounded-(--radius-md)! p-(--spacing-none)",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-(--spacing-inline-sm) pb-(--spacing-none)">
      <InputGroup className="h-(--size-control-sm)! rounded-(--radius-md)! border-field-stroke bg-background shadow-none! *:data-[slot=input-group-addon]:pl-(--spacing-inline-sm)!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-(--size-share-full) text-(length:--font-size-sm) outline-hidden disabled:cursor-not-allowed disabled:text-text-disabled",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-(--size-icon-sm) shrink-0 text-field-placeholder" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-(--size-288) scroll-py-(--spacing-stack-xs) overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-(--spacing-section-sm) text-center text-(length:--font-size-sm) text-text-tertiary", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-(--spacing-none) text-foreground **:[[cmdk-group-heading]]:px-(--spacing-inline-sm) **:[[cmdk-group-heading]]:py-(--spacing-stack-xs) **:[[cmdk-group-heading]]:text-(length:--font-size-helper) **:[[cmdk-group-heading]]:text-text-tertiary",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-(--spacing-inline-sm) h-(--border-width-default) bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        menuRowClass, "group/command-item in-data-[slot=dialog-content]:rounded-(--radius-md)! data-[disabled=true]:pointer-events-none data-[disabled=true]:text-text-disabled data-selected:bg-primary-subtle data-selected:text-primary-pressed",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        menuShortcutClass,
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
