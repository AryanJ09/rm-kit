#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const appDir = path.resolve(import.meta.dirname, "..")
const themePath = path.join(appDir, "rm-style/theme.css")
const input = process.argv.slice(2).join(" ") || fs.readFileSync(0, "utf8")

if (!input.trim()) {
  console.error('Paste class names as an argument or pipe them in: node scripts/translate-theme-classes.mjs "border-input bg-primary"')
  process.exit(1)
}

const css = fs.readFileSync(themePath, "utf8")
const variables = new Map(
  [...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()])
)
const themeUtilities = new Map([
  ["background", "backgroundColor"], ["foreground", "foreground"],
  ["primary", "primary"], ["primary-foreground", "primary-foreground"],
  ["secondary", "secondary"], ["secondary-foreground", "secondary-foreground"],
  ["muted", "muted"], ["muted-foreground", "muted-foreground"],
  ["accent", "accent"], ["accent-foreground", "accent-foreground"],
  ["destructive", "destructive"], ["destructive-foreground", "destructive-foreground"],
  ["border", "border"], ["input", "input"], ["ring", "ring"], ["card", "card"],
  ["card-foreground", "card-foreground"], ["popover", "popover"],
  ["popover-foreground", "popover-foreground"], ["surface", "surface"],
  ["surface-hover", "surface-hover"], ["surface-active", "surface-active"],
  ["surface-disabled", "surface-disabled"], ["control-border", "control-border"],
  ["control-off", "control-off"], ["text-primary", "text-primary"],
  ["text-secondary", "text-secondary"], ["text-tertiary", "text-tertiary"],
  ["text-disabled", "text-disabled"], ["border-subtle", "border-subtle"],
  ["border-default", "border-default"], ["border-strong", "border-strong"],
])
const semanticUtilities = new Map([...themeUtilities].map(([utility, variable]) => [utility, `--${variable}`]))
semanticUtilities.set("backgroundColor", "--background")

function resolve(value, seen = new Set()) {
  const match = value.match(/^var\((--[\w-]+)/)
  if (!match) return value
  const name = match[1]
  if (seen.has(name)) return `${name} (circular reference)`
  const next = variables.get(name)
  if (!next) return `${name} (not defined in theme.css)`
  return resolve(next, new Set([...seen, name]))
}

function stripModifiers(token) {
  let depth = 0
  let lastColon = -1
  for (let i = 0; i < token.length; i++) {
    if (token[i] === "[") depth++
    else if (token[i] === "]") depth--
    else if (token[i] === ":" && depth === 0) lastColon = i
  }
  return token.slice(lastColon + 1)
}

console.log(`Theme file: ${path.relative(process.cwd(), themePath)}\n`)
console.log("Class | Category / theme reference | Resolved theme value")
console.log("--- | --- | ---")
for (const token of input.trim().split(/\s+/)) {
  const utility = stripModifiers(token).replace(/^!/, "")
  const colorUtility = utility.match(/^(?:bg|text|border|ring|outline|fill|stroke)-(.+?)(?:\/(\d+))?$/)
  let detail = "fixed utility or arbitrary value; no direct theme mapping found"
  let value = "—"

  if (colorUtility) {
    const [, key, opacity] = colorUtility
    const semantic = semanticUtilities.get(key)
    if (semantic) {
      detail = `${semantic} in rm-style/theme.css`
      value = resolve(variables.get(semantic) ?? `${semantic} (not defined in theme.css)`)
      if (opacity) value += ` at ${opacity}% opacity`
    } else if (/^\[/.test(key)) {
      detail = "arbitrary value; inspect the bracketed CSS value directly"
      value = key.slice(1, -1)
    } else if (/^(?:black|white|transparent|current|inherit)$/.test(key)) {
      detail = "Tailwind built-in color; not a semantic theme variable"
      value = key
    } else {
      detail = "utility color not mapped by this script; inspect Tailwind theme/config"
    }
  } else if (/^(?:size|w|h|rounded|gap|p|px|py|m|mx|my|inset|top|right|bottom|left)-/.test(utility)) {
    detail = "geometry/spacing utility; usually a Tailwind scale value, not a color token"
  } else if (/^\[/.test(utility)) {
    detail = "arbitrary CSS utility; inspect its bracketed value"
    value = utility.slice(1, -1)
  }
  console.log(`${token} | ${detail} | ${value}`)
}
