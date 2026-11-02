import { Button } from "@/rm-style/ui/button"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { tokenAudit as result } from "./token-data"

const meta = {
  title: "Tokens/Pipeline",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const primitives = result.roles.filter((role) => role.primitive.length > 0)

export const PrimitiveToSemanticToComponent: Story = {
  render: () => (
    <main className="mx-auto grid w-(--size-share-full) max-w-(--size-layout-frame-width) gap-(--spacing-inline-xl) p-(--spacing-inline-xl)">
      <h1 className="text-(length:--typography-heading-lg-font-size) font-(--typography-heading-md-font-weight)">
        Token pipeline
      </h1>
      <p className="text-text-secondary">
        Foundation primitives feed semantic roles; RM Kit components consume
        those semantic roles.
      </p>
      <div className="grid gap-(--spacing-inline-md)">
        <section className="rounded-(--radius-md) border border-(--border-subtle) p-(--spacing-inline-lg)">
          <h2 className="mb-(--spacing-inline-sm) font-(--typography-label-strong-font-weight)">1 · Foundation</h2>
          <code>--primary · primitive</code>
        </section>
        <section className="rounded-(--radius-md) border border-(--border-subtle) p-(--spacing-inline-lg)">
          <h2 className="mb-(--spacing-inline-sm) font-(--typography-label-strong-font-weight)">2 · Semantic</h2>
          <code>--primary → var(--primary)</code>
        </section>
        <section className="rounded-(--radius-md) border border-(--border-subtle) p-(--spacing-inline-lg)">
          <h2 className="mb-(--spacing-inline-sm) font-(--typography-label-strong-font-weight)">3 · Component</h2>
          <div className="flex flex-wrap items-center gap-(--spacing-inline-md)">
            <Button>Button</Button>
            <code>
              Button reads --primary, --radius-pill, --size-control-md and --spacing-inline-lg from semantic.css.
            </code>
          </div>
        </section>
      </div>
      <div className="grid gap-(--spacing-inline-sm)">
        <h2 className="font-(--typography-label-strong-font-weight)">Semantic roles ({primitives.length})</h2>
        {primitives.map((role) => (
          <div
            key={role.name}
            className="flex flex-wrap justify-between gap-(--spacing-inline-sm) border-b border-(--border-subtle) py-(--spacing-inline-sm) text-(length:--typography-caption-font-size)"
          >
            <code>{role.name}</code>
            <code>{role.primitive.join(", ")}</code>
          </div>
        ))}
      </div>
    </main>
  ),
}
