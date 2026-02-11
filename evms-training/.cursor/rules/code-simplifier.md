---
description: Apply when refining code for clarity and maintainability
globs: ["**/*.js", "**/*.svelte", "**/*.svelte.js"]
---

# Code Simplifier

Refine code for clarity, consistency, and maintainability while preserving functionality.

## Principles

1. **Preserve functionality**—never change behavior, only structure.

2. **Follow CLAUDE.md** (project standards in repo root).

3. **Enhance clarity**:
   - Reduce nesting and unnecessary complexity
   - Eliminate redundant code
   - Use clear names
   - Consolidate related logic
   - Avoid nested ternaries—use `if/else` or `switch`
   - Prefer explicit over compact

4. **Maintain balance**—avoid over-simplification that hurts readability.

5. **Scope**—focus on recently modified code unless asked otherwise.

## Project-specific

- Svelte 5: runes in `.svelte` / `.svelte.js` only
- Prefer `function` over arrow for named/top-level
- ES modules with `.js` extensions in imports
