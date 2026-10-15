// Token audit for the RM kit. Run: node scripts/audit-tokens.mjs
// 1. Every CSS custom property outside the --ds-* primitive layer must resolve to a primitive:
//    no raw hex/px/rem/number literals, no undefined var() references, no cycles.
// 2. Every RM Kit component must style with token utilities only: no raw colours, no
//    arbitrary px/rem values, no default Tailwind numeric scale (p-4, gap-2, size-5 ...).
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const CSS = ["theme.css", "components.css", "fields.css", "navigation.css"].map((f) => path.join(ROOT, "rm-style", f))
const UI = path.join(ROOT, "rm-style", "ui")

// Components that make up the RM Kit, plus the files they compose.
const KIT = [
  "button", "badge", "checkbox", "radio-group", "switch", "input", "textarea", "search", "dropdown",
  "date-picker", "calendar", "navigation-item", "bottom-navigation", "bottom-navigation-central-button",
  "alert-dialog", "dialog", "drawer", "message", "message-scroller", "sheet", "spinner", "label",
]

const problems = []

// ---- 1. CSS chain ----
const decl = new Map()
for (const file of CSS) {
  const src = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "")
  for (const m of src.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
    if (!decl.has(m[1])) decl.set(m[1], { value: m[2].trim(), file: path.basename(file) })
  }
}
const isPrimitive = (name) => name.startsWith("--ds-")
// Tailwind and the shadcn base provide these; they are not RM tokens.
const external = (name) => /^--(tw-|font-sans|font-mono|font-heading|default-)/.test(name)
const literal = /(#[0-9a-fA-F]{3,8}\b)|(\b\d*\.?\d+(px|rem|em|ms|s|deg)\b)|(^\s*-?\d*\.?\d+\s*$)/

function resolve(name, seen = []) {
  if (seen.includes(name)) return { ok: false, why: `cycle ${[...seen, name].join(" -> ")}` }
  const d = decl.get(name)
  if (!d) return external(name) ? { ok: true } : { ok: false, why: `undefined ${name}` }
  if (isPrimitive(name)) return { ok: true }
  for (const ref of d.value.matchAll(/var\((--[\w-]+)/g)) {
    const r = resolve(ref[1], [...seen, name])
    if (!r.ok) return r
  }
  return { ok: true }
}

for (const [name, d] of decl) {
  if (isPrimitive(name)) continue
  const noVars = d.value.replace(/var\(--[\w-]+(,[^)]*)?\)/g, "")
  // calc multipliers and 0/1 flags are structure, not design values.
  const stripped = noVars.replace(/calc\([^)]*\)/g, "").replace(/\b(oklab|srgb|transparent|currentColor|in|inherit|none|auto|solid|0|1|100%)\b/g, "")
  if (!name.startsWith("--color-") && literal.test(stripped) && !/font|family|--radius$|--spacing$|--text-|--breakpoint|--animate|--ease|--shadow|--blur|--tracking|--leading|--font-weight|--container|--perspective|--aspect|--inset-shadow|--drop-shadow|--default|--sidebar/.test(name)) {
    problems.push(`css   ${d.file} ${name}: raw literal in "${d.value}"`)
  }
  const r = resolve(name)
  if (!r.ok) problems.push(`css   ${d.file} ${name}: ${r.why}`)
}

// ---- 2. Component classes ----
const rawColour = /\b(bg|text|border|ring|fill|stroke|from|to|via|outline|divide|shadow|decoration|accent|caret)-(white|black|transparent-|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?\b/
const checks = [
  [/#[0-9a-fA-F]{3,8}\b/, "raw hex"],
  [/\brgba?\(/, "raw rgb()"],
  [/\[(?:-?\d*\.?\d+)(?:px|rem|em|vh|vw|%)?\]/, "arbitrary number"],
  [/\[(?:-?\d*\.?\d+)(?:px|rem|em)\]/, "arbitrary px/rem"],
  // Zero is structural (p-0, min-w-0). Anything else must come from a token, not the numeric scale.
  [/(?<![\w-])(?:p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y|size|h|w|min-h|min-w|max-h|max-w|top|bottom|left|right|inset|translate-x|translate-y|-translate-x|-translate-y)-(?:[1-9]\d*(?:\.\d+)?|0\.\d+|px)(?![\w-])/, "default Tailwind spacing scale"],
  [rawColour, "default Tailwind palette colour"],
]
for (const name of KIT) {
  const file = path.join(UI, `${name}.tsx`)
  if (!fs.existsSync(file)) continue
  const lines = fs.readFileSync(file, "utf8").split("\n")
  lines.forEach((line, i) => {
    if (/^\s*(import|\/\/)/.test(line)) return
    // Only look inside string literals, where class names live.
    for (const str of line.matchAll(/"([^"]*)"|`([^`]*)`/g)) {
      const text = str[1] ?? str[2]
      for (const [re, label] of checks) {
        // opacity-[0.9999] keeps the drawer painted through its ending transition; it is not a design value.
        const hit = text.replace(/opacity-\[0\.9999\]/g, "").match(re)
        if (hit) problems.push(`class ${name}.tsx:${i + 1} ${label}: ${hit[0]}`)
      }
    }
  })
}

if (problems.length) {
  console.log(problems.join("\n"))
  console.log(`\n${problems.length} problem(s)`)
  process.exit(1)
}
console.log(`Token audit clean: ${decl.size} CSS properties, ${KIT.length} components checked.`)
