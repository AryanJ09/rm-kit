// Hand-written. Each kit component: the live component in a card on top (its first story, in a frame), and below it every
// semantic role its source file uses, each traced down to the primitive it resolves to (component -> semantic -> primitive).
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { tokenAudit as result } from "./token-data"

const meta = {
  title: "Tokens/Component trace",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

type IndexEntry = { id: string; title: string; type: string }

// "application-shell/sidebar" and "chip/chip-group" -> "sidebar", "chipgroup": compare titles without case, spaces or dashes.
const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
const leaf = (name: string) => name.split("/").pop() ?? name

function useStoryIndex() {
  const [entries, setEntries] = React.useState<IndexEntry[]>([])
  React.useEffect(() => {
    fetch(new URL("index.json", window.parent.location.href))
      .then((r) => r.json())
      .then((d) => setEntries(Object.values<IndexEntry>(d.entries)))
      .catch(() => setEntries([]))
  }, [])
  return entries
}

// Components that have no story of their own are shown through the story that uses them.
const shownIn: Record<string, string> = {
  card: "RM Kit/Card/Shell",
  cards: "RM Kit/Card/Archetypes",
  chart: "RM Kit/Chart/Guide",
  "chart-cards": "RM Kit/Chart/Panels",
  "donut-chart": "RM Kit/Chart/Panels",
  "chip/chip-group": "RM Kit/Chip/Group",
  "application-shell/bottom-navigation-central-button":
    "RM Kit/Application shell/Central button",
  calendar: "RM Kit/Date picker",
  "field-shell": "RM Kit/Field",
  "input-group": "RM Kit/Input",
}

function storyFor(entries: IndexEntry[], name: string) {
  const want = squash(leaf(name))
  const matches = entries.filter(
    (e) =>
      e.type === "story" &&
      e.title.startsWith("RM Kit/") &&
      (shownIn[name]
        ? e.title === shownIn[name]
        : squash(leaf(e.title)) === want)
  )
  return matches.find((e) => /playground|default/i.test(e.id)) ?? matches[0]
}

function Preview({ name, entries }: { name: string; entries: IndexEntry[] }) {
  const story = storyFor(entries, name)
  if (!story) {
    return (
      <div className="flex h-(--size-128) items-center justify-center text-(length:--font-size-sm) text-muted-foreground">
        No story for this component yet.
      </div>
    )
  }
  return (
    <iframe
      title={`${name} preview`}
      loading="lazy"
      src={new URL(
        `iframe.html?id=${story.id}&viewMode=story`,
        window.parent.location.href
      ).toString()}
      className="h-(--size-layout-frame-width) w-(--size-share-full) border-none"
    />
  )
}

function TokenRow({ name }: { name: string }) {
  const role = result.roles.find((entry) => entry.name === name)
  const chain = role?.primitive.length
    ? role.primitive
    : [role?.value ?? "composed role"]
  return (
    <tr className="border-t border-(--border-subtle) align-top">
      <td className="py-(--spacing-stack-2xs) pr-(--spacing-inline-md)">
        <code>{name}</code>
      </td>
      <td className="py-(--spacing-stack-2xs) pr-(--spacing-inline-md) text-muted-foreground">
        <code>{role?.file ?? "-"}</code>
      </td>
      <td className="py-(--spacing-stack-2xs)">
        {chain.map((p) => (
          <code key={p} className="mr-(--spacing-inline-sm) inline-block">
            {p}
          </code>
        ))}
      </td>
    </tr>
  )
}

function Trace() {
  const entries = useStoryIndex()
  return (
    <main className="mx-auto grid w-(--size-share-full) max-w-(--size-layout-frame-width) gap-(--spacing-inline-lg) p-(--spacing-inline-xl)">
      <h1 className="text-(length:--typography-heading-lg-font-size) font-(--typography-heading-md-font-weight)">
        Component to semantic to primitive
      </h1>
      <p className="text-text-secondary">
        Each card shows the component itself. Under it, every token role the
        component file uses and the primitive that role resolves to. Roles are
        read from the source, so this stays in step with the code.
      </p>
      {result.componentsUsingTokens.map((component) => (
        <section
          key={component.name}
          className="overflow-hidden rounded-(--radius-md) border border-(--border-subtle)"
        >
          <header className="flex items-baseline justify-between gap-(--spacing-inline-sm) p-(--spacing-inline-lg)">
            <h2 className="font-(--typography-label-strong-font-weight) capitalize">
              {component.name.replaceAll("-", " ")}
            </h2>
            <code className="text-(length:--typography-caption-font-size)">
              {component.file}
            </code>
          </header>
          <div className="bg-muted">
            <Preview name={component.name} entries={entries} />
          </div>
          <div className="p-(--spacing-inline-lg)">
            <p className="mb-(--spacing-stack-sm) text-(length:--typography-caption-font-size) text-muted-foreground">
              {component.roles.length} roles used
            </p>
            <table className="w-(--size-share-full) text-left text-(length:--typography-caption-font-size)">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-(--spacing-stack-2xs) font-(--typography-label-strong-font-weight)">
                    Semantic role
                  </th>
                  <th className="pb-(--spacing-stack-2xs) font-(--typography-label-strong-font-weight)">
                    Defined in
                  </th>
                  <th className="pb-(--spacing-stack-2xs) font-(--typography-label-strong-font-weight)">
                    Primitive
                  </th>
                </tr>
              </thead>
              <tbody>
                {component.roles.map((r) => (
                  <TokenRow key={r} name={r} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </main>
  )
}

export const CurrentComponents: Story = { render: () => <Trace /> }
