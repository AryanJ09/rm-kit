"use client"

import * as React from "react"
import { cn } from "cn"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-(--opacity-disabled)",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center gap-(--spacing-inline-sm) has-aria-invalid:border-destructive has-aria-invalid:ring-(length:--focus-ring-width) has-aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] dark:has-aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)]",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "border-field-stroke text-(color:--field-label) data-[active=true]:border-field-focus data-[active=true]:ring-primary-focus-ring relative flex h-(--size-control-md) w-(--size-control-md) items-center justify-center rounded-lg border-(length:--border-width-default) bg-background text-(length:--typography-body-md-font-size) transition-all outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:ring-(length:--focus-ring-width) data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] dark:bg-input/[calc(var(--opacity-soft)*100%)] dark:data-[active=true]:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-(--size-icon-sm) w-(--border-width-default) animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-(--size-icon-sm)"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
