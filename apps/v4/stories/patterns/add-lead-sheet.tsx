// Pattern example, not a component: the Add lead form, from the prototype ("Capture the basics now, the rest after"), as a
// bottom sheet: fixed header and footer, the fields scroll between them. Cancel asks to confirm before the details are lost.
// Assembled only from kit components: BottomSheetContent, Input, Dropdown, ChipGroup, AlertDialog, Button.
import * as React from "react"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/rm-style/ui/alert-dialog"
import { BottomSheetContent } from "@/rm-style/ui/bottom-sheet"
import { Button } from "@/rm-style/ui/button"
import { ChipGroup, ChipGroupItem } from "@/rm-style/ui/chip/chip-group"
import { Dropdown } from "@/rm-style/ui/dropdown"
import { Input } from "@/rm-style/ui/input"

type Option = { value: string; label: string }

type AddLeadSheetProps = {
  relationships: Option[]
  sources: Option[]
  products: Option[]
  temperatures: Option[]
  onSave: () => void
  onDiscard: () => void
}

function AddLeadSheetContent({ relationships, sources, products, temperatures, onSave, onDiscard }: AddLeadSheetProps) {
  const [relationship, setRelationship] = React.useState<string[]>([])
  const [source, setSource] = React.useState<string[]>([])
  const [product, setProduct] = React.useState<string[]>([])
  const [temperature, setTemperature] = React.useState<string[]>([temperatures[0]?.value ?? ""])
  const [confirm, setConfirm] = React.useState(false)
  return (
    <>
      <BottomSheetContent
        title="Add lead"
        description="Capture the basics now, the rest after."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(true)}>Cancel</Button>
            <Button onClick={onSave}>Save and continue</Button>
          </>
        }
      >
        <div className="flex flex-col gap-(--spacing-stack-lg) pb-(--spacing-inline-md)">
          <Dropdown label="Relationship" placeholder="Select" options={relationships} value={relationship} onValueChange={setRelationship} />
          <Dropdown label="Source" placeholder="Select" options={sources} value={source} onValueChange={setSource} />
          <Input label="Sub-agent" placeholder="Agent name or code" />
          <Input label="Customer name" placeholder="Search by name or CRN" helper="A lead already exists for this customer" state="error" />
          <Dropdown label="Product" placeholder="Select a product" options={products} value={product} onValueChange={setProduct} />
          <Input label="Need" placeholder="What are they trying to do" />
          <Input label="Indicative amount" placeholder="Amount" />
          <Input label="Contribution" placeholder="Contribution" />
          <Input label="Competitor" placeholder="Who else are they talking to" />
          <div className="flex flex-col gap-(--spacing-stack-sm)">
            <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">Temperature</span>
            <ChipGroup value={temperature} onValueChange={(v) => setTemperature(v.length ? v : temperature)}>
              {temperatures.map((t) => (
                <ChipGroupItem key={t.value} value={t.value}>{t.label}</ChipGroupItem>
              ))}
            </ChipGroup>
          </div>
        </div>
      </BottomSheetContent>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard this lead?</AlertDialogTitle>
            <AlertDialogDescription>The details you entered will not be saved.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={onDiscard}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { AddLeadSheetContent, type AddLeadSheetProps }
