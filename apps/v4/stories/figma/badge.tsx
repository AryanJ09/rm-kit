import { UsersIcon } from "lucide-react"
import { Badge } from "@/rm-style/ui/badge"

// Figma Badge: Type (7) x Status (Information, Dot, Icon). Dot and icon are composed as children.
const types = ["conservative", "moderate", "growth", "aggressive", "secure", "success", "neutral"] as const

export default function FigmaBadge() {
  return (
    <div className="grid gap-(--spacing-inline-sm) p-(--spacing-inline-lg)">
      {types.map((type) => {
        const label = type[0].toUpperCase() + type.slice(1)
        return (
          <div key={type} className="flex items-center gap-(--spacing-inline-sm)">
            <Badge variant={type}>{label}</Badge>
            <Badge variant={type}>
              <span className="size-(--size-dot) rounded-(--radius-pill) bg-current" />
              {label}
            </Badge>
            <Badge variant={type}>
              <UsersIcon data-icon="inline-start" />
              {label}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}
