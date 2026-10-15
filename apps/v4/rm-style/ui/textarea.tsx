import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Same states and tokens as Input. Height is a minimum so the field grows with its content.
const textareaVariants = cva(
  "flex field-sizing-content w-full min-w-0 rounded-(--field-radius) border-(length:--field-border-width) bg-background px-(--field-padding-x) py-(--field-padding-y) text-field-label transition-colors outline-none placeholder:text-field-placeholder read-only:bg-surface-hover focus-visible:border-field-focus focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: {
        sm: "min-h-(--field-height-sm) text-sm",
        md: "min-h-(--field-height-md) text-sm",
        lg: "min-h-(--field-height-lg) text-lg",
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

type TextareaProps = Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaVariants>

function Textarea({ className, size, state, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      data-state={state}
      className={cn(textareaVariants({ size, state }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
