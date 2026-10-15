import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Colours come from semantic roles only. Focus is always the blue field-focus
// border plus the primary focus ring, even when the field is in error.
const inputVariants = cva(
  "w-full min-w-0 rounded-(--field-radius) border-(length:--field-border-width) bg-transparent px-(--field-padding-x) text-field-label transition-colors outline-none placeholder:text-field-placeholder read-only:bg-surface-hover focus-visible:border-field-focus focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: {
        sm: "h-(--field-height-sm) text-sm",
        md: "h-(--field-height-md) text-base",
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

function Input({ className, type, size, state, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      data-state={state}
      className={cn(inputVariants({ size, state }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
