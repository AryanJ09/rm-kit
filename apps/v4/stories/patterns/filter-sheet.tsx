// Pattern example, not a component: a filter bottom sheet, as the Leads and Cases screens use it. A title with close, a body of
// sections (each a heading and chips, several can be chosen), an optional switch, and Reset and Apply pinned at the bottom.
// Assembled only from kit components: BottomSheetContent, Chip, Switch, Button. Sections and labels are data.
import * as React from "react"

import { BottomSheetContent } from "@/rm-style/ui/bottom-sheet"
import { Button } from "@/rm-style/ui/button"
import { Chip } from "@/rm-style/ui/chip/chip"
import { Switch } from "@/rm-style/ui/switch"

type FilterSection = { id: string; title: string; options: string[] }

type FilterSheetContentProps = {
  title: string
  sections: FilterSection[]
  /** An on/off filter shown last, e.g. "SLA breach only". */
  toggle?: { id: string; label: string }
  /** The chosen options (and the toggle id when it is on). */
  value: string[]
  onValueChange: (value: string[]) => void
  onApply: () => void
}

function FilterSheetContent({ title, sections, toggle, value, onValueChange, onApply }: FilterSheetContentProps) {
  const flip = (id: string, on: boolean) => onValueChange(on ? [...value, id] : value.filter((x) => x !== id))
  return (
    <BottomSheetContent
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={() => onValueChange([])}>Reset</Button>
          <Button onClick={onApply}>Apply</Button>
        </>
      }
    >
      <div className="flex flex-col gap-(--spacing-inline-lg) pb-(--spacing-inline-md)">
        {sections.map((s) => (
          <div key={s.id} className="flex flex-col gap-(--spacing-stack-sm)">
            <span className="text-(length:--font-size-xs) text-muted-foreground uppercase tracking-(--letter-spacing-widest)">{s.title}</span>
            <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
              {s.options.map((o) => (
                <Chip key={o} pressed={value.includes(`${s.id}:${o}`)} onPressedChange={(on) => flip(`${s.id}:${o}`, on)}>{o}</Chip>
              ))}
            </div>
          </div>
        ))}
        {toggle && (
          <Switch endLabel={toggle.label} checked={value.includes(toggle.id)} onCheckedChange={(on) => flip(toggle.id, on)} />
        )}
      </div>
    </BottomSheetContent>
  )
}

export { FilterSheetContent, type FilterSection, type FilterSheetContentProps }
