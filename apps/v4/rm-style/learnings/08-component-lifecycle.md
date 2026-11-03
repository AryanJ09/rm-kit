# Component lifecycle: from a designer's prototype to a released component

Design for a skill that builds components when the requirement comes from the prototype, not from a person. It follows the rules
this project learned: look at what exists first, extend before adding, forecast reuse before componentising, one token path,
show it in Storybook, end with a hand-off. Status: designed, not built.

## Stages
| # | Stage | What happens | Output | Who |
|---|---|---|---|---|
| 0 | Intake | Turn the prototype into a list of every distinct UI unit: states, values, screens it appears on. | `inventory.json` | script, then AI |
| 1 | Match | Compare each unit with the kit's components, props, variants and stories. Verdict: reuse as is, reuse by composition (a pattern), extend a prop, new component, one-off. | verdict per unit | script lists candidates, AI decides |
| 2 | Eligibility | Forecast reuse. A unit becomes a component only if it recurs (or is a foreseeable archetype), is generic (no domain data) and cannot be composed from existing parts. Otherwise it is a pattern in `stories/`. | decision record with reasons | AI proposes, **owner approves** |
| 3 | Token path | Map every value to an existing semantic role. No role fits: file a gap report. Never rename or invent a role silently; `semantic.css` is the contract. | `token-map`, `gaps.md` | script checks, **owner decides gaps** |
| 4 | Build | Extend props, not variants. Reuse first. Relative imports only, nothing outside `rm-style/` except npm packages. No raw values. | code | AI |
| 5 | Stories | Playground with controls, every state, use cases; the screen as a pattern with example data (never in `rm-style/`). One RM Kit category. | stories | AI |
| 6 | Gates | Token audit, rules checker, `tsc`, production build, render every story, no duplicate titles, import boundary, regenerate `token-data.json`. | pass or fail | scripts only |
| 7 | Visual diff | Prototype screenshot against story screenshot. | list of differences | AI with the browser |
| 8 | Release hand-off | What changed, decisions, open gaps, check results, revert point. | `07-handoff`-style note, commit | AI |

Owner is asked at three points only: eligibility (2), token gaps (3), and before commit or push.

## How to run it
- **A. One agent, sequential.** Simple, but it grades its own work. Our own mistakes (hiding stories, proposing role renames, stale
  audit list, stale token data) were judgment slips a single agent repeats.
- **B. One agent plus scripts.** Scripts enforce everything checkable. Judgment is still one mind.
- **C. Several agents.** Independent review; analyst and librarian run in parallel. Costlier; parallel builders only on disjoint files.
- **Chosen: hybrid of B and C.** Scripts do all checking. One orchestrating agent owns stages 2 to 5 and 8. An analyst sub-agent
  (stage 0) runs in parallel with a librarian (kit manifest). An independent reviewer sees only the diff, the rules and the prototype
  after stage 6, so the author never signs off its own work.

## Gates tied to mistakes already made
| What went wrong | Gate |
|---|---|
| Stories hidden instead of fixed | render-every-story check, reviewer |
| Raw values, shadcn leftovers | audit reads the folder, not a hand-picked list |
| Role renames | stage 3 produces a gap report only |
| Stale generated data | `token-data.json` regenerated in stage 6 |
| Dev-only build break | production build |

## To build
1. Kit manifest script: components, props, variants, stories as JSON (stage 1 depends on it).
2. Prototype inventory extractor (hardest: the prototype is minified; a DOM or screenshot walk may beat reading the bundle). Needs
   the owner's call on the input format: Figma, HTML or screenshots.
3. Templates: decision record, gap report, hand-off note.
4. `SKILL.md`: the rules above as a checklist, scripts as references.
