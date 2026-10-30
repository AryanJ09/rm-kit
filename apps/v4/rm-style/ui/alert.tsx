import * as React from "react"
import { cva } from "class-variance-authority"
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react"
import { cn } from "cn"

// RM Kit Alert, from Figma "Alerts": four tones (info, success, warning, error). Each has its own icon, a tinted surface
// and the tone colour on icon, title and description.
const alertVariants = cva(
  "group/alert relative flex w-full items-start gap-(--spacing-inset-md) rounded-(--radius-md) p-(--spacing-inline-md) text-left font-sans text-(length:--font-size-xs) has-data-[slot=alert-action]:pr-(--size-control-md)",
  {
    variants: {
      variant: {
        // Closest roles to the Figma colours: info, success and error match exactly; warning text is the nearest role
        // (Figma #9B5B00 has no exact role).
        info: "bg-(color:--category-moderate-surface) text-(color:--category-moderate-text)",
        success: "bg-(color:--category-success-surface) text-(color:--category-success-text)",
        warning: "bg-(color:--category-growth-surface) text-(color:--category-growth-text)",
        error: "bg-(color:--category-aggressive-surface) text-(color:--category-aggressive-text)",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

type AlertTone = "info" | "success" | "warning" | "error"

const toneIcon = {
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  error: CircleAlertIcon,
} as const

// shadcn used "default" and "destructive"; they map to info and error.
const legacyTone = { default: "info", destructive: "error" } as const

// Lets AlertClose, wherever it sits inside the alert, dismiss the alert.
const AlertDismissContext = React.createContext<(() => void) | null>(null)

function Alert({
  className,
  variant = "info",
  icon,
  onDismiss,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  variant?: AlertTone | keyof typeof legacyTone
  /** Replace the tone's icon, or pass null for none. */
  icon?: React.ReactNode | null
  /** Called when the close icon is pressed. The alert hides itself either way. */
  onDismiss?: () => void
}) {
  const [dismissed, setDismissed] = React.useState(false)
  const dismiss = React.useCallback(() => {
    setDismissed(true)
    onDismiss?.()
  }, [onDismiss])
  if (dismissed) return null
  const tone: AlertTone = variant in legacyTone ? legacyTone[variant as keyof typeof legacyTone] : (variant as AlertTone)
  const Icon = toneIcon[tone]
  return (
    <div
      data-slot="alert"
      data-tone={tone}
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
      className={cn(alertVariants({ variant: tone }), className)}
      {...props}
    >
      <AlertDismissContext.Provider value={dismiss}>
      {icon !== null && (
        <span data-slot="alert-icon" className="flex size-(--size-icon-md) shrink-0 items-center justify-center [&_svg]:size-(--size-icon-sm)">
          {icon ?? <Icon />}
        </span>
      )}
      <div data-slot="alert-message" className="flex min-w-0 flex-1 flex-col gap-(--spacing-stack-3xs)">
        {children}
      </div>
      </AlertDismissContext.Provider>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "leading-(--line-height-xs) font-(--typography-heading-md-font-weight) [&_a]:underline [&_a]:underline-offset-(--spacing-stack-xs)",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "leading-(--line-height-xs) [&_a]:underline [&_a]:underline-offset-(--spacing-stack-xs)",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-(--spacing-inline-sm) right-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

// Dismiss button. Same colour as the alert's icon and text; on hover only the icon colour changes (no background).
function AlertClose({ className, onClick, ...props }: React.ComponentProps<"button">) {
  const dismiss = React.useContext(AlertDismissContext)
  return (
    <button
      type="button"
      data-slot="alert-close"
      aria-label="Dismiss"
      onClick={(event) => {
        onClick?.(event)
        dismiss?.()
      }}
      className={cn(
        "inline-flex size-(--size-icon-md) items-center justify-center rounded-(--radius-sm) text-current outline-none transition-colors hover:text-text-primary focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-sm)",
        className
      )}
      {...props}
    >
      <XIcon />
    </button>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, AlertClose, alertVariants, type AlertTone }
