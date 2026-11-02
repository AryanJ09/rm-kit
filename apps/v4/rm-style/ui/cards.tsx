"use client"

// RM Kit card archetypes. Every card in a product is one of these six, fed with data props. They are the only way to
// make a card: the Card shell is locked (no className), and the archetypes take data, not layout, so the same data always
// gives the same card. Pick one with the catalog in rm-style/learnings/golden-rules/03-card-catalog.md.
//
//   StatCard     numbers lead            (KPI, total, balance, count, score, rate, share)
//   SummaryCard  labelled facts          (details, overview, info, callout, notice, row of key-values)
//   TaskCard     a count of to-dos       (pending, due, reminders, inbox, queue)
//   ItemCard     a record you open       (item, document, listing, result, record)
//   PersonCard   a person is the subject (person, attendee, contact, member, user)
//   GroupCard    a card of cards         (grouped items, sections, folders, expandable lists)
import * as React from "react"
import { ChevronRightIcon, EllipsisIcon, TrendingDownIcon, TrendingUpIcon, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"
import { Avatar, AvatarFallback } from "./avatar"
import { Badge } from "./badge"
import { Button } from "./button"
import { Counter } from "./counter"
import { Progress } from "./progress"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
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
} from "./card"
import { Chip } from "./chip/chip"
import { Dropdown, type DropdownOption } from "./dropdown"
import { Metric } from "./metric"
import { Separator } from "./separator"
import { Skeleton } from "./skeleton"

/* ----- shared contract ----- */

// One set of states for every archetype.
export type CardState = "default" | "loading" | "empty" | "error"
type BadgeVariant = "conservative" | "moderate" | "growth" | "aggressive" | "secure" | "success" | "neutral"
export type CardStatus = { label: string; variant?: BadgeVariant; dot?: boolean }
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
    <Badge variant={status.variant ?? "moderate"} dot={status.dot}>
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
  /** A hint behind an info icon beside the value (inline layout), e.g. the holdings behind a count. */
  info?: string
}

