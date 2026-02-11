# EVMS Training - Code Standards

## General

- Prefer `function` keyword over arrow functions for named/top-level functions
- Choose clarity over brevity—explicit code over compact one-liners
- Avoid nested ternary operators; use `if/else` or `switch` for multiple conditions
- Remove comments that describe obvious code

## Modules

- Use ES modules with `import`/`export`
- Include `.js` extensions in imports
- Sort imports: external/vendor first, then internal (components, lib)

## Svelte

- Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- Runes require `.svelte` or `.svelte.js` files
- Extract complex template logic into derived values or helper functions

## Error Handling

- Prefer early returns over try/catch when feasible
- For localStorage/JSON: handle parse failures gracefully with fallbacks

## Naming

- `camelCase` for variables and functions
- `PascalCase` for components
- Constants: `UPPER_SNAKE` for module-level constants
