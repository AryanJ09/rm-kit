# rm-kit

Design system: shadcn components wrapped with the RM style (tokens in `apps/v4/rm-style`).

## Run Storybook

Requirements: Node 22 and pnpm 10.33.

```bash
pnpm install
pnpm --filter=v4 storybook
```

Open http://localhost:6006.

## Where things are

- `apps/v4/rm-style/theme.css`: primitives and semantic roles. The single entry point.
- `apps/v4/rm-style/components.css`: tokens used by one component.
- `apps/v4/rm-style/ui/`: component wrappers.
- `apps/v4/stories/`: Storybook stories.
- `apps/v4/rm-style/OWNER-GUIDE.md`: how to change values and add components.
