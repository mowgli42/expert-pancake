# AGENTS.md - guide for AI coding agents

## Project context

expert-pancake contains the EVMS training single-page app under `evms-training/`.
Work from that subdirectory for frontend changes.

## Local setup

Run from the repository root:

```bash
(cd evms-training && npm ci && npx playwright install chromium)
```

## Smoke test

```bash
(cd evms-training && npm run build)
```

## Agent notes

- Use Node 20.19+ or Node 22+; Vite 7 does not support Node 18.
- Keep generated build artifacts out of commits unless the repo already tracks them.
- Preserve existing local user changes; stage only files you intentionally modify.
