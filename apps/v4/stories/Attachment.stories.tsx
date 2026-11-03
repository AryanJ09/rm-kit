// Hand-written. Not generated: edit this file directly.
// The RM Kit attachment, as in the prototype: a file icon in the accent colour and the file name, inline on the surface
// (Minutes of meeting: "MOM attached"; the documents added to a lead). `appearance="card"` puts the same content in a bordered card.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FileTextIcon, ImageIcon, XIcon } from "lucide-react"

import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle } from "@/rm-style/ui/attachment"
import { Spinner } from "@/rm-style/ui/spinner"

type Args = {
  appearance: "inline" | "card"
  state: "idle" | "uploading" | "processing" | "error" | "done"
  size: "default" | "sm" | "xs"
  name: string
  detail: string
  removable: boolean
}

const meta = {
  title: "RM Kit/Attachment",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { appearance: "inline", state: "done", size: "default", name: "MOM attached", detail: "", removable: false },
  argTypes: {
    appearance: { control: "inline-radio", options: ["inline", "card"], description: "inline: icon and name, no box (the prototype). card: a bordered card." },
    state: { control: "select", options: ["done", "uploading", "processing", "error", "idle"] },
    size: { control: "inline-radio", options: ["default", "sm", "xs"] },
    name: { control: "text" },
    detail: { control: "text", description: "A second line, such as the file size. Empty hides it." },
    removable: { control: "boolean", description: "Show a remove action." },
  },
} satisfies Meta<Args>
export default meta
type Story = StoryObj<Args>

/** Playground: every control of the attachment. */
export const Playground: Story = {
  render: ({ appearance, state, size, name, detail, removable }) => (
    <div className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Attachment appearance={appearance} state={state} size={size}>
        <AttachmentMedia>{state === "uploading" || state === "processing" ? <Spinner /> : <FileTextIcon />}</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{name}</AttachmentTitle>
          {detail && <AttachmentDescription>{detail}</AttachmentDescription>}
        </AttachmentContent>
        {removable && (
          <AttachmentActions>
            <AttachmentAction aria-label="Remove">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        )}
      </Attachment>
    </div>
  ),
}

/** The prototype's "Minutes of meeting" row, and the documents added to a lead. */
export const InlineList: Story = {
  render: () => (
    <div className="flex w-(--size-layout-frame-width) max-w-(--size-share-full) flex-col gap-(--spacing-inline-md)">
      <Attachment>
        <AttachmentMedia><FileTextIcon /></AttachmentMedia>
        <AttachmentContent><AttachmentTitle>MOM attached</AttachmentTitle></AttachmentContent>
      </Attachment>
      <Attachment>
        <AttachmentMedia><FileTextIcon /></AttachmentMedia>
        <AttachmentContent><AttachmentTitle>GST_returns_banking_stmt_Apr25-Mar26.pdf</AttachmentTitle></AttachmentContent>
      </Attachment>
      <Attachment>
        <AttachmentMedia><FileTextIcon /></AttachmentMedia>
        <AttachmentContent><AttachmentTitle>CIBIL_commercial_consumer_report.pdf</AttachmentTitle></AttachmentContent>
      </Attachment>
    </div>
  ),
}

/** The card appearance: for a file with a size and a remove action, as in a form. */
export const Card: Story = {
  render: () => (
    <AttachmentGroup className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Attachment appearance="card">
        <AttachmentMedia><FileTextIcon /></AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>KYC form.pdf</AttachmentTitle>
          <AttachmentDescription>412 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove"><XIcon /></AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment appearance="card" orientation="vertical">
        <AttachmentMedia><ImageIcon /></AttachmentMedia>
      </Attachment>
    </AttachmentGroup>
  ),
}

/** Every state, inline and card. */
export const States: Story = {
  render: () => (
    <div className="flex w-(--size-layout-frame-width) max-w-(--size-share-full) flex-col gap-(--spacing-inline-lg)">
      {(["inline", "card"] as const).map((appearance) => (
        <div key={appearance} className="flex flex-col gap-(--spacing-inline-md)">
          {(["done", "uploading", "processing", "error", "idle"] as const).map((state) => (
            <Attachment key={state} appearance={appearance} state={state}>
              <AttachmentMedia>{state === "uploading" || state === "processing" ? <Spinner /> : <FileTextIcon />}</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{`statement-${state}.pdf`}</AttachmentTitle>
                {appearance === "card" && <AttachmentDescription>{state === "error" ? "Upload failed" : "412 KB"}</AttachmentDescription>}
              </AttachmentContent>
            </Attachment>
          ))}
        </div>
      ))}
    </div>
  ),
}
