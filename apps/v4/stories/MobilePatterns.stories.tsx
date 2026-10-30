// Hand-written. Not generated: edit this file directly.
// Screen patterns of the mobile application shell. These are examples assembled from kit components, not components.
// One story per screen (Home for now; Leads, Clients and CRM follow), plus the interactive phone that switches screens with
// the real bottom navigation. See rm-style/golden-rules/03-card-catalog.md (mobile screen patterns).
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { MobileHome, type HomeState } from "./patterns/mobile-home"

const states: HomeState[] = ["populated", "loading", "empty", "error"]

// Storybook preview window size (device width for the toolbar, not styling).
const viewports = { rmMobile: { name: "RM mobile", styles: { width: "430px", height: "932px" } } } // rules-allow: preview window size

type Args = { state: HomeState; hero: boolean; footerNote: boolean }

const meta = {
  title: "RM Kit/Patterns/Mobile",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { options: viewports } },
  decorators: [(Story) => <div className="h-svh bg-muted p-(--spacing-inline-lg)"><Story /></div>],
  args: { state: "populated", hero: true, footerNote: true },
  argTypes: {
    state: { control: "inline-radio", options: states },
    hero: { control: "boolean", description: "Shell hero slot: summary tiles and search on the header gradient." },
    footerNote: { control: "boolean", description: "Shell footerNote slot: brand line, version and date." },
  },
  globals: { viewport: { value: "rmMobile", isRotated: false } },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Home: Story = {
  render: (args) => <MobileHome {...args} />,
}

// The four states side by side.
export const HomeAllStates: StoryObj = {
  name: "Home: all states",
  parameters: { layout: "padded" },
  globals: { viewport: { value: "reset", isRotated: false } },
  decorators: [(Story) => <div className="bg-muted p-(--spacing-inline-lg)"><Story /></div>],
  render: () => (
    <div className="flex gap-(--spacing-stack-lg) overflow-x-auto">
      {states.map((s) => (
        <div key={s} className="flex shrink-0 flex-col gap-(--spacing-inline-sm)">
          <span className="text-(length:--font-size-xs) text-muted-foreground">{s}</span>
          <div className="h-(--size-layout-frame-width)">
            <MobileHome state={s} />
          </div>
        </div>
      ))}
    </div>
  ),
}

// The phone with its real bottom navigation. Only Home is designed so far; the other destinations stay empty until
// their screens arrive. The centre button is visible and does nothing yet.
export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = React.useState<Destination>("Home")
    return active === "Home" ? (
      <MobileHome {...args} active={active} onNavigate={setActive} />
    ) : (
      <MobileHome
        {...args}
        hero={false}
        footerNote={false}
        active={active}
        onNavigate={setActive}
        screen={<div className="p-(--spacing-inline-lg) text-(length:--font-size-sm) text-muted-foreground">{active}: pattern coming.</div>}
      />
    )
  },
}
