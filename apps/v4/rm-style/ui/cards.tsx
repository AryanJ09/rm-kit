"use client"

// RM Kit card archetypes. Every card in a product is one of these six, fed with data props. They are the only way to
// make a card: the Card shell is locked (no className), and the archetypes take data, not layout, so the same data always
// gives the same card. Pick one with the catalog in rm-style/learnings/golden-rules/03-card-catalog.md.
//
//   StatCard     numbers lead            (KPI, total, balance, count, score, rate, AUM)
//   SummaryCard  labelled facts          (details, overview, info, callout, notice, row of key-values)
//   TaskCard     a count of to-dos       (pending, due, reminders, inbox, queue)
//   ItemCard     a record you open       (product, fund, document, listing, result)
//   PersonCard   a person is the subject (client, attendee, contact, member, user)
//   GroupCard    a card of cards         (grouped cues, sections, folders, expandable lists)
import * as React from "react"
import { ChevronRightIcon, EllipsisIcon, TrendingDownIcon, TrendingUpIcon, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"
import { Avatar, AvatarFallback } from "@/rm-style/ui/avatar"
import { Badge } from "@/rm-style/ui/badge"
import { Button } from "@/rm-style/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardKeyValue,
  CardLeading,
  CardTitle,
  CardTitleGroup,
  CardTrailing,
} from "@/rm-style/ui/card"
import { Chip } from "@/rm-style/ui/chip/chip"
import { Dropdown, type DropdownOption } from "@/rm-style/ui/dropdown"
import { Metric } from "@/rm-style/ui/metric"
import { Separator } from "@/rm-style/ui/separator"
import { Skeleton } from "@/rm-style/ui/skeleton"

/* ----- shared contract ----- */

// One set of states for every archetype.
export type CardState = "default" | "loading" | "empty" | "error"
type BadgeVariant = "conservative" | "moderate" | "growth" | "aggressive" | "secure" | "success" | "neutral"
export type CardStatus = { label: string; variant?: BadgeVariant }
export type CardItem = { label: string; value?: React.ReactNode; trend?: "up" | "down" }

type Common = {
  state?: CardState
  /** Whole card is one click target. Inner controls keep their own clicks. */
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
  /** Error state: what failed, and the retry action. */
  errorTitle?: string
  errorText?: string
  onRetry?: () => void
}

const shell = ({ onClick, selected, disabled }: Common) => ({ onClick, selected, disabled })

function StatusBadge({ status }: { status?: CardStatus }) {
  if (!status) return null
  return (
    <Badge variant={status.variant ?? "moderate"} dot>
      {status.label}
    </Badge>
  )
}

