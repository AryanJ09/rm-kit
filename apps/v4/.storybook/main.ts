import { dirname } from "path"
import { fileURLToPath } from "url"
import type { StorybookConfig } from "@storybook/nextjs-vite"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mcp"),
  ],
  framework: getAbsolutePath("@storybook/nextjs-vite"),
  staticDirs: ["../public"],
  // shadcn's demos import "@/styles/base-nova/ui/*" (a few use base-rhea). Point them at the RM wrappers so every
  // demo renders with rm-style, and a change to one component shows wherever it is used.
  viteFinal: async (config) => {
    const tokenRoot = fileURLToPath(new URL("..", import.meta.url))
    process.env.STORYBOOK_TOKEN_ROOT = tokenRoot
    const rmUi = fileURLToPath(new URL("../rm-style/ui/", import.meta.url))
    // RM Card was removed; demos that still import a card get the shadcn base card.
    const baseCard = fileURLToPath(new URL("../registry/bases/base/ui/card", import.meta.url))
    const cardAlias = { find: /^@\/styles\/base-(?:nova|rhea)\/ui\/card$/, replacement: baseCard }
    // The sidebar lives in the application-shell folder; the shadcn demos still import it by the old name.
    const sidebarAlias = {
      find: /^@\/styles\/base-(?:nova|rhea)\/ui\/sidebar$/,
      replacement: `${rmUi}application-shell/sidebar`,
    }
    const alias = {
      find: /^@\/styles\/base-(?:nova|rhea)\/ui\/(.*)$/,
      replacement: `${rmUi}$1`,
    }
    const existing = config.resolve?.alias ?? []
    config.resolve = {
      ...config.resolve,
      alias: Array.isArray(existing)
        ? [cardAlias, sidebarAlias, alias, ...existing]
        : [
            cardAlias,
            sidebarAlias,
            alias,
            ...Object.entries(existing).map(([find, replacement]) => ({
              find,
              replacement,
            })),
          ],
    }
    return config
  },
}
export default config
