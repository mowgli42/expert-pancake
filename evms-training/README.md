# EVMS Training - Interactive Earned Value Management Learning

An interactive web application that trains users on **Earned Value Management System (EVMS)** through 10 incrementally challenging scenarios in a choose-your-own-adventure format.

## Design & Progress Tracking

- **OpenSpec**: Design specification in `../.openspec/evms-training-website.md`
- **Beads**: Progress tracking configuration in `../.beads/evms-training-progress.json`

## Features

- **10 Real-World Scenarios** (easy → complex):
  1. Building a Fence ($2.5K, 5 days)
  2. Kitchen Renovation ($35K, 6 weeks)
  3. Software Feature Sprint ($40K, 2 weeks)
  4. Marketing Campaign Launch ($150K, 8 weeks)
  5. Office Relocation ($500K, 12 weeks)
  6. Manufacturing Line Setup ($2M, 6 months)
  7. Hospital Wing Expansion ($15M, 18 months)
  8. Bridge Rehabilitation ($25M, 24 months)
  9. New Product Launch ($5M, 12 months)
  10. Lunar Mission Program ($500M, 36 months)

- **EVMS Metrics Tracked**: PV, EV, AC, BAC, EAC, ETC, SV, CV, SPI, CPI, VAC
- **Choose Your Own Adventure**: Decision points affect project outcomes and metrics
- **Progress Persistence**: Beads-style tracking with localStorage

## Tech Stack

- **Svelte 5** (runes)
- **Vite**
- **IxDF** design principles (accessibility, clarity, user-centered)

## Development

```bash
npm install
npm run dev
```

## Build (Self-Contained Static)

```bash
npm run build
```

Output in `dist/` — deploy to any static host.
