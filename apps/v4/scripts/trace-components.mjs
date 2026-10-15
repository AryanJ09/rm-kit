// Trace every rm-style/ui component: class -> utility token -> semantic -> primitive -> value.
// Run from apps/v4:  node scripts/trace-components.mjs [name ...]
// Writes rm-style/trace/<name>.md, rm-style/trace/trace.csv and rm-style/trace/README.md.
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const UI = path.join(ROOT, "rm-style/ui")
const OUT = path.join(ROOT, "rm-style/trace")
// Later files win, same as CSS load order (theme.css after globals.css).
const SOURCES = ["app/globals.css", "rm-style/theme.css"]
const NOVA = "registry/styles/style-nova.css"

// ---- 1. Collect every --var declaration from @theme inline and :root blocks ----
const vars = {} // name -> { value, file }
for (const file of SOURCES) {
  const css = fs.readFileSync(path.join(ROOT, file), "utf8")
  for (const block of css.matchAll(/(@theme inline|:root)\s*\{([^}]*)\}/g)) {
    for (const [, name, value] of block[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      vars[name] = { value: value.trim(), file }
    }
  }
}

// Follow var() references until a literal value. Returns [{ name, value, file }, ...].
function chain(name, seen = new Set()) {
  const hops = []
  while (name && vars[name] && !seen.has(name)) {
    seen.add(name)
    const { value, file } = vars[name]
    hops.push({ name, value, file })
    const next = value.match(/^var\((--[\w-]+)\)$/)
    name = next?.[1]
  }
  return hops
}

// ---- 2. Classify one Tailwind class ----
const COLOR_PREFIXES = [
  "ring-offset", "inset-ring", "border-x", "border-y", "border-t", "border-r", "border-b", "border-l",
  "border-s", "border-e", "bg", "text", "border", "ring", "outline", "fill", "stroke", "divide",
  "placeholder", "accent", "caret", "decoration", "shadow", "from", "via", "to",
]
const TEXT_SIZES = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]
const WEIGHTS = ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"]
const SPACING = /^-?(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|h|w|size|min-h|min-w|max-h|max-w|space-x|space-y|top|left|right|bottom|inset|inset-x|inset-y|translate-x|translate-y|scroll-m|scroll-p)-(\d+(?:\.\d+)?)$/

// Split "hover:data-[x=y]:bg-primary/50" -> base "bg-primary", ignoring ":" inside [].
function baseOf(cls) {
  let depth = 0, last = 0
  for (let i = 0; i < cls.length; i++) {
    if (cls[i] === "[") depth++
    else if (cls[i] === "]") depth--
    else if (cls[i] === ":" && depth === 0) last = i + 1
  }
  let base = cls.slice(last).replace(/^!/, "")
  const slash = base.lastIndexOf("/")
  if (slash > 0 && !base.slice(slash).includes("]")) base = base.slice(0, slash)
  return base
}

function classify(cls) {
  const base = baseOf(cls)
  if (base.includes("[")) return { kind: "hardcoded", token: base }

  const sp = base.match(SPACING)
  if (sp) return { kind: "spacing", token: "--spacing", note: `${sp[2]} x --spacing` }

  let m = base.match(/^rounded(?:-(?:t|r|b|l|s|e|tl|tr|br|bl|ss|se|es|ee))?(?:-(.+))?$/)
  if (m) return m[1] === "full" || m[1] === "none"
    ? { kind: "radius", tailwind: m[1] }
    : { kind: "radius", token: m[1] ? `--radius-${m[1]}` : "--radius" }

  m = base.match(/^text-(.+)$/)
  if (m && TEXT_SIZES.includes(m[1])) return { kind: "font-size", token: `--text-${m[1]}` }

  m = base.match(/^font-(.+)$/)
  if (m && WEIGHTS.includes(m[1])) return { kind: "font-weight", token: `--font-weight-${m[1]}` }
  if (m && ["sans", "mono", "heading", "serif"].includes(m[1])) return { kind: "font-family", token: `--font-${m[1]}` }

  for (const p of COLOR_PREFIXES) {
    if (base.startsWith(p + "-")) {
      const rest = base.slice(p.length + 1)
      if (vars[`--color-${rest}`]) return { kind: "color", token: `--color-${rest}` }
      if (/^(white|black|transparent|current|inherit|[a-z]+-\d{2,3})$/.test(rest)) return { kind: "color", tailwind: rest }
    }
  }
  return null // layout/behaviour classes (flex, items-center, transition...) are not tokens
}

