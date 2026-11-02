"use client"

// RM Kit Avatar, from Figma "Private Banking/Avatar": a round avatar in three sizes (24, 32, 48) with the initials in a dark
// disc and a hairline ring. A photo (AvatarImage) replaces the initials when it loads; an icon can sit in AvatarFallback instead of initials.
import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  /** sm 24, default 32, lg 48. */
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 rounded-(--radius-pill) select-none after:absolute after:inset-(--spacing-none) after:rounded-(--radius-pill) after:border-(length:--border-width-default) after:border-border after:mix-blend-darken data-[size=default]:size-(--size-control-32) data-[size=lg]:size-(--size-control-md) data-[size=sm]:size-(--size-icon-lg) dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-(--radius-pill) object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-(--radius-pill) bg-foreground text-(length:--font-size-base) font-(--typography-title-sm-font-weight) text-primary-foreground group-data-[size=lg]/avatar:text-(length:--font-size-xl) group-data-[size=sm]/avatar:text-(length:--font-size-xs) [&>svg]:size-(--size-icon-sm) group-data-[size=lg]/avatar:[&>svg]:size-(--size-icon-lg) group-data-[size=sm]/avatar:[&>svg]:size-(--size-icon-xs)",
        className
      )}
      {...props}
    />
  )
}

// Status dot on the corner of the avatar. It grows with the avatar.
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-(--spacing-none) bottom-(--spacing-none) z-(--z-index-base) inline-flex items-center justify-center rounded-(--radius-pill) bg-primary text-primary-foreground ring-(length:--ring-width) ring-background select-none",
        "group-data-[size=sm]/avatar:size-(--size-dot) group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-(--size-dot-md) group-data-[size=default]/avatar:[&>svg]:size-(--size-dot)",
        "group-data-[size=lg]/avatar:size-(--size-icon-3xs) group-data-[size=lg]/avatar:[&>svg]:size-(--size-dot)",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-(--spacing-inline-sm) *:data-[slot=avatar]:ring-(length:--ring-width) *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

// "+3": the same disc as an avatar, showing how many more there are.
function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-(--size-control-32) shrink-0 items-center justify-center rounded-(--radius-pill) bg-muted text-(length:--font-size-sm) text-muted-foreground ring-(length:--ring-width) ring-background group-has-data-[size=lg]/avatar-group:size-(--size-control-md) group-has-data-[size=sm]/avatar-group:size-(--size-icon-lg) [&>svg]:size-(--size-icon-sm) group-has-data-[size=lg]/avatar-group:[&>svg]:size-(--size-icon-md)",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
