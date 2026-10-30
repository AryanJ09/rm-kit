import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Same states and tokens as Input. Height is a minimum so the field grows with its content.
const textareaVariants = cva(
  "flex field-sizing-content w-full min-w-0 rounded-lg border-(length:--border-width-default) bg-background px-(--spacing-inset-control-x) py-(--spacing-inset-control-y) text-(color:--field-label) transition-colors outline-none placeholder:text-field-placeholder read-only:bg-field-readonly focus-visible:border-field-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: {
        sm: "min-h-(--size-control-sm) text-sm",
        md: "min-h-(--size-control-md) text-sm",
        lg: "min-h-(--size-control-lg) text-lg",
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
