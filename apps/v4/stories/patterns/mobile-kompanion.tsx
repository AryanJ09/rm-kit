// Pattern, not a component: the Kompanion conversation (prototype "Kompanion conversation"). The header is the inside shell
// header; the middle scrolls; the RM's messages sit on the right, the AI's on the left in the tinted surface; action chips sit
// above the composer. Built from Message, Bubble, Chip, Button and InputGroup. Every label, agent and message is data.
import * as React from "react"
import { BotIcon, ChevronDownIcon, PaperclipIcon, SendIcon } from "lucide-react"

import { ShellHeader } from "@/rm-style/ui/application-shell/shell-header"
import { Bubble, BubbleContent } from "@/rm-style/ui/bubble"
import { Button } from "@/rm-style/ui/button"
import { Chip } from "@/rm-style/ui/chip/chip"
import { InputGroup, InputGroupInput } from "@/rm-style/ui/input-group"
import { Message, MessageContent, MessageFooter } from "@/rm-style/ui/message"

type KompanionMessage = { id: string; sender: "rm" | "ai"; body: string; time: string }

type MobileKompanionProps = {
  title: string
  /** The agent that answers, e.g. "Sales Coach". Shown on the selector and in the placeholder. */
  agent: string
  messages: KompanionMessage[]
  /** Action chips offered under the conversation, above the composer. */
  chips: string[]
  onBack?: () => void
  onSend: (text: string) => void
  onChip: (label: string) => void
  onAgentClick?: () => void
  onAttach?: () => void
}

function MobileKompanion({ title, agent, messages, chips, onBack, onSend, onChip, onAgentClick, onAttach }: MobileKompanionProps) {
  const [draft, setDraft] = React.useState("")
  const text = draft.trim()
  const submit = () => {
    if (!text) return
    onSend(text)
    setDraft("")
  }

  return (
    <div className="flex h-(--size-share-full) min-h-0 flex-col">
      <ShellHeader context="inside" title={title} titleStyle="heading" onBack={onBack} />

      <div className="flex min-h-0 flex-1 flex-col gap-(--spacing-inline-md) overflow-y-auto p-(--spacing-inline-md)">
        {messages.map((m) =>
          m.sender === "rm" ? (
            <Message key={m.id} align="end">
              <MessageContent>
                <Bubble align="end" variant="default">
                  <BubbleContent>{m.body}</BubbleContent>
                </Bubble>
                <MessageFooter>{m.time}</MessageFooter>
              </MessageContent>
            </Message>
          ) : (
            <Message key={m.id}>
              <MessageContent>
                <Bubble variant="tinted">
                  <BubbleContent>{m.body}</BubbleContent>
                </Bubble>
                <MessageFooter>{m.time}</MessageFooter>
              </MessageContent>
            </Message>
          )
        )}
      </div>

      <div className="flex flex-col gap-(--spacing-inline-sm) p-(--spacing-inline-md)">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-(--spacing-inline-sm)">
            {chips.map((label) => (
              <Chip key={label} variant="outline" selectable={false} onClick={() => onChip(label)}>
                {label}
              </Chip>
            ))}
          </div>
        )}

        <InputGroup className="h-auto flex-col items-stretch gap-(--spacing-inline-md) p-(--spacing-inline-lg)">
          <InputGroupInput
            aria-label="Message"
            value={draft}
            placeholder={`Ask ${agent}... (Type @ to switch agents)`}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit()
            }}
          />
          <div className="flex items-center gap-(--spacing-inline-sm)">
            <Button variant="outline" size="sm" onClick={onAgentClick}>
              <BotIcon />
              {agent}
              <ChevronDownIcon />
            </Button>
            <span className="flex-1" />
            <Button variant="ghost" size="icon-sm" aria-label="Attach file" onClick={onAttach}>
              <PaperclipIcon />
            </Button>
            <Button size="icon-sm" aria-label="Send" disabled={!text} onClick={submit}>
              <SendIcon />
            </Button>
          </div>
        </InputGroup>
      </div>
    </div>
  )
}

export { MobileKompanion, type KompanionMessage, type MobileKompanionProps }
