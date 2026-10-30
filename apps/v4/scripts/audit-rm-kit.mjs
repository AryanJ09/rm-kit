import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { auditTokenData, KIT } from "./audit-core.mjs"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const files = fs.readdirSync(path.join(root, "stories"), { recursive: true })
  .filter((file) => /\.stories\.tsx?$/.test(file))
  .map((file) => path.join("stories", file))
  .filter((file) => /title:\s*["']RM Kit\//.test(fs.readFileSync(path.join(root, file), "utf8")))
const stories = files.map((file) => ({
  name: file.replace(/^stories\//, "").replace(/\.stories\.tsx?$/, ""),
  file,
  text: fs.readFileSync(path.join(root, file), "utf8"),
}))
const css = Object.fromEntries(["primitives.css", "semantic.css"].map((file) => [
  `tokens/${file}`,
  fs.readFileSync(path.join(root, "rm-style/tokens", file), "utf8"),
]))
const ui = KIT.flatMap((name) => {
  const file = `rm-style/ui/${name}.tsx`
  return fs.existsSync(path.join(root, file)) ? [{ name, file, text: fs.readFileSync(path.join(root, file), "utf8") }] : []
})
const result = auditTokenData({ css, components: [...ui, ...stories] })
const problems = result.problems
if (problems.length) {
  console.log(problems.join("\n"))
  console.log(`\n${problems.length} problem(s); ${ui.length} RM Kit implementations, ${stories.length} RM Kit stories checked`)
  process.exit(1)
}
console.log(`RM Kit token audit clean: ${ui.length} implementations, ${stories.length} stories, ${result.properties} CSS properties checked.`)
