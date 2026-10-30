# RM kit golden rules

Rules learned while building the kit. They are short on purpose: each one says what to do, why (the mistake it came from) and how to check it.

| File | What it covers |
|---|---|
| [01-build-rules.md](01-build-rules.md) | How a component is built: tokens, values, files, stories, verification. |
| [02-design-rules.md](02-design-rules.md) | How a component should look and behave: components, layout, composition. |
| [03-card-catalog.md](03-card-catalog.md) | Which card archetype a requirement needs, its props and shared states. Read before any card. |

Enforce rule B3 with the checker:

```bash
node scripts/check-rm-rules.mjs                 # every hand-written story and rm-style/ui file
node scripts/check-rm-rules.mjs path/to/file    # specific files
```

It exits 1 when it finds a raw value, a primitive reference or a variable that is not in `semantic.css`. A line carrying `rules-allow` is skipped (use it only for Storybook preview window sizes).

Adding a rule: write it as Rule / Why / Check, number it next in its file, and say which component taught it.
