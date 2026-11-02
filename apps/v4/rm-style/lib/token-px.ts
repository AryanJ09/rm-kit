import * as React from "react"

/**
 * Resolves semantic size roles to pixels. The chart library needs numbers for its geometry, so they are read from the tokens
 * (measured through a probe element) instead of being typed in. Server render gives 0 until the client measures.
 */
function measureTokens<T extends Record<string, string>>(roles: T): Record<keyof T, number> {
  const out = {} as Record<keyof T, number>
  for (const key of Object.keys(roles) as (keyof T)[]) {
    if (typeof document === "undefined") {
      out[key] = 0
      continue
    }
    const probe = document.createElement("div")
    probe.style.cssText = `position:absolute;visibility:hidden;width:var(${roles[key]})`
    document.body.appendChild(probe)
    out[key] = probe.getBoundingClientRect().width
    probe.remove()
  }
  return out
}

export function useTokenPx<T extends Record<string, string>>(roles: T): Record<keyof T, number> {
  const [px, setPx] = React.useState(() => measureTokens(roles))
  React.useLayoutEffect(() => setPx(measureTokens(roles)), []) // eslint-disable-line react-hooks/exhaustive-deps
  return px
}

