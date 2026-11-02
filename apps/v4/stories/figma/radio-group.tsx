import { RadioGroup, RadioGroupItem } from "@/rm-style/ui/radio-group"

// Figma Radio: Value (Unchecked, Checked) x State (Default, Disabled). Hover is a live :hover state.
export default function FigmaRadio() {
  return (
    <div className="grid gap-(--spacing-inline-lg) p-(--spacing-inline-lg)">
      {["Unchecked", "Checked"].map((value) => (
        <div key={value} className="flex items-center gap-(--spacing-inline-lg)">
          <span className="w-(--size-72) text-(length:--font-size-sm) text-text-secondary">{value}</span>
          <RadioGroup defaultValue={value === "Checked" ? "on" : undefined} className="w-auto">
            <RadioGroupItem value="on" />
          </RadioGroup>
          <RadioGroup defaultValue={value === "Checked" ? "on" : undefined} className="w-auto">
            <RadioGroupItem value="on" disabled />
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
