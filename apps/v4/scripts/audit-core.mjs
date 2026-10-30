// Chain: .tsx -> semantic.css -> primitives.css. No component-token layer: every token a .tsx uses must be declared in semantic.css.
// FAIL on SEMANTIC_ONLY files; every other rm-style/ui file with direct --ds-* is only a WARNING.
const SEMANTIC_ONLY = ["accordion", "badge", "bottom-navigation", "button", "checkbox", "date-picker", "dropdown", "field", "input", "input-otp", "questionnaire", "radio-group", "search", "slider", "textarea", "toggle", "toggle-group", "alert-dialog", "breadcrumb", "bottom-navigation-central-button", "calendar", "chart", "dialog", "drawer", "empty", "filter", "filter-group", "label", "message", "message-scroller", "navigation-item", "progress", "sheet", "spinner", "stacked-bar-chart", "switch"]
const KIT = ["button", "badge", "checkbox", "radio-group", "switch", "input", "textarea", "search", "dropdown", "date-picker", "calendar", "navigation-item", "bottom-navigation", "bottom-navigation-central-button", "alert-dialog", "dialog", "drawer", "message", "message-scroller", "sheet", "spinner", "label", "accordion", "toggle", "toggle-group", "breadcrumb", "chart", "empty", "field", "input-otp", "progress", "questionnaire", "slider", "filter", "filter-group", "stacked-bar-chart"]
const rawColour = /\b(bg|text|border|ring|fill|stroke|from|to|via|outline|divide|shadow|decoration|accent|caret)-(white|black|transparent-|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?\b/
const checks = [[/#(?:[0-9a-fA-F]{3,8})\b/, "raw hex"], [/\brgba?\(/, "raw rgb()"], [/\[(?:-?\d*\.?\d+)(?:px|rem|em|vh|vw|ch|%)?\]/, "arbitrary number"], [/\d(?:\.\d+)?(?:px|rem|ch|vh|vw)\b/, "raw length"], [/(?<![\w-])ring-[1-9]\d*(?![\w.-])/, "hard-coded ring width"], [/(?<![\w-])(?:opacity-(?!0(?![\d.])|100(?![\d.]))\d+|(?:bg|text|border|ring|fill|stroke|outline|shadow|from|to|via|divide|accent|caret|decoration)-[\w-]+\/\d+(?![\w.-]))/, "hard-coded opacity"], [/(?<![\w-])(?:p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y|size|h|w|min-h|min-w|max-h|max-w|top|bottom|left|right|inset|translate-x|translate-y|-translate-x|-translate-y)-(?:[1-9]\d*(?:\.\d+)?|0\.\d+|px)(?![\w/-])/, "default Tailwind spacing scale"], [rawColour, "default Tailwind palette colour"]]
// Custom properties that come from Tailwind or the headless primitives, not from our token files.
const external = (name) => /^--(tw-|color-|chart-$|drawer-|nested-drawers$|spacing$|radix-|base-ui-|available-|anchor-|transform-origin$|font-sans$|font-mono$|font-heading$|default-|accordion-panel-height$|accordion-panel-width$|rdp-)/.test(name)
const strip = (text) => text.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ""))
const primitive = (name) => name.startsWith("--ds-")

export function auditTokenData({ css, components }) {
  const problems = []
  const warnings = []
  const decl = new Map()
  const seen = new Map()
  for (const [file, text] of Object.entries(css)) {
    strip(text).split("\n").forEach((line, index) => {
      const match = line.match(/^\s*(--[\w-]+)\s*:\s*([^;{}]*)(;|$)/)
      if (!match) return
      if (seen.has(match[1])) problems.push(`css ${file}:${index + 1} duplicate token name ${match[1]} (first in ${seen.get(match[1])})`)
      else seen.set(match[1], `${file}:${index + 1}`)
    })
    for (const match of strip(text).matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) if (!decl.has(match[1])) decl.set(match[1], { value: match[2].trim(), file })
  }
  const resolve = (name, trail = []) => {
    if (trail.includes(name)) return { ok: false, why: `cycle ${[...trail, name].join(" -> ")}` }
    const item = decl.get(name)
    if (!item) return external(name) ? { ok: true } : { ok: false, why: `undefined ${name}` }
    if (primitive(name)) return { ok: true }
    const refs = [...item.value.matchAll(/var\(\s*(--[\w-]+)/g)]
    if (!refs.length) return { ok: false, why: `no primitive reference in "${item.value}"` }
    for (const ref of refs) { const result = resolve(ref[1], [...trail, name]); if (!result.ok) return result }
    return { ok: true }
  }
  const literal = /(#[0-9a-fA-F]{3,8}\b)|(\b\d*\.?\d+(px|rem|em|ms|s|deg)\b)|(^\s*-?\d*\.?\d+\s*$)/
  for (const [name, item] of decl) {
    if (primitive(name)) continue
    const value = item.value.replace(/var\(--[\w-]+(,[^)]*)?\)/g, "").replace(/calc\([^)]*\)/g, "").replace(/\b(oklab|srgb|transparent|currentColor|in|inherit|none|auto|solid|0|1|100%)\b/g, "")
    if (!name.startsWith("--color-") && literal.test(value) && !/font|family|--radius$|--spacing$|--text-|--breakpoint|--animate|--ease|--shadow|--blur|--tracking|--leading|--font-weight|--container|--perspective|--aspect|--inset-shadow|--drop-shadow|--default|--sidebar/.test(name)) problems.push(`css ${item.file} ${name}: raw literal in "${item.value}"`)
    const result = resolve(name); if (!result.ok) problems.push(`css ${item.file} ${name}: ${result.why}`)
  }
  const roles = [...decl].filter(([name]) => !primitive(name)).map(([name, item]) => ({ name, value: item.value, file: item.file, primitive: [...item.value.matchAll(/var\(\s*(--ds-[\w-]+)/g)].map((match) => match[1]) }))
  for (const [file, text] of Object.entries(css)) strip(text).split("\n").forEach((line, index) => { if (/^\s*--[\w-]+\s*:/.test(line) && !/[;(,]\s*$/.test(line)) problems.push(`css ${file}:${index + 1} declaration missing semicolon`) })
  // Utility names that used to be theme.css aliases of component tokens (bg-toggle-muted, text-field-input-foreground...).
  const retired = /(?:^|[:!-])(?:bg|text|border|ring|fill|stroke|outline|shadow|size|h|w|min-h|min-w|max-h|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap|rounded|leading|tracking|font|opacity|duration|transition)-(?:(?:toggle|questionnaire|badge|accordion|dropdown|filter|tabs|card|button)-[\w-]+|field-(?:input|disabled|readonly-background|focus-ring|primary|destructive|ring|background|foreground|muted-foreground|border|set|group|nested|title|content|description|separator|error-list|choice|control|legend|font|radius|padding|height)[\w-]*)(?![\w-])/
  const componentAlias = (cls) => retired.test(cls.split(":").at(-1).replace(/^[!-]+/, "").replace(/\([^)]*\)|\[[^\]]*\]/g, ""))
  const componentsUsingTokens = components.map(({ name, file, text }) => {
    const strict = SEMANTIC_ONLY.includes(name)
    const report = (message, soft) => (strict && !soft ? problems : warnings).push(message)
    const local = new Set([...text.matchAll(/\[(--[\w-]+):/g)].map((match) => match[1]).concat([...text.matchAll(/["'](--[\w-]+)["']\s*:/g)].map((match) => match[1])))
    for (const [index, line] of text.split("\n").entries()) {
      if (/^\s*(import|\/\/)/.test(line)) continue
      for (const string of line.matchAll(/"([^"]*)"|`([^`]*)`/g)) {
        const body = (string[1] ?? string[2]).replace(/opacity-\[0\.9999\]/g, "")
        if (strict) for (const [re, label] of checks) { const hit = body.match(re); if (hit) problems.push(`class ${name}.tsx:${index + 1} ${label}: ${hit[0]}`) }
        else for (const [re, label] of checks) { const hit = body.match(re); if (hit && label !== "default Tailwind spacing scale" && label !== "arbitrary number" && label !== "raw length" && label !== "hard-coded opacity" && label !== "hard-coded ring width") warnings.push(`class ${name}.tsx:${index + 1} ${label}: ${hit[0]}`) }
        if (strict) for (const cls of body.split(/\s+/)) { if (cls && componentAlias(cls)) problems.push(`class ${name}.tsx:${index + 1} component-token utility: ${cls}`) }
      }
    }
    const tokens = [...text.matchAll(/--[\w-]+/g)].map((match) => ({ token: match[0], line: text.slice(0, match.index).split("\n").length }))
    const reported = new Set()
    for (const { token, line } of tokens) {
      if (/^--ds-/.test(token)) { report(`component ${name}.tsx:${line} primitive reference: ${token}`); continue }
      if (!strict || reported.has(token) || local.has(token) || external(token)) continue
      reported.add(token)
      if (!decl.has(token)) problems.push(`component ${name}.tsx:${line} undefined token (not in semantic.css): ${token}`)
      else if (!resolve(token).ok) problems.push(`component ${name}.tsx:${line} token does not resolve to a primitive: ${token}`)
    }
    const used = new Set(tokens.map(({ token }) => token).filter((token) => !primitive(token)))
    return { name, file, roles: [...used].sort() }
  })
  for (const component of components.filter(({ file }) => /stories\/(?:Button[^/]*|Input[^/]*)\.stories\.tsx$/.test(file) || /stories\/figma\/button\.tsx$/.test(file))) {
    for (const match of component.text.matchAll(/--ds-[\w-]+/g)) {
      const line = component.text.slice(0, match.index).split("\n").length
      warnings.push(`story ${component.file}:${line} primitive reference: ${match[0]}`)
    }
  }
  return { properties: decl.size, components: components.length, problems, warnings, roles, componentsUsingTokens }
}

export { KIT, SEMANTIC_ONLY }
