import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { controlSize } from "./control"
import { FieldShell } from "./field-shell"

// Colours come from semantic roles only. Focus is always the blue field-focus
// border plus the primary focus ring, even when the field is in error.
const inputVariants = cva(
  "w-full min-w-0 rounded-(--radius-lg) border-(length:--border-width-default) px-(--spacing-inset-control-x) bg-background text-(color:--field-label) transition-colors outline-none placeholder:text-field-placeholder read-only:bg-field-readonly focus-visible:border-field-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: controlSize,
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
  VariantProps<typeof inputVariants> & {
    /** Label above the field. Omit for a bare input. */
    label?: string
    /** Helper line below. Takes the error or success colour from `state`. */
    helper?: string
  }

function Input({ className, type, size, state, label, helper, ...props }: InputProps) {
  const field = (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      data-state={state}
      className={cn(inputVariants({ size, state }), className)}
      {...props}
    />
  )
  return label || helper ? (
    <FieldShell label={label} helper={helper} state={state ?? "default"}>
      {field}
    </FieldShell>
  ) : (
    field
  )
}

export { Input, inputVariants }
