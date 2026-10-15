import { Switch } from "@/rm-style/ui/switch"

// Figma Switch: Value (Unchecked, Checked) x State (Default, Disabled). Hover is a live :hover state.
export default function FigmaSwitch() {
  return (
    <div className="grid gap-4 p-4">
      {[
        { label: "Unchecked", checked: false },
        { label: "Checked", checked: true },
      ].map((value) => (
        <div key={value.label} className="flex items-center gap-4">
          <span className="w-20 text-sm text-text-secondary">{value.label}</span>
          <Switch checked={value.checked} />
          <Switch checked={value.checked} disabled />
        </div>
      ))}
    </div>
  )
}
