// Pattern, not a component: the cue action sheet (prototype "Actions"). A BottomSheet whose body is a list: the first row is
// an AI suggestion (AiSuggestion row, the gradient with a star), the rest are plain rows with a tinted icon tile.
// Every label and icon is data. Built from BottomSheetContent, AiSuggestion and Button.
import * as React from "react"
import { BottomSheet, BottomSheetContent, BottomSheetTrigger } from "@/rm-style/ui/bottom-sheet"
import { AiSuggestion } from "@/rm-style/ui/ai-suggestion"
import { Button } from "@/rm-style/ui/button"

type ActionItem = { id: string; label: string; icon: React.ReactNode }

type CueActionSheetProps = {
  title: string
  suggestion: { id: string; label: string }
  actions: ActionItem[]
  onSelect: (id: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CueActionSheet({ title, suggestion, actions, onSelect, open, onOpenChange }: CueActionSheetProps) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetTrigger render={<Button variant="outline" />}>Open actions</BottomSheetTrigger>
      <BottomSheetContent title={title}>
        <div className="flex flex-col gap-(--spacing-inline-sm) pb-(--spacing-group)">
          <AiSuggestion variant="row" onClick={() => onSelect(suggestion.id)}>
            {suggestion.label}
          </AiSuggestion>
          {actions.map((a) => (
            <Button key={a.id} variant="ghost" className="h-auto justify-start py-(--spacing-inline-sm) px-(--spacing-inline-md) font-(--typography-body-md-font-weight) text-foreground" onClick={() => onSelect(a.id)}>
              <span aria-hidden className="flex size-(--size-control-32) shrink-0 items-center justify-center rounded-(--radius-pill) bg-(color:--accent-subtle) text-icon-accent [&_svg]:size-(--size-icon-sm)">
                {a.icon}
              </span>
              {a.label}
            </Button>
          ))}
        </div>
      </BottomSheetContent>
    </BottomSheet>
  )
}

export { CueActionSheet, type CueActionSheetProps, type ActionItem }
