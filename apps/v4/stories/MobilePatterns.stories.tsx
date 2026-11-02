// Hand-written. Not generated: edit this file directly.
// Screen patterns of the mobile application shell. These are examples assembled from kit components, not components.
// Order: the interactive phone first, then one story per screen (with a state control), then the all-states grids.
// How to add the next screen: rm-style/learnings/02-screen-build-order.md.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { MobileClient360, type Client360Tab } from "./patterns/mobile-client360"
import { MobileLeads, type LeadsState } from "./patterns/mobile-leads"
import { MobileRmPortfolio } from "./patterns/mobile-rm-portfolio"
import { MobileLeadDetail } from "./patterns/mobile-lead-detail"
import { MobileCaseDetail } from "./patterns/mobile-case-detail"
import { MobileCases, type CasesState } from "./patterns/mobile-cases"
import { MobileTasks } from "./patterns/mobile-tasks"
import type { CardState } from "@/rm-style/ui/cards"
import { MobileRmProfile, type RmProfileTab } from "./patterns/mobile-rm-profile"
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

type Client360Args = { tab: Client360Tab; name: string; crn: string; footerNote: boolean }

/** Client 360: a profile, a metric strip and an AI suggestion, then Cues (members, cue cards) or Profile (portfolios and sections). */
export const Client360: StoryObj<Client360Args> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { tab: "cues", name: "Rajesh Mehra", crn: "56792323", footerNote: true },
  argTypes: {
    tab: { control: "inline-radio", options: ["cues", "profile"] },
    name: { control: "text" },
    crn: { control: "text" },
    footerNote: { control: "boolean" },
  },
  render: ({ tab, ...args }) => {
    // The control sets the starting tab; clicks then move between Cues and Profile.
    const [current, setCurrent] = React.useState<Client360Tab>(tab)
    React.useEffect(() => setCurrent(tab), [tab])
    return <MobileClient360 {...args} tab={current} onTabChange={setCurrent} />
  },
}

/** Leads: the list of leads with their stage and progress. */
export const Leads: StoryObj<{ state: LeadsState; footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { state: "default", footerNote: true },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "empty", "loading", "error"] },
    footerNote: { control: "boolean" },
  },
  render: (args) => <MobileLeads {...args} />,
}

/** RM Portfolio: the RM's CRNs and AUM, the composition trend, the asset allocation, the client tiers and the revenue. */
export const RmPortfolio: StoryObj<{ footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { footerNote: true },
  render: (args) => <MobileRmPortfolio {...args} />,
}

/** RM profile: the person card, then Portfolio (My Customers with the matrix) and SOP (score, goals with target and cap flags). */
export const RmProfile: StoryObj<{ tab: RmProfileTab; footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { tab: "portfolio", footerNote: true },
  argTypes: { tab: { control: "inline-radio", options: ["portfolio", "sop"] } },
  render: ({ tab, ...args }) => {
    const [current, setCurrent] = React.useState<RmProfileTab>(tab)
    React.useEffect(() => setCurrent(tab), [tab])
    return <MobileRmProfile {...args} tab={current} onTabChange={setCurrent} />
  },
}

/** Lead detail: the lead, its steps (tap the active one to move on), Mark won and Drop lead, the AI actions, details and remarks. */
export const LeadDetail: StoryObj<{ footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { footerNote: true },
  render: (args) => <MobileLeadDetail {...args} />,
}

/** Case detail: the case value with its contact actions, the gates as steps, and the remarks. */
export const CaseDetail: StoryObj<{ footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { footerNote: true },
  render: (args) => <MobileCaseDetail {...args} />,
}

/** Cases: a search and the case rows, or the empty message. */
export const Cases: StoryObj<{ state: CasesState; footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { state: "default", footerNote: true },
  argTypes: { state: { control: "inline-radio", options: ["default", "empty"] } },
  render: (args) => <MobileCases {...args} />,
}

/** Tasks: one task card per category. */
export const Tasks: StoryObj<{ state: CardState; footerNote: boolean }> = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  args: { state: "default", footerNote: true },
  argTypes: { state: { control: "inline-radio", options: ["default", "loading", "empty", "error"] } },
  render: (args) => <MobileTasks {...args} />,
}