// ---- 3. Resolve a classified class into the 5-hop row ----
function resolve(c) {
  if (!c.token) return { utility: "", semantic: "", primitive: "", value: c.kind === "hardcoded" ? c.token : `Tailwind default (${c.tailwind})`, file: c.kind === "hardcoded" ? "component file" : "node_modules/tailwindcss/theme.css", gap: true }
  const hops = chain(c.token)
  if (!hops.length) return { utility: c.token, semantic: "", primitive: "", value: `Tailwind default${c.note ? ` (${c.note})` : ""}`, file: "node_modules/tailwindcss/theme.css", gap: true }
  const last = hops[hops.length - 1]
  const semantic = hops.find((h) => h !== hops[0] && !h.name.startsWith("--ds-"))
  const primitive = hops.find((h) => h.name.startsWith("--ds-"))
  return {
    utility: hops[0].name,
    semantic: semantic?.name ?? "",
    primitive: primitive?.name ?? "",
    value: c.note ? `${c.note} = ${last.value}` : last.value,
    file: [...new Set(hops.map((h) => h.file))].join(" -> "),
    gap: !primitive, // never reaches an RM --ds-* primitive
  }
}

// ---- 4. Read each component ----
const novaCss = fs.existsSync(path.join(ROOT, NOVA)) ? fs.readFileSync(path.join(ROOT, NOVA), "utf8") : ""
function novaApply(cnClass) {
  const m = novaCss.match(new RegExp(`\\.${cnClass}\\s*\\{\\s*@apply ([^;]+);`))
  return m ? m[1].split(/\s+/) : []
}

function trace(name) {
  const src = fs.readFileSync(path.join(UI, `${name}.tsx`), "utf8")
  const deps = [...src.matchAll(/from "(@\/rm-style\/ui\/[\w-]+|@base-ui[^"]*|@radix-ui[^"]*|radix-ui|[\w-]+)"/g)].map((m) => m[1])
  const strings = [...src.matchAll(/"([^"\n]*)"|`([^`$]*)`/g)].map((m) => m[1] ?? m[2])
  const classes = new Map() // class -> source
  for (const s of strings) for (const cls of s.split(/\s+/).filter(Boolean)) {
    if (cls.startsWith("cn-")) novaApply(cls).forEach((c) => classes.set(c, `${NOVA} .${cls}`))
    else if (!classes.has(cls)) classes.set(cls, `rm-style/ui/${name}.tsx`)
  }
  const rows = []
  for (const [cls, from] of classes) {
    const c = classify(cls)
    if (c) rows.push({ cls, kind: c.kind, from, ...resolve(c) })
  }
  rows.sort((a, b) => a.kind.localeCompare(b.kind) || a.cls.localeCompare(b.cls))
  return { name, deps: [...new Set(deps)], rows }
}

// ---- 5. Write output ----
const wanted = process.argv.slice(2)
const names = fs.readdirSync(UI).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4))
  .filter((n) => !wanted.length || wanted.includes(n))
fs.mkdirSync(OUT, { recursive: true })

const csv = [["component", "figma_layer", "figma_variable", "class", "kind", "utility_token", "semantic", "primitive", "value", "defined_in", "class_from", "gap"].join(",")]
const index = []
const esc = (v) => `"${String(v).replace(/"/g, '""')}"`

for (const n of names) {
  const t = trace(n)
  const gaps = t.rows.filter((r) => r.gap).length
  index.push(`| [${n}](${n}.md) | ${t.rows.length} | ${gaps} | ${t.deps.filter((d) => d.startsWith("@/")).map((d) => d.split("/").pop()).join(", ")} |`)
  const md = [
    `# ${n}`, "",
    `Component file: \`rm-style/ui/${n}.tsx\``, "",
    `Imports: ${t.deps.map((d) => `\`${d}\``).join(", ") || "none"}`, "",
    `Gaps (value not coming from an RM \`--ds-*\` primitive): **${gaps}** of ${t.rows.length}`, "",
    "| class | kind | utility token | semantic | primitive | value | defined in | gap |",
    "|---|---|---|---|---|---|---|---|",
    ...t.rows.map((r) => `| \`${r.cls}\` | ${r.kind} | ${r.utility} | ${r.semantic} | ${r.primitive} | ${r.value} | ${r.file} | ${r.gap ? "yes" : ""} |`),
    "",
  ].join("\n")
  fs.writeFileSync(path.join(OUT, `${n}.md`), md)
  for (const r of t.rows) csv.push([n, "", "", r.cls, r.kind, r.utility, r.semantic, r.primitive, r.value, r.file, r.from, r.gap ? "yes" : ""].map(esc).join(","))
}

fs.writeFileSync(path.join(OUT, "trace.csv"), csv.join("\n") + "\n")
if (!wanted.length) fs.writeFileSync(path.join(OUT, "README.md"), [
  "# Component token trace", "",
  "Generated by `node scripts/trace-components.mjs`. Rerun after any change to theme.css, globals.css or rm-style/ui.", "",
  "Chain: class -> utility token (@theme inline) -> semantic (:root) -> primitive (--ds-*) -> value.",
  "A row is a **gap** when its value does not end in an RM `--ds-*` primitive (Tailwind default, shadcn default, or hardcoded).", "",
  "| component | token classes | gaps | uses rm-style/ui |", "|---|---|---|---|", ...index, "",
].join("\n"))
console.log(`Traced ${names.length} component(s) -> ${path.relative(ROOT, OUT)}/`)
