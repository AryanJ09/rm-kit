"use client"

import * as React from "react"

// Tracks a CSS media query. Used by responsive patterns: sheet side, navigation style.
function useMediaQuery(query: string, fallback = false): boolean {
  const [matches, setMatches] = React.useState(fallback)
  React.useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener("change", update)
    return () => list.removeEventListener("change", update)
  }, [query])
  return matches
}

// Desktop breakpoint, the same as Tailwind md: (768px).
const DESKTOP_QUERY = "(min-width: 768px)"

function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_QUERY)
}

export { useMediaQuery, useIsDesktop, DESKTOP_QUERY }