/** Numbers lead. `tile`: one or more big metric tiles. `inline`: a strip of small label-over-value KPIs. */
function StatCard({
  metrics,
  layout = "tile",
  tone = "default",
  divided = false,
  ...common
}: Common & {
  metrics: StatMetric[]
  layout?: "tile" | "inline"
  /** `inverse`: the dark translucent tile used on the hero band. */
  tone?: "default" | "inverse"
  /** inline: a hairline between the metrics. */
  divided?: boolean
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
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn("flex min-w-0 flex-col text-(length:--font-size-xs)", divided && i > 0 && "border-l-(length:--border-width-default) border-border pl-(--spacing-inline-lg)")}
                >
                  <span className="text-muted-foreground group-data-[tone=inverse]/card:text-primary-foreground">{m.label}</span>
                  <span className="flex items-center gap-(--spacing-inline-xs) font-(--typography-label-strong-font-weight) text-(length:--font-size-base) text-card-foreground group-data-[tone=inverse]/card:text-primary-foreground">
                    {empty || m.value === undefined ? "—" : m.value}
                    {!empty && m.info && (
                      // A metric can carry a hint (e.g. the holdings behind the count), shown on hover or focus.
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`About ${m.label}`} />}>
                            <InfoIcon />
                          </TooltipTrigger>
                          <TooltipContent>{m.info}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
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
  children,
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
  /** Any content below the lines and above the action (e.g. a bar list). The card hosts it; it keeps its own shell. */
  children?: React.ReactNode
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
        (items?.length || description || note || choices || action || children || state === "loading") && (
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
            {children}
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

const taskAccent = {
  brand: "bg-(color:--accent-subtle) text-icon-accent",
  warning: "bg-(color:--category-growth-surface) text-(color:--category-growth-text)",
  info: "bg-(color:--category-moderate-surface) text-(color:--category-moderate-text)",
}

/** A count of to-dos that opens a list. Only the icon changes per category; the colour is always the brand. Empty shows 0 and the all-clear text; error shows a dash and asks to retry. */
function TaskCard({
  count,
  title,
  text,
  icon: Icon,
  accent = "brand",
  emptyText = "You’re all caught up.",
  ...common
}: Common & {
  count: number
  title: string
  text: string
  icon: LucideIcon
  /** Tint of the icon circle by category: brand (default), warning (amber) or info (blue). The prototype tints by category. */
  accent?: "brand" | "warning" | "info"
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
        <span className={cn("flex size-(--size-icon-lg) shrink-0 items-center justify-center rounded-(--radius-pill)", taskAccent[accent])}>
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
  /** Small line above the title. Omit it unless the design shows one. */
  eyebrow?: string
  title: string
  /** Line under the title, e.g. the type of product or the amount. */
  meta?: string
  /** A line of text under the meta (a description). */
  description?: string
  /** A badge at the top right, e.g. the product type ("PMS", "AIF"). */
  kind?: CardStatus
  /** Anything at the right end of the row, e.g. an amount with a direction arrow. */
  trailing?: React.ReactNode
  /** Tags under the text, e.g. risk profiles. */
  tags?: CardStatus[]
  /** 0 to 100: a progress bar beside the tags (e.g. how far a lead has moved). */
  progress?: number
  /** A row inside an ItemList: no card shell, the list draws the surface and the separators. */
  inList?: boolean
}

function ItemContent({ eyebrow, title, meta, description, kind, trailing, tags, progress, onClick }: ItemProps) {
  return (
    <>
      <CardHeader className="flex-nowrap">
        <CardTitleGroup>
          {eyebrow && <CardDescription>{eyebrow}</CardDescription>}
          <CardTitle className="text-(length:--font-size-base)">{title}</CardTitle>
          {meta && <span className="text-(length:--font-size-sm) text-muted-foreground">{meta}</span>}
        </CardTitleGroup>
        {(kind || trailing || onClick) && (
          <CardTrailing>
            {trailing}
            {kind && <Badge variant={kind.variant ?? "neutral"}>{kind.label}</Badge>}
            {onClick && <ChevronRightIcon className="size-(--size-icon-md) text-icon-default" />}
          </CardTrailing>
        )}
      </CardHeader>
      {description && <span className="text-(length:--font-size-xs) text-muted-foreground">{description}</span>}
      {((tags && tags.length > 0) || progress !== undefined) && (
        <div className="flex flex-wrap items-center gap-(--spacing-stack-2xs)">
          {tags?.map((t) => (
            <Badge key={t.label} variant={t.variant ?? "neutral"}>
              {t.label}
            </Badge>
          ))}
          {progress !== undefined && (
            <Progress value={progress} className="w-(--size-72)" />
          )}
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

/**
 * A person is the subject. Identity (avatar, name, lines), status tags, notes (text lines, `strong` for an alert),
 * a trailing badge (`role`), an optional footer (e.g. meetings with a counter), and a mode: `read` (identity only),
 * `edit` (plus a field) or `removable` (plus a remove action). `inList` renders the person as a row of a list.
 */
function PersonCard({
  name,
  initials,
  lines,
  tags,
  notes,
  role,
  footer,
  mode = "read",
  field,
  onRemove,
  inList = false,
  chevron,
  ...common
}: Common & {
  name: string
  /** Shows an avatar when given. */
  initials?: string
  /** Lines under the name, e.g. "63 years, M" or a CRN. */
  lines?: string[]
  /** Tags under the lines, e.g. "Head", "Family of 13". */
  tags?: CardStatus[]
  /** Text lines under the tags. `tone` colours them; `strong` makes them bold (an alert). */
  notes?: { text: string; tone?: "success" | "danger" | "neutral"; strong?: boolean }[]
  /** A badge at the top right, e.g. "Auth" or a segment. */
  role?: CardStatus
  /** Below everything, separated by a line (e.g. the meetings row with its counter). */
  footer?: React.ReactNode
  mode?: "read" | "edit" | "removable"
  field?: { label: string; options: DropdownOption[]; value?: string[]; onValueChange?: (v: string[]) => void; helper?: string }
  onRemove?: () => void
  inList?: boolean
  /** Shows a chevron (an opened record). Defaults to on when the person is clickable. */
  chevron?: boolean
}) {
  const { state = "default", onClick, disabled } = common
  const showChevron = chevron ?? (!!onClick && mode === "read")
  const body = (
    <>
      {state === "error" ? (
        <ErrorBody {...common} />
      ) : state === "loading" ? (
        <CardBody loading />
      ) : (
        <>
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
            {(role || showChevron) && (
              <CardTrailing>
                <StatusBadge status={role} />
                {showChevron && <ChevronRightIcon className="size-(--size-icon-md) text-icon-default" />}
              </CardTrailing>
            )}
          </CardHeader>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
              {tags.map((t) => (
                <Badge key={t.label} variant={t.variant ?? "neutral"} dot={t.dot}>
                  {t.label}
                </Badge>
              ))}
            </div>
          )}
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
          {mode === "edit" && field ? (
            <Dropdown label={field.label} helper={field.helper} options={field.options} value={field.value} onValueChange={field.onValueChange} />
          ) : mode === "removable" ? (
            <div>
              <Button variant="ghost" size="sm" onClick={onRemove}>
                Remove
              </Button>
            </div>
          ) : null}
          {footer && <div className="flex flex-col gap-(--spacing-inline-md)"><Separator />{footer}</div>}
        </>
      )}
    </>
  )
  if (inList) {
    // A row: the same content with no shell; the list draws the surface and the separators.
    return (
      <div
        data-slot="person-row"
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
          onClick && "cursor-pointer hover:bg-surface-hover active:bg-(color:--accent-subtle) focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring focus-visible:ring-inset",
          disabled && "bg-surface-disabled *:opacity-(--opacity-disabled)"
        )}
      >
        {body}
      </div>
    )
  }
  return (
    <Card {...shell(common)} onClick={onClick} disabled={disabled} selected={common.selected}>
      {body}
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
  countLabel,
  defaultOpen = false,
  state = "default",
  children,
}: {
  title: string
  subtitle?: string
  initials?: string
  /** A Counter in the header: the number of cues, members, items. Hidden when undefined. */
  count?: number
  /** Word after the counter, e.g. "Cues". */
  countLabel?: string
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
            {count !== undefined && (
              <CardTrailing>
                <span className="flex items-center gap-(--spacing-stack-2xs) text-(length:--font-size-xs) text-muted-foreground">
                  {count !== undefined && <Counter count={count} tone="muted" showZero />}
                  {countLabel && <span>{countLabel}</span>}
                </span>
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

export { StatCard, SummaryCard, TaskCard, ItemCard, ItemList, PersonCard, GroupCard, CardKeyValue }