function ErrorBody({ errorTitle = "Unavailable", errorText = "Check your connection and retry.", onRetry }: Common) {
  return (
    <CardBody>
      <CardTitle className="text-destructive">{errorTitle}</CardTitle>
      <CardDescription>{errorText}</CardDescription>
      {onRetry && (
        <div>
          <Button variant="ghost" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </CardBody>
  )
}

const trendText = { up: "text-(color:--category-success-text)", down: "text-(color:--category-aggressive-text)" }

/* ----- StatCard ----- */

export type StatMetric = {
  label: string
  value?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  change?: string
  period?: string
}

/** Numbers lead. `tile`: one or more big metric tiles. `inline`: a strip of small label-over-value KPIs. */
function StatCard({
  metrics,
  layout = "tile",
  tone = "default",
  ...common
}: Common & {
  metrics: StatMetric[]
  layout?: "tile" | "inline"
  /** `inverse`: the dark translucent tile used on the hero band. */
  tone?: "default" | "inverse"
}) {
  const { state = "default" } = common
  const empty = state === "empty"
  return (
    <Card {...shell(common)} tone={tone}>
      {state === "error" ? (
        <ErrorBody {...common} />
      ) : (
        <CardBody loading={state === "loading"}>
          {layout === "tile" ? (
            metrics.map((m) => (
              <Metric
                key={m.label}
                label={m.label}
                value={empty || m.value === undefined ? "—" : m.value}
                trend={empty ? "neutral" : m.trend}
                change={empty ? undefined : m.change}
                period={m.period}
              />
            ))
          ) : (
            <div className="flex gap-(--spacing-inline-lg)">
              {metrics.map((m) => (
                <div key={m.label} className="flex min-w-0 flex-col text-(length:--font-size-xs)">
                  <span className="text-muted-foreground group-data-[tone=inverse]/card:text-primary-foreground">{m.label}</span>
                  <span className="flex items-center gap-(--spacing-inline-xs) font-(--typography-label-strong-font-weight) text-(length:--font-size-base) text-card-foreground group-data-[tone=inverse]/card:text-primary-foreground">
                    {empty || m.value === undefined ? "—" : m.value}
                    {!empty && m.change && (
                      <span className="flex items-center gap-(--spacing-stack-3xs) text-(length:--font-size-xs) font-(--typography-label-sm-font-weight)">
                        {m.trend === "up" && <TrendingUpIcon className="size-(--size-icon-3xs)" />}
                        {m.trend === "down" && <TrendingDownIcon className="size-(--size-icon-3xs)" />}
                        {m.change}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      )}
    </Card>
  )
}

/* ----- SummaryCard ----- */

/** Labelled facts about one thing: title, status, key-value lines, text, and optional choice chips. */
function SummaryCard({
  title,
  subtitle,
  status,
  items,
  description,
  note,
  choices,
  onMore,
  action,
  tone = "default",
  density = "default",
  ...common
}: Common & {
  title?: string
  subtitle?: string
  status?: CardStatus
  items?: CardItem[]
  /** Body text. */
  description?: React.ReactNode
  /** Small grey line under everything (remarks, source). */
  note?: React.ReactNode
  /** Choice chips (filters or sections) under the content. */
  choices?: { label: string; selected?: boolean; onSelect?: () => void }[]
  /** Shows a "more" icon in the header. */
  onMore?: () => void
  /** One action under the content (e.g. "Reset filters"). Only when needed. */
  action?: { label: string; onClick: () => void; variant?: "default" | "secondary" }
  /** `info`: a highlighted notice or mandatory item. */
  tone?: "default" | "info"
  /** `compact`: the one-line row. */
  density?: "default" | "compact"
}) {
  const { state = "default" } = common
  const header = title || subtitle || status || onMore
  return (
    <Card {...shell(common)} tone={tone} density={density}>
      {header && (
        <CardHeader>
          <CardTitleGroup>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardTitleGroup>
          {(status || onMore) && (
            <CardTrailing>
              <StatusBadge status={status} />
              {onMore && (
                <Button variant="ghost" size="icon-sm" aria-label="More" onClick={onMore}>
                  <EllipsisIcon />
                </Button>
              )}
            </CardTrailing>
          )}
        </CardHeader>
      )}
      {state === "error" ? (
        <ErrorBody {...common} />
      ) : (
        (items?.length || description || note || choices || action || state === "loading") && (
          <CardBody loading={state === "loading"}>
            {items?.map((item) => (
              <CardKeyValue key={item.label} label={item.label}>
                {state === "empty" ? undefined : item.trend ? (
                  <span className={trendText[item.trend]}>{item.value}</span>
                ) : (
                  item.value
                )}
              </CardKeyValue>
            ))}
            {description && (
              <div className="text-(length:--font-size-sm) text-card-foreground">{description}</div>
            )}
            {note && <CardDescription>{note}</CardDescription>}
            {choices && (
              <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
                {choices.map((c) => (
                  <Chip key={c.label} pressed={c.selected} onPressedChange={() => c.onSelect?.()}>
                    {c.label}
                  </Chip>
                ))}
              </div>
            )}
            {action && (
              <div>
                <Button variant={action.variant ?? "secondary"} onClick={action.onClick}>
                  {action.label}
                </Button>
              </div>
            )}
          </CardBody>
        )
      )}
    </Card>
  )
}

/* ----- TaskCard ----- */

/** A count of to-dos that opens a list. Only the icon changes per category; the colour is always the brand. Empty shows 0 and the all-clear text; error shows a dash and asks to retry. */
function TaskCard({
  count,
  title,
  text,
  icon: Icon,
  emptyText = "You’re all caught up.",
  ...common
}: Common & {
  count: number
  title: string
  text: string
  icon: LucideIcon
  emptyText?: string
}) {
  const { state = "default" } = common
  const loading = state === "loading"
  const error = state === "error"
  return (
    <Card {...shell(common)} elevated onClick={error ? common.onRetry : common.onClick}>
      <CardHeader className="flex-nowrap items-start justify-between">
        {loading ? (
          <Skeleton className="h-(--size-skeleton-line-height) w-(--size-40)" />
        ) : (
          <span
            className={cn(
              "text-(length:--typography-heading-lg-font-size) leading-(--typography-heading-lg-line-height) font-(--typography-heading-md-font-weight)",
              error ? "text-destructive" : "text-card-foreground"
            )}
          >
            {error ? "—" : state === "empty" ? 0 : count}
          </span>
        )}
        <span className="flex size-(--size-icon-lg) shrink-0 items-center justify-center rounded-(--radius-pill) bg-(color:--accent-subtle) text-icon-accent">
          <Icon className="size-(--size-icon-xs)" />
        </span>
      </CardHeader>
      <CardBody loading={loading}>
        <div className="flex flex-col gap-(--spacing-stack-xs)">
          <CardTitle className="text-(length:--font-size-base)">{title}</CardTitle>
          <span className={cn("text-(length:--font-size-xs)", error ? "text-destructive" : "text-card-foreground")}>
            {error ? (common.errorText ?? "Unavailable. Tap to retry.") : state === "empty" ? emptyText : text}
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

/* ----- ItemCard ----- */

type ItemProps = Common & {
  eyebrow?: string
  title: string
  meta?: string
  tags?: CardStatus[]
  /** A row inside an ItemList: no card shell, the list draws the surface and the separators. */
  inList?: boolean
}

function ItemContent({ eyebrow, title, meta, tags, onClick }: ItemProps) {
  return (
    <>
      <CardHeader className="flex-nowrap">
        <CardTitleGroup>
          {eyebrow && <CardDescription>{eyebrow}</CardDescription>}
          <CardTitle className="text-(length:--font-size-base)">{title}</CardTitle>
          {meta && <span className="text-(length:--font-size-sm) text-muted-foreground">{meta}</span>}
        </CardTitleGroup>
        {onClick && (
          <CardTrailing>
            <ChevronRightIcon className="size-(--size-icon-md) text-icon-default" />
          </CardTrailing>
        )}
      </CardHeader>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
          {tags.map((t) => (
            <Badge key={t.label} variant={t.variant ?? "neutral"}>
              {t.label}
            </Badge>
          ))}
        </div>
      )}
    </>
  )
}

/** A record you open: eyebrow, title, meta and tags, with a chevron. `inList` makes it a row of an ItemList. */
function ItemCard({ inList = false, ...props }: ItemProps) {
  const { state = "default", onClick, disabled } = props
  if (inList) {
    // Row: same content, no shell. Pressed uses the brand tint like the card.
    return (
      <div
        data-slot="item-row"
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        inert={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (onClick && !disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onClick()
          }
        }}
        className={cn(
          "flex min-w-0 flex-col gap-(--spacing-stack-xs) p-(--spacing-stack-md) outline-none",
          onClick &&
            "cursor-pointer hover:bg-surface-hover active:bg-(color:--accent-subtle) focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring focus-visible:ring-inset",
          disabled && "bg-surface-disabled *:opacity-(--opacity-disabled)"
        )}
      >
        {state === "error" ? (
          <ErrorBody errorTitle="Unavailable" {...props} />
        ) : state === "loading" ? (
          <CardBody loading />
        ) : (
          <ItemContent {...props} />
        )}
      </div>
    )
  }
  if (state === "error")
    return (
      <Card {...shell(props)} onClick={undefined}>
        <ErrorBody errorTitle="Unavailable" {...props} />
      </Card>
    )
  return (
    <Card {...shell(props)}>
      {state === "loading" ? <CardBody loading /> : <ItemContent {...props} />}
    </Card>
  )
}

/** The white surface that holds ItemCard rows (`inList`), with an inset separator between them. */
function ItemList({ children }: { children: React.ReactNode }) {
  const rows = React.Children.toArray(children)
  return (
    <div data-slot="item-list" role="list" className="overflow-hidden rounded-(--radius-md) bg-card">
      {rows.map((row, i) => (
        <div key={i} role="listitem">
          {row}
          {i < rows.length - 1 && <Separator className="mx-(--spacing-stack-md) w-auto" />}
        </div>
      ))}
    </div>
  )
}

/* ----- PersonCard ----- */

/** A person is the subject. `read`: identity only. `edit`: plus a field. `removable`: plus a remove action. */
function PersonCard({
  name,
  initials,
  lines,
  notes,
  role,
  mode = "read",
  field,
  onRemove,
  ...common
}: Common & {
  name: string
  /** Shows an avatar when given. */
  initials?: string
  lines?: string[]
  /** Lines under the identity with a tone: a status ("AUTH · Head") or an alert ("Overdue · 31 Aug 2026", `strong`). */
  notes?: { text: string; tone?: "success" | "danger" | "neutral"; strong?: boolean }[]
  role?: CardStatus
  mode?: "read" | "edit" | "removable"
  field?: { label: string; options: DropdownOption[]; value?: string[]; onValueChange?: (v: string[]) => void; helper?: string }
  onRemove?: () => void
}) {
  const { state = "default" } = common
  // Loading is skeleton lines only, as in a list of rows still waiting for data.
  if (state === "loading")
    return (
      <Card {...shell(common)}>
        <CardBody loading />
      </Card>
    )
  return (
    <Card {...shell(common)}>
      <CardHeader>
        {initials && (
          <CardLeading>
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </CardLeading>
        )}
        <CardTitleGroup>
          <CardTitle>{name}</CardTitle>
          {lines?.map((l) => <CardDescription key={l}>{l}</CardDescription>)}
        </CardTitleGroup>
        {(role || (common.onClick && mode === "read")) && (
          <CardTrailing>
            <StatusBadge status={role} />
            {/* A clickable person card opens the person: a chevron, as on ItemCard. */}
            {common.onClick && mode === "read" && <ChevronRightIcon className="size-(--size-icon-md) text-icon-default" />}
          </CardTrailing>
        )}
      </CardHeader>
      {notes?.map((n) => (
        <span
          key={n.text}
          className={cn(
            "text-(length:--font-size-xs)",
            n.strong && "font-(--typography-label-strong-font-weight)",
            n.tone === "success" && "text-(color:--category-success-text)",
            n.tone === "danger" && "text-(color:--category-aggressive-text)",
            (!n.tone || n.tone === "neutral") && "text-muted-foreground"
          )}
        >
          {n.text}
        </span>
      ))}
      {state === "error" ? (
        <ErrorBody {...common} />
      ) : mode === "edit" && field ? (
        <Dropdown
          label={field.label}
          helper={field.helper}
          options={field.options}
          value={field.value}
          onValueChange={field.onValueChange}
        />
      ) : mode === "removable" ? (
        <div>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Remove
          </Button>
        </div>
      ) : null}
    </Card>
  )
}

/* ----- GroupCard ----- */

/** A card of cards. The header opens and closes the group; the children are other archetypes. */
function GroupCard({
  title,
  subtitle,
  initials,
  count,
  defaultOpen = false,
  state = "default",
  children,
}: {
  title: string
  subtitle?: string
  initials?: string
  /** Badge in the header, e.g. "2 CUES". */
  count?: string
  defaultOpen?: boolean
  state?: "default" | "loading"
  children: React.ReactNode
}) {
  return (
    <Accordion variant="card" chevron="default" defaultValue={defaultOpen ? ["group"] : []}>
      <AccordionItem value="group">
        <AccordionTrigger>
          <CardHeader className="flex-1">
            {initials && (
              <CardLeading>
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </CardLeading>
            )}
            <CardTitleGroup>
              <CardTitle>{title}</CardTitle>
              {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </CardTitleGroup>
            {count && (
              <CardTrailing>
                <Badge variant="neutral">{count}</Badge>
              </CardTrailing>
            )}
          </CardHeader>
        </AccordionTrigger>
        <AccordionContent loading={state === "loading"}>
          <div className="flex flex-col gap-(--spacing-inline-md)">
            <Separator />
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export { StatCard, SummaryCard, TaskCard, ItemCard, ItemList, PersonCard, GroupCard }
