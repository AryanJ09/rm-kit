import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { tokenAudit as result } from "./token-data"

const meta = {
  title: "Tokens/Component trace",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const CurrentComponents: Story = {
  render: () => (
    <main className="mx-auto grid w-full max-w-(--size-layout-frame-width) gap-(--spacing-inline-lg) p-(--spacing-inline-xl)">
      <h1 className="text-(length:--typography-heading-lg-font-size) font-bold">
        Component to semantic trace
      </h1>
      <p className="text-text-secondary">
        All current RM Kit components appear here. Their token roles are derived
        from the component source and resolved against the shared theme.
      </p>
      {result.componentsUsingTokens.map((component) => (
        <section
          key={component.name}
          className="grid gap-(--spacing-inline-sm) rounded-(--radius-md) border border-(--border-subtle) p-(--spacing-inline-lg)"
        >
          <h2 className="font-semibold capitalize">
            {component.name.replaceAll("-", " ")}
          </h2>
          <code className="text-(length:--typography-caption-font-size)">
            {component.file}
          </code>
          {component.roles.map((name) => {
            const role = result.roles.find((entry) => entry.name === name)
            return (
              <div
                key={name}
                className="flex justify-between gap-(--spacing-inline-sm) border-t border-(--border-subtle) pt-(--spacing-inline-sm) text-(length:--typography-caption-font-size)"
              >
                <code>{name}</code>
                <code>
                  {role?.primitive.join(", ") || role?.value || "composed role"}
                </code>
              </div>
            )
          })}
        </section>
      ))}
    </main>
  ),
}
