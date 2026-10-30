// Hand-written from Figma "Cards". Not generated: edit this file directly.
// The shell and its slots. Product code never uses these directly: it uses an archetype (see Card archetypes stories, D30).
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Badge } from "@/rm-style/ui/badge"
import { Button } from "@/rm-style/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardKeyValue,
  CardLeading,
  CardTitle,
  CardTitleGroup,
  CardTrailing,
} from "@/rm-style/ui/card"
import { Checkbox } from "@/rm-style/ui/checkbox"
import { Slot } from "@/rm-style/ui/slot"

type Args = {
  tone: "default" | "info"
  density: "default" | "compact"
  interactive: boolean
  selected: boolean
  disabled: boolean
  loading: boolean
  footer: boolean
}

const meta = {
  title: "RM Kit/Card/Shell",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-(--size-layout-frame-width)"><Story /></div>],
  args: { tone: "default", density: "default", interactive: false, selected: false, disabled: false, loading: false, footer: false },
  argTypes: {
    tone: { control: "inline-radio", options: ["default", "info"] },
    density: { control: "inline-radio", options: ["default", "compact"], description: "Compact is the one-line row." },
    interactive: { control: "boolean", description: "The whole card is one click target." },
    selected: { control: "boolean", description: "Single selection." },
    disabled: { control: "boolean" },
    loading: { control: "boolean", description: "Body shows skeleton lines." },
    footer: { control: "boolean", description: "Actions, only when needed." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = {
  render: ({ tone, density, interactive, selected, disabled, loading, footer }) => {
    const [picked, setPicked] = React.useState(selected)
    React.useEffect(() => setPicked(selected), [selected])
    return (
      <Card
        tone={tone}
        density={density}
        selected={interactive ? picked : selected}
        disabled={disabled}
        onClick={interactive ? () => setPicked((v) => !v) : undefined}
      >
        <CardHeader>
          <CardTitleGroup>
            <CardTitle>Test GLoS Meet 1</CardTitle>
            <CardDescription>20 Feb 2026, 11:41 am</CardDescription>
          </CardTitleGroup>
          <CardTrailing><Badge variant="moderate">Scheduled</Badge></CardTrailing>
        </CardHeader>
        <CardBody loading={loading}>
          <CardKeyValue label="Type">First Interaction</CardKeyValue>
          <CardKeyValue label="Mode">Video Conference</CardKeyValue>
        </CardBody>
        {footer && (
          <CardFooter>
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </CardFooter>
        )}
      </Card>
    )
  },
}

// Slot names, so the anatomy can be read at a glance.
export const Anatomy: Story = {
  render: () => (
    <Card>
      <Slot name="Header">
        <div className="flex gap-(--spacing-inline-sm)">
          <Slot name="Leading" className="w-(--size-72)" />
          <Slot name="Title group" className="flex-1" />
          <Slot name="Trailing" className="w-(--size-72)" />
        </div>
      </Slot>
      <Slot name="Body" className="h-(--size-72)" />
      <Slot name="Footer" />
    </Card>
  ),
}

export const InteractiveStates: Story = {
  render: () => {
    const [on, setOn] = React.useState(false)
    return (
      <div className="flex flex-col gap-(--spacing-inline-md)">
        <Card onClick={() => setOn((v) => !v)} selected={on}>
          <CardTitle>Click anywhere: {on ? "selected" : "not selected"}</CardTitle>
        </Card>
        <Card onClick={() => setOn((v) => !v)} selected={on}>
          <CardHeader>
            <CardTitleGroup><CardTitle>Inner control wins</CardTitle></CardTitleGroup>
            <CardTrailing><Button variant="secondary" size="sm">Open</Button></CardTrailing>
          </CardHeader>
        </Card>
        <Card onClick={() => {}} disabled><CardTitle>Disabled</CardTitle></Card>
      </div>
    )
  },
}

// Several cards can be picked: a Checkbox in the leading slot carries the selection.
export const MultiSelect: Story = {
  render: () => {
    const [picked, setPicked] = React.useState<string[]>(["a"])
    const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
    return (
      <div className="flex flex-col gap-(--spacing-inline-md)">
        {[["a", "Samata Khemalapure"], ["b", "Piyush Sahu"]].map(([id, name]) => (
          <Card key={id} selected={picked.includes(id)} onClick={() => toggle(id)}>
            <CardHeader>
              <CardLeading><Checkbox checked={picked.includes(id)} onCheckedChange={() => toggle(id)} aria-label={name} /></CardLeading>
              <CardTitleGroup>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Bank Representative</CardDescription>
              </CardTitleGroup>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  },
}

export const Loading: Story = {
  render: () => (
    <Card>
      <CardBody loading />
    </Card>
  ),
}
