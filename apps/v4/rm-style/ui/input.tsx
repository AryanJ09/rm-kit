import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleCheckIcon, LockIcon } from "lucide-react"
import { cn } from "cn"

// Colours come from semantic roles only. Focus is always the blue field-focus
// border plus the primary focus ring, even when the field is in error.
const inputVariants = cva(
  "w-full min-w-0 rounded-(--field-radius) border-(length:--field-border-width) px-(--field-padding-x) bg-background text-field-label data-[icon=true]:pr-(--ds-spacing-40) transition-colors outline-none placeholder:text-field-placeholder read-only:bg-field-readonly focus-visible:border-field-focus focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: {
        sm: "h-(--field-height-sm) text-sm",
        md: "h-(--field-height-md) text-sm",
        lg: "h-(--field-height-lg) text-lg",
      },
      state: {
        default: "border-field-stroke",
        success: "border-field-success",
        error: "border-field-error",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, size, state, readOnly, ...props }: InputProps) {
  // A success state shows a check, a read-only field shows a lock. Other fields render the bare input.
  const Icon = state === "success" ? CircleCheckIcon : readOnly ? LockIcon : null
  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      data-state={state}
      data-icon={Icon ? true : undefined}
      readOnly={readOnly}
      className={cn(inputVariants({ size, state }), className)}
      {...props}
    />
  )
  if (!Icon) return input
  return (
    <div data-slot="input-wrapper" className="relative w-full min-w-0">
      {input}
      <Icon
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 right-(--field-padding-x) size-(--size-icon-md) -translate-y-1/2",
          state === "success" ? "text-field-success" : "text-field-helper"
        )}
      />
    </div>
  )
}

export { Input, inputVariants }
