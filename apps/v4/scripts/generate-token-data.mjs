import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { auditTokenData, KIT } from "./audit-core.mjs"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const cssFiles = ["primitives.css", "semantic.css"]
const css = Object.fromEntries(cssFiles.map((file) => [file, fs.readFileSync(path.join(root, "rm-style/tokens", file), "utf8")]))
const components = KIT.flatMap((name) => {
  const file = `rm-style/ui/${name}.tsx`
  const fullPath = path.join(root, file)
  return fs.existsSync(fullPath) ? [{ name, file, text: fs.readFileSync(fullPath, "utf8") }] : []
})
const data = auditTokenData({ css, components })
fs.writeFileSync(path.join(root, "stories/Tokens/token-data.json"), JSON.stringify(data))
console.log(`Generated token data: ${data.properties} CSS properties, ${components.length} components.`)
