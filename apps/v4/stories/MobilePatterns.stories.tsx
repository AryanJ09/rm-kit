// Hand-written. Not generated: edit this file directly.
// Screen patterns of the mobile application shell. These are examples assembled from kit components, not components.
// Order: the interactive phone first, then one story per screen (with a state control), then the all-states grids.
// How to add the next screen: rm-style/learnings/02-screen-build-order.md.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { MobileClients, type ClientsState } from "./patterns/mobile-clients"
import { MobileHome, type HomeState } from "./patterns/mobile-home"
import { PhoneGrid } from "./patterns/phone-grid"

const homeStates: HomeState[] = ["populated", "loading", "empty", "error"]
const clientStates: ClientsState[] = ["default", "filtered", "empty", "loading", "error"]

// Storybook preview window size (device width for the toolbar, not styling).
const viewports = { rmMobile: { name: "RM mobile", styles: { width: "430px", height: "932px" } } } // rules-allow: preview window size

// A single phone sits on a neutral canvas with room around it.
const onCanvas = [(Story: React.ComponentType) => <div className="h-svh bg-muted p-(--spacing-inline-lg)"><Story /></div>]

const meta = {
  title: "RM Kit/Application shell/Mobile patterns",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { options: viewports } },
} satisfies Meta

export default meta
type Story = StoryObj

/** The phone with its real bottom navigation: press Home or Clients to switch screens. Leads and CRM wait for their screens. */
export const Interactive: StoryObj<{ footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  decorators: onCanvas,
  args: { footerNote: true },
  argTypes: { footerNote: { control: "boolean", description: "Shell footerNote slot." } },
  render: ({ footerNote }) => {
    const [active, setActive] = React.useState<Destination>("Home")
    if (active === "Home") return <MobileHome footerNote={footerNote} active={active} onNavigate={setActive} />
    if (active === "Clients") return <MobileClients footerNote={footerNote} active={active} onNavigate={setActive} />
    return (
      <MobileHome
        hero={false}
        footerNote={false}
        active={active}
        onNavigate={setActive}
        screen={<div className="p-(--spacing-inline-lg) text-(length:--font-size-sm) text-muted-foreground">{active}: pattern coming.</div>}
      />
    )
  },
}

/** Home: summary tiles and search on the header gradient, task cards, a titled product list. */
export const Home: StoryObj<{ state: HomeState; hero: boolean; footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  decorators: onCanvas,
  args: { state: "populated", hero: true, footerNote: true },
  argTypes: {
    state: { control: "inline-radio", options: homeStates },
    hero: { control: "boolean", description: "Shell hero slot: summary tiles and search on the header gradient." },
    footerNote: { control: "boolean", description: "Shell footerNote slot: brand line, version and date." },
  },
  render: (args) => <MobileHome {...args} />,
}

/** Clients: search by surname or CRN, a removable filter chip, person cards. State sets where the screen starts. */
export const Clients: StoryObj<{ state: ClientsState; footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  decorators: onCanvas,
  args: { state: "default", footerNote: true },
  argTypes: {
    state: { control: "inline-radio", options: clientStates },
    footerNote: { control: "boolean", description: "Shell footerNote slot." },
  },
  render: (args) => <MobileClients {...args} />,
}

export const HomeAllStates: Story = {
  name: "Home: all states",
  parameters: { layout: "fullscreen" },
  render: () => <PhoneGrid items={homeStates.map((s) => ({ label: s, screen: <MobileHome state={s} /> }))} />,
}

export const ClientsAllStates: Story = {
  name: "Clients: all states",
  parameters: { layout: "fullscreen" },
  render: () => <PhoneGrid items={clientStates.map((s) => ({ label: s, screen: <MobileClients state={s} /> }))} />,
}
