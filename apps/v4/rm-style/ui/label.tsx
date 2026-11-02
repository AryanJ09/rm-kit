"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-(--spacing-inline-sm) text-(length:--font-size-sm) leading-(--line-height-none) font-(--typography-label-sm-font-weight) select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-(--opacity-disabled) peer-disabled:cursor-not-allowed peer-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    />
  )
}

export { Label }
