// Hand-written from the OneDLS "application-shell" reference (desktop structure), rebuilt on the kit's own components and tokens.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ClipboardListIcon, CreditCardIcon, EllipsisIcon, HouseIcon, LandmarkIcon, LifeBuoyIcon, LogOutIcon, TrendingUpIcon, WalletIcon } from "lucide-react"

import { ApplicationShell, type ShellWorkspace } from "@/rm-style/ui/application-shell"
import { StatCard } from "@/rm-style/ui/cards"
import { Search } from "@/rm-style/ui/search"

// Storybook preview window sizes (device widths for the toolbar, not styling, so they are plain numbers here).
const viewports = {
  rmDesktop: { name: "RM desktop", styles: { width: "1280px", height: "800px" } }, // rules-allow: preview window size
  rmMobile: { name: "RM mobile", styles: { width: "430px", height: "932px" } }, // rules-allow: preview window size
}

// Workspaces: Customer is the reference's customer navigation; Employee is the other workspace the user can switch to.
const workspaces: ShellWorkspace[] = [
  {
    id: "customer",
    label: "Customer",
    items: [
      { id: "home", label: "Home", icon: HouseIcon },
      { id: "payments", label: "Payments", icon: WalletIcon, badge: 10 },
      { id: "credit-cards", label: "Credit cards", icon: CreditCardIcon },
      { id: "investments", label: "Investments", icon: TrendingUpIcon },
      { id: "deposits", label: "Deposits", icon: LandmarkIcon },
      { id: "more", label: "More", icon: EllipsisIcon },
    ],
    serviceItems: [
      { id: "help", label: "Help and support", icon: LifeBuoyIcon },
      { id: "exit", label: "Exit customer account", icon: LogOutIcon, destructive: true },
    ],
  },
  {
    id: "employee",
    label: "Employee",
    items: [
      { id: "emp-home", label: "Home", icon: HouseIcon },
      { id: "tasks", label: "Tasks", icon: ClipboardListIcon },
    ],
    serviceItems: [{ id: "emp-help", label: "Help and support", icon: LifeBuoyIcon }],
  },
]

type Args = {
  variant: "mobile" | "desktop"
  title: string
  subtitle: string
  initials: string
  notificationCount: number
  hero: boolean
  footerNote: boolean
  insidePage: boolean
}

const meta = {
  title: "RM Kit/Application shell/Application shell",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { options: viewports } },
  // The shell stands for the device, so it sits on a neutral canvas with room around it.
  decorators: [(Story) => <div className="h-svh bg-muted p-(--spacing-inline-lg)"><Story /></div>],
  args: { variant: "mobile", title: "Mohit Verma", subtitle: "CRN: 1234509888", initials: "MV", notificationCount: 3, hero: false, footerNote: false, insidePage: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["mobile", "desktop"], description: "mobile (default): header with hamburger, content, bottom navigation. desktop: sidebar, header, content." },
    title: { control: "text" },
    subtitle: { control: "text" },
    initials: { control: "text" },
    notificationCount: { control: { type: "number", min: 0 }, description: "Bell badge. Hidden at 0, shows 99+ above 99." },
    hero: { control: "boolean", description: "mobile: content under the header on the same gradient (summary tile, search)." },
    footerNote: { control: "boolean", description: "mobile: small centred note at the end of the content." },
    insidePage: { control: "boolean", description: "mobile: the white inside-page bar (back arrow, title) instead of the home bar." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const content = <div className="p-(--spacing-inline-lg) text-(length:--font-size-sm) text-text-secondary">Screen content goes here.</div>
const profile = { name: "Mohit Verma", detail: "CRN: 1234509888", initials: "MV" }
const logo = <span className="text-(length:--typography-title-md-font-size) font-(--typography-heading-md-font-weight) text-text-primary">Cloud Branch</span>

// Default: mobile. Hamburger in the header opens the sidebar; the bottom navigation sits under the content.
export const Mobile: Story = {
  globals: { viewport: { value: "rmMobile", isRotated: false } },
  render: ({ variant: _variant, hero, footerNote, insidePage, ...args }) => (
    <ApplicationShell
      {...args}
      variant="mobile"
      logo={logo}
      profile={profile}
      workspaces={workspaces}
      hero={
        hero ? (
          <>
            <div className="px-(--spacing-group)">
              <StatCard tone="inverse" layout="inline" metrics={[{ label: "AUM", value: "₹9.2 Cr", trend: "up", change: "+3.3%" }]} />
            </div>
            <div className="px-(--spacing-inline-lg)">
              <Search placeholder="Search name, CRN" />
            </div>
          </>
        ) : undefined
      }
      footerNote={footerNote ? "Powered by Brand • v0.2.0" : undefined}
      insidePage={insidePage ? { title: "Clients", time: "12:30", onBack: () => {} } : undefined}
    >
      {content}
    </ApplicationShell>
  ),
}

// Desktop: persistent sidebar (collapses to the icon rail), header, content. No bottom navigation.
export const Desktop: Story = {
  globals: { viewport: { value: "rmDesktop", isRotated: false } },
  render: ({ variant: _variant, hero: _hero, footerNote: _footerNote, insidePage: _insidePage, ...args }) => (
    <ApplicationShell {...args} variant="desktop" logo={logo} profile={profile} workspaces={workspaces}>
      {content}
    </ApplicationShell>
  ),
}
