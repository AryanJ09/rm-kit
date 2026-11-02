import { Switch } from "@/rm-style/ui/switch"

// Figma Switch: Value (Unchecked, Checked) x State (Default, Disabled). Hover is a live :hover state.
export default function FigmaSwitch() {
  return (
    <div className="grid gap-(--spacing-inline-lg) p-(--spacing-inline-lg)">
      {[
        { label: "Unchecked", checked: false },
        { label: "Checked", checked: true },
      ].map((value) => (
        <div key={value.label} className="flex items-center gap-(--spacing-inline-lg)">
          <span className="w-(--size-72) text-(length:--font-size-sm) text-text-secondary">{value.label}</span>
          <Switch defaultChecked={value.checked} />
          <Switch defaultChecked={value.checked} disabled />
        </div>
      ))}
    </div>
  )
}
