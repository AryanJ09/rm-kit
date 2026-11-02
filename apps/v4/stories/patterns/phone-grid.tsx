// Presentation helper for the all-states stories: each phone at its standard size, labelled, side by side on a muted canvas.
import * as React from "react"

export function PhoneGrid({ items }: { items: { label: string; screen: React.ReactNode }[] }) {
  return (
    <div className="flex gap-(--spacing-stack-lg) overflow-x-auto bg-muted p-(--spacing-stack-lg)">
      {items.map(({ label, screen }) => (
        <section key={label} className="flex shrink-0 flex-col gap-(--spacing-inline-md)">
          <h3 className="text-(length:--font-size-sm) font-(--typography-title-sm-font-weight) text-foreground capitalize">{label}</h3>
          <div className="h-(--size-layout-frame-height) w-(--size-layout-frame-width)">{screen}</div>
        </section>
      ))}
    </div>
  )
}
