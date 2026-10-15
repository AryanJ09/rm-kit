import { Button } from "@/rm-style/ui/button"

// Figma Button.json: Type (Primary, Secondary, Text) x State. Focused/Pressed forced via data attributes.
const types = [
  { label: "Primary", variant: "default" },
  { label: "Secondary", variant: "secondary" },
  { label: "Text", variant: "ghost" },
] as const
const states = [
  { label: "Default", props: {} },
  { label: "Focused", props: { "data-focused": "" } },
  { label: "Pressed", props: { "data-pressed": "" } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Loading", props: { loading: true } },
] as const

export default function FigmaButton() {
  return (
    <div className="grid gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      {types.map((type) => (
        <div key={type.label} className="flex items-center gap-(--ds-spacing-16)">
          <span className="w-(--ds-size-88) text-(length:--ds-typography-font-size-14) text-text-secondary">{type.label}</span>
          {states.map((state) => (
            <Button key={state.label} variant={type.variant} size="md" {...state.props}>
              Apply
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}
