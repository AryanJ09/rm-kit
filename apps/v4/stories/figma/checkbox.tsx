import { Checkbox } from "@/rm-style/ui/checkbox"

// Figma Checkbox: Type (Unchecked, Checked, Intrim) x State (Default, Disabled). Hover is a live :hover state.
const types = [
  { label: "Unchecked", props: {} },
  { label: "Checked", props: { checked: true } },
  { label: "Intrim", props: { indeterminate: true } },
] as const

export default function FigmaCheckbox() {
  return (
    <div className="grid gap-4 p-4">
      {types.map((type) => (
        <div key={type.label} className="flex items-center gap-4">
          <span className="w-20 text-sm text-text-secondary">{type.label}</span>
          <Checkbox {...type.props} />
          <Checkbox {...type.props} disabled />
        </div>
      ))}
    </div>
  )
}
