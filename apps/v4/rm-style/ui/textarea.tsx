import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { controlMinSize } from "./control"
import { FieldShell } from "./field-shell"

// Same states and tokens as Input. Height is a minimum so the field grows with its content.
const textareaVariants = cva(
  "flex field-sizing-content w-(--size-share-full) min-w-0 rounded-(--radius-lg) border-(length:--border-width-default) bg-background px-(--spacing-inset-control-x) py-(--spacing-inset-control-y) text-(color:--field-label) transition-colors outline-none placeholder:text-field-placeholder read-only:bg-field-readonly focus-visible:border-field-focus focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-control-disabled disabled:bg-surface-disabled disabled:text-text-disabled",
  {
    variants: {
      size: controlMinSize,
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
  VariantProps<typeof textareaVariants> & {
    /** Label above the field. Omit for a bare textarea. */
    label?: string
    /** Helper line below. Takes the error or success colour from `state`. */
    helper?: string
  }

function Textarea({ className, size, state, label, helper, ...props }: TextareaProps) {
  const field = (
    <textarea
      data-slot="textarea"
      data-size={size}
      data-state={state}
      className={cn(textareaVariants({ size, state }), className)}
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

export { Textarea, textareaVariants }
