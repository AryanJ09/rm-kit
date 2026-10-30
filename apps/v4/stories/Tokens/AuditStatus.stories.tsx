import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { tokenAudit as result } from "./token-data"

const meta = {
  title: "Tokens/Audit status",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const CurrentAudit: Story = {
  render: () => (
    <main className="mx-auto grid w-full max-w-(--size-layout-frame-width) gap-(--spacing-inline-lg) p-(--spacing-inline-xl)">
      <h1 className="text-(length:--typography-heading-lg-font-size) font-bold">
        Token audit
      </h1>
      <div
        className={`rounded-(--radius-md) border p-(--spacing-inline-lg) ${result.problems.length ? "border-error bg-destructive-subtle text-error" : "border-success text-success bg-surface"}`}
      >
        <p className="font-semibold">
          {result.problems.length
            ? `${result.problems.length} issue(s)`
            : "Clean"}
        </p>
        <p className="text-text-primary mt-(--spacing-inline-xs)">
          {result.properties} CSS properties · {result.components} components
          checked
        </p>
      </div>
      {result.problems.map((problem) => (
        <code key={problem} className="text-error">
          {problem}
        </code>
      ))}
      <p>
        Run <code>node scripts/audit-tokens.mjs</code> in <code>apps/v4</code>{" "}
        for the same check in a terminal.
      </p>
    </main>
  ),
}
