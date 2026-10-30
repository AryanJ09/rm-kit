import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"

import { controlShellClass, controlSize, type ControlSize } from "./control"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: ControlSize | "default"
}

function NativeSelect({
  className,
  size = "md",
  ...props
}: NativeSelectProps) {
  const resolved: ControlSize = size === "default" ? "md" : size
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={resolved}
    >
      <select
        data-slot="native-select"
        data-size={resolved}
        className={cn(controlShellClass, controlSize[resolved], "w-full min-w-0 appearance-none pr-(--spacing-section-md) select-none selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none")}
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-(--spacing-inset-md) size-(--size-icon-sm) -translate-y-1/2 text-text-tertiary select-none" aria-hidden="true" data-slot="native-select-icon" />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
