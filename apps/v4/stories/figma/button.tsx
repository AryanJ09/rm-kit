import { Button } from "@/rm-style/ui/button"
import { VariantGrid } from "./component-set"

// Figma Button: Type (Primary, Secondary, Text) x State. Focused/Pressed forced via data attributes.
const types = { Primary: "default", Secondary: "secondary", Text: "ghost" } as const
const states = {
  Default: {},
  Focused: { "data-focused": "" },
  Pressed: { "data-pressed": "" },
  Disabled: { disabled: true },
  Loading: { loading: true },
} as const

export default function FigmaButton() {
  return (
    <VariantGrid
      columns={Object.keys(types)}
      rows={Object.keys(states)}
      cellWidth={348}
      cellHeight={96}
      cell={(type, state) => (
        <Button
          className="w-full"
          variant={types[type as keyof typeof types]}
          size="md"
          {...states[state as keyof typeof states]}
        >
          Apply
        </Button>
      )}
    />
  )
}
