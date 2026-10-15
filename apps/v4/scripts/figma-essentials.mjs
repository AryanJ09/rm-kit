// Reduce a raw Figma component export to the parts needed to build it.
// Run from apps/v4:  node scripts/figma-essentials.mjs <raw.json> [out.json]
// Keeps: variant properties, size, radius, fills, strokes, effects, auto-layout, text style.
// Drops: ids, positions, visibility flags, layout-alignment plumbing, default text settings.
import fs from "node:fs"

const hex = (c) => (c ? c.toUpperCase() : c)

// A paint/stroke/effect only matters if it is visible and not fully transparent.
const paints = (list = []) =>
  list
    .filter((p) => p.visible !== false && (p.opacity ?? 1) > 0)
    .map((p) => ({ type: p.type, color: hex(p.color), opacity: p.opacity ?? 1 }))

const stroke = (list = [], weight = 0) => {
  const s = paints(list)
  return s.length && weight > 0 ? { weight, paints: s } : null
}

const effects = (list = []) =>
  list
    .filter((e) => e.visible !== false)
    .map((e) => ({ type: e.type, color: hex(e.color), alpha: e.alpha, offset: e.offset, radius: e.radius, spread: e.spread ?? 0 }))

// Keep only the padding/gap that is non-zero, so the spec shows what's actually set.
function layout(a) {
  if (!a) return null
  const out = { direction: a.layoutMode, gap: a.itemSpacing ?? 0 }
  const pad = { top: a.paddingTop, right: a.paddingRight, bottom: a.paddingBottom, left: a.paddingLeft }
  if (Object.values(pad).some((v) => v)) out.padding = pad
  if (a.primaryAxisAlignItems !== "MIN") out.mainAlign = a.primaryAxisAlignItems
  if (a.counterAxisAlignItems !== "MIN") out.crossAlign = a.counterAxisAlignItems
  return out
}

function text(t) {
  if (!t) return null
  return {
    characters: t.characters,
    family: t.fontName?.family,
    style: t.fontName?.style,
    weight: t.fontWeight,
    size: t.fontSize,
    lineHeight: t.lineHeight?.unit === "AUTO" ? "auto" : t.lineHeight,
    letterSpacingPercent: t.letterSpacing?.value ?? 0,
  }
}

// Classify a child by its Figma layer name: the three roles seen in this file.
function node(n) {
  const out = { role: roleOf(n), type: n.type }
  if (n.size) out.size = { w: n.size.width, h: n.size.height }
  if (n.cornerRadius !== undefined && n.cornerRadius !== 0) out.radius = n.cornerRadius
  const f = paints(n.fills)
  if (f.length) out.fills = f
  const s = stroke(n.strokes, n.strokeWeight)
  if (s) out.stroke = s
  const e = effects(n.effects)
  if (e.length) out.effects = e
  const l = layout(n.autoLayout)
  if (l) out.layout = l
  const t = text(n.text)
  if (t) out.text = t
  if (n.children) out.children = n.children.map(node)
  return out
}

function roleOf(n) {
  const name = n.name ?? ""
  if (/^label$/i.test(name)) return "label"
  if (/loading indicator/i.test(name)) return "loadingIndicator"
  if (/workflow action/i.test(name)) return "container"
  return name.toLowerCase().replace(/\s+/g, "-")
}

// "Type=Primary, State=Default" -> { Type: "Primary", State: "Default" }
const parseVariant = (name) =>
  Object.fromEntries(name.split(",").map((p) => p.trim().split("=")).filter((kv) => kv.length === 2))

export function essentials(raw) {
  const variants = (raw.children ?? []).map((v) => {
    const kids = v.children ?? []
    return {
      variant: parseVariant(v.name),
      size: { w: v.size.width, h: v.size.height },
      // A variant with no children has no visual content in Figma: report it instead of hiding it.
      status: kids.length ? "ok" : "empty-in-figma",
      tree: kids.map(node),
    }
  })
  return {
    name: raw.name,
    size: { w: raw.size.width, h: raw.size.height },
    radius: raw.cornerRadius,
    properties: Object.fromEntries(
      Object.entries(raw.propertyDefinitions ?? {}).map(([k, d]) => [k, d.variantOptions]),
    ),
    variants,
  }
}

// ---- entry point + self-check ----
const [input, output] = process.argv.slice(2).filter((a) => !a.startsWith("--"))
if (input) {
  const spec = essentials(JSON.parse(fs.readFileSync(input, "utf8")))
  const json = JSON.stringify(spec, null, 2) + "\n"
  if (output) fs.writeFileSync(output, json)
  else process.stdout.write(json)
  const empty = spec.variants.filter((v) => v.status !== "ok").map((v) => Object.values(v.variant).join("/"))
  if (empty.length) console.error(`Variants with no Figma content: ${empty.join(", ")}`)
}

// Self-check: runs only when called with --selftest. Fails loudly if the filter drops what matters.
if (process.argv.includes("--selftest")) {
  const sample = {
    name: "Button", size: { width: 10, height: 10 }, cornerRadius: 5,
    propertyDefinitions: { Type: { variantOptions: ["Primary"] } },
    children: [
      { name: "Type=Primary", size: { width: 300, height: 48 }, children: [{
        name: "Workflow action", type: "FRAME", size: { width: 300, height: 48 }, cornerRadius: 1000,
        fills: [{ type: "SOLID", visible: true, opacity: 1, color: "#3857ff" }],
        strokes: [{ type: "SOLID", visible: true, opacity: 0, color: "#fff" }], strokeWeight: 0,
        autoLayout: { layoutMode: "HORIZONTAL", itemSpacing: 8, paddingLeft: 16, paddingRight: 16, primaryAxisAlignItems: "CENTER", counterAxisAlignItems: "CENTER" },
        children: [{ name: "Label", type: "TEXT", text: { characters: "Apply", fontSize: 14, fontWeight: 500, fontName: { family: "Inter", style: "Medium" } }, fills: [{ type: "SOLID", visible: true, opacity: 1, color: "#fff" }] }],
      }] },
      { name: "Type=Secondary", size: { width: 300, height: 48 } },
    ],
  }
  const s = essentials(sample)
  const first = s.variants[0].tree[0]
  console.assert(s.variants[0].variant.Type === "Primary", "variant parsed")
  console.assert(first.fills[0].color === "#3857FF", "fill kept, upper-cased")
  console.assert(first.stroke === undefined, "transparent stroke dropped")
  console.assert(first.layout.padding.left === 16 && first.layout.padding.top === undefined, "only non-zero padding kept")
  console.assert(first.children[0].text.family === "Inter" && first.children[0].role === "label", "label role and text kept")
  console.assert(s.variants[1].status === "empty-in-figma", "empty variant flagged, not dropped")
  console.log("figma-essentials selftest: done (check console for failed asserts)")
}
