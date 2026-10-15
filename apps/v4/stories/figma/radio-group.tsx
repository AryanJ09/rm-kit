import { RadioGroup, RadioGroupItem } from "@/rm-style/ui/radio-group"

// Figma Radio: Value (Unchecked, Checked) x State (Default, Disabled). Hover is a live :hover state.
export default function FigmaRadio() {
  return (
    <div className="grid gap-4 p-4">
      {["Unchecked", "Checked"].map((value) => (
        <div key={value} className="flex items-center gap-4">
          <span className="w-20 text-sm text-text-secondary">{value}</span>
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
