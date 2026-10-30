import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { auditTokenData, KIT } from "./audit-core.mjs"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const cssFiles = ["primitives.css", "semantic.css"]
const css = Object.fromEntries(
  cssFiles.map((file) => [
    `tokens/${file}`,
    fs.readFileSync(path.join(root, "rm-style/tokens", file), "utf8"),
  ])
)
const components = fs
  .readdirSync(path.join(root, "rm-style/ui"))
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => ({
    name: file.replace(/\.tsx$/, ""),
    file: `rm-style/ui/${file}`,
    text: fs.readFileSync(path.join(root, "rm-style/ui", file), "utf8"),
  }))
components.push(
  ...[
    "stories/ButtonPlayground.stories.tsx",
    "stories/Button.stories.tsx",
    "stories/Input.stories.tsx",
    "stories/figma/button.tsx",
  ]
    .filter((file) => fs.existsSync(path.join(root, file)))
    .map((file) => ({
      name: file.split("/").at(-1),
      file,
      text: fs.readFileSync(path.join(root, file), "utf8"),
    }))
)
const themeText = fs.readFileSync(path.join(root, "rm-style/theme.css"), "utf8")
const result = auditTokenData({ css, components })
themeText.split("\n").forEach((line, index) => {
  if (/var\(--ds-/.test(line) && !/^\s*(\/?\*|@import)/.test(line)) result.problems.push(`css theme.css:${index + 1} points to primitive: ${line.trim()}`)
})
if (process.argv.includes("--tokens")) result.problems = result.problems.filter((p) => p.startsWith("css "))
if (result.warnings.length) console.log(result.warnings.map((w) => `WARN ${w}`).join("\n") + `\n\n${result.warnings.length} warning(s)\n`)
if (result.problems.length) {
  console.log(result.problems.join("\n"))
  console.log(`\n${result.problems.length} problem(s)`)
  process.exit(1)
}
console.log(
  `Token audit clean: ${result.properties} CSS properties, ${components.length} components checked.`
)
