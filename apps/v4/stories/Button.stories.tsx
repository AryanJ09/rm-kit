// Hand-written. One "RM Kit/Button" entry: the playground with controls first, then use cases, then the Figma grid and the variant demos.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Mail, Plus, Trash2 } from "lucide-react"
import { Button } from "@/rm-style/ui/button"
import DemoButtonDefault from "@/examples/base/button-default"
import DemoButtonDemo from "@/examples/base/button-demo"
import DemoButtonDestructive from "@/examples/base/button-destructive"
import DemoButtonGhost from "@/examples/base/button-ghost"
import DemoButtonIcon from "@/examples/base/button-icon"
import DemoButtonLink from "@/examples/base/button-link"
import DemoButtonOutline from "@/examples/base/button-outline"
import DemoButtonRender from "@/examples/base/button-render"
import DemoButtonRounded from "@/examples/base/button-rounded"
import DemoButtonSecondary from "@/examples/base/button-secondary"
import DemoButtonSize from "@/examples/base/button-size"
import DemoButtonSpinner from "@/examples/base/button-spinner"
import DemoButtonWithIcon from "@/examples/base/button-with-icon"
import FigmaGrid from "./figma/button"

// Every property of the button is a control: variant, size, label, icon, count, loading and disabled.
const icons = { none: undefined, plus: <Plus />, mail: <Mail />, trash: <Trash2 /> }

type Args = { children: string; variant: "default" | "secondary" | "ghost" | "outline" | "destructive" | "success" | "link"; size: "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg"; icon: keyof typeof icons; count: number; loading: boolean; disabled: boolean }

const meta = {
  title: "RM Kit/Button",
  parameters: { layout: "centered" },
  component: Button,
  tags: ["autodocs"],
  args: { children: "Continue", variant: "default", size: "md", icon: "none", count: 0, loading: false, disabled: false },
  argTypes: {
    children: { control: "text", description: "Label. Empty makes an icon button (give it an aria-label)." },
    variant: { control: "inline-radio", options: ["default", "secondary", "ghost", "outline", "destructive", "success", "link"], description: "success is the green outline (Mark won in the prototype)." },
    size: { control: "inline-radio", options: ["sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"] },
    icon: { control: "inline-radio", options: Object.keys(icons), description: "An icon before the label (or alone, for an icon button)." },
    count: { control: { type: "number", min: 0 }, description: "A counter on the corner (e.g. the filter with one filter on). 0 hides it." },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: StoryObj<Args> = {
  render: ({ children, icon, ...props }) => (
    <Button aria-label={children ? undefined : "Action"} {...props}>
      {icons[icon]}
      {children || null}
    </Button>
  ),
}

// Use cases: real actions, one per row, so the scale and the hierarchy are visible together.
export const UseCases: StoryObj = {
  render: () => (
    <div className="grid gap-(--spacing-inline-lg) p-(--spacing-inline-lg)">
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button>Save client</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button size="sm">Add note</Button>
        <Button size="md">Add note</Button>
        <Button size="lg">Add note</Button>
      </div>
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button size="icon-sm" aria-label="Add"><Plus /></Button>
        <Button size="icon-md" variant="secondary" aria-label="Email"><Mail /></Button>
        <Button size="icon-lg" variant="ghost" aria-label="Delete"><Trash2 /></Button>
      </div>
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button loading>Saving</Button>
        <Button disabled>Unavailable</Button>
        <Button variant="secondary" count={3}>Filters</Button>
        <Button size="icon-md" variant="secondary" aria-label="Filter clients" count={1}><Mail /></Button>
      </div>
    </div>
  ),
}

export const AllStates: Story = { name: "All States", render: () => <FigmaGrid />, parameters: { layout: "fullscreen" } }
export const Default: Story = { render: () => <DemoButtonDefault /> }
export const Demo: Story = { render: () => <DemoButtonDemo /> }
export const Destructive: Story = { render: () => <DemoButtonDestructive /> }
export const Ghost: Story = { render: () => <DemoButtonGhost /> }
export const Icon: Story = { render: () => <DemoButtonIcon /> }
export const Link: Story = { render: () => <DemoButtonLink /> }
export const Outline: Story = { render: () => <DemoButtonOutline /> }
export const Render: Story = { render: () => <DemoButtonRender /> }
export const Rounded: Story = { render: () => <DemoButtonRounded /> }
export const Secondary: Story = { render: () => <DemoButtonSecondary /> }
export const Size: Story = { render: () => <DemoButtonSize /> }
export const Spinner: Story = { render: () => <DemoButtonSpinner /> }
export const WithIcon: Story = { render: () => <DemoButtonWithIcon /> }
