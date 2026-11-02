// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Attachment, AttachmentActions, AttachmentAction, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle } from "@/rm-style/ui/attachment"
import { FileTextIcon } from "lucide-react"

// Hand-written. The RM Kit attachment: a file the user added (a document, a statement), with its name, size and actions.
const meta = { title: "RM Kit/Attachment", tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <AttachmentGroup className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Attachment>
        <AttachmentMedia><FileTextIcon /></AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>KYC form.pdf</AttachmentTitle>
          <AttachmentDescription>412 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction>Remove</AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </AttachmentGroup>
  ),
}
