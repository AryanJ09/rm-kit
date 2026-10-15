import type { StorybookConfig } from '@storybook/nextjs-vite';

import { dirname } from "path"

import { fileURLToPath } from "url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-mcp')
  ],
  "framework": getAbsolutePath('@storybook/nextjs-vite'),
  "staticDirs": [
    "../public"
  ],
  // shadcn's demos import "@/styles/base-nova/ui/*" (a few use base-rhea). Point them at the RM wrappers so every
  // demo renders with rm-style, and a change to one component shows wherever it is used.
  viteFinal: async (config) => {
    const rmUi = fileURLToPath(new URL("../rm-style/ui/", import.meta.url))
    const alias = { find: /^@\/styles\/base-(?:nova|rhea)\/ui\/(.*)$/, replacement: `${rmUi}$1` }
    const existing = config.resolve?.alias ?? []
    config.resolve = {
      ...config.resolve,
      alias: Array.isArray(existing)
        ? [alias, ...existing]
        : [alias, ...Object.entries(existing).map(([find, replacement]) => ({ find, replacement }))],
    }
    return config
  },
};
export default config;