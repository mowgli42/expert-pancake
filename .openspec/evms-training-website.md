# OpenSpec: EVMS Interactive Training Website

## Overview
An interactive, self-contained web application that trains users on Earned Value Management System (EVMS) through 10 incrementally challenging scenarios in a choose-your-own-adventure format.

## Design Principles (IxDF Alignment)
- **User-Centered Design**: Progressive disclosure, clear feedback, minimal cognitive load
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Consistency**: Unified interaction patterns, predictable navigation, visual hierarchy
- **Learnability**: Scaffolded learning, immediate feedback, contextual help

## User Stories
1. As a learner, I want to see EVMS metrics update in real-time as I make decisions
2. As a learner, I want scenarios based on real-world projects I can relate to
3. As a learner, I want to understand the impact of my choices through visual feedback
4. As a learner, I want to track my progress across all 10 scenarios

## Scenarios Specification

### Scenario 1: Building a Fence (Difficulty: 1/10)
- **Context**: Residential backyard fence, 100 linear feet
- **BAC**: $2,500 | Duration: 5 days
- **Real-world basis**: DIY/home improvement projects (NAHB studies)

### Scenario 2: Kitchen Renovation (Difficulty: 2/10)
- **Context**: Full kitchen remodel, plumbing/electric/cabinetry
- **BAC**: $35,000 | Duration: 6 weeks
- **Real-world basis**: Home renovation industry benchmarks

### Scenario 3: Software Feature Sprint (Difficulty: 3/10)
- **Context**: Agile sprint delivering user authentication module
- **BAC**: $40,000 | Duration: 2 weeks
- **Real-world basis**: CHAOS Report, agile EVM adaptations

### Scenario 4: Marketing Campaign Launch (Difficulty: 4/10)
- **Context**: Multi-channel product launch campaign
- **BAC**: $150,000 | Duration: 8 weeks
- **Real-world basis**: PMI marketing project studies

### Scenario 5: Office Relocation (Difficulty: 5/10)
- **Context**: 200-person office move, IT infrastructure
- **BAC**: $500,000 | Duration: 12 weeks
- **Real-world basis**: Facility management case studies

### Scenario 6: Manufacturing Line Setup (Difficulty: 6/10)
- **Context**: New assembly line for consumer electronics
- **BAC**: $2M | Duration: 6 months
- **Real-world basis**: Industrial project management research

### Scenario 7: Hospital Wing Expansion (Difficulty: 7/10)
- **Context**: New patient wing with regulatory compliance
- **BAC**: $15M | Duration: 18 months
- **Real-world basis**: Healthcare construction (AHA benchmarks)

### Scenario 8: Bridge Rehabilitation (Difficulty: 8/10)
- **Context**: Civil engineering infrastructure project
- **BAC**: $25M | Duration: 24 months
- **Real-world basis**: DOT/FHWA project data

### Scenario 9: New Product Launch (Difficulty: 9/10)
- **Context**: Cross-functional product to market
- **BAC**: $5M | Duration: 12 months
- **Real-world basis**: PDMA new product development

### Scenario 10: Lunar Mission Program (Difficulty: 10/10)
- **Context**: Space program subsystem delivery
- **BAC**: $500M | Duration: 36 months
- **Real-world basis**: NASA EVM implementation (ANSI-748)

## In-app learning (shipped UI)

- **EVMS 101** plus a collapsible **Advanced topics** block live on the home screen (`evms-training/src/components/EvmsLearnPanel.svelte`) so learners see core definitions before choosing a scenario.
- Detailed design notes below remain the product spec; they are not duplicated inside the static build.

## EVMS Metrics (Tracked)
| Metric | Acronym | Description |
|--------|---------|-------------|
| Planned Value | PV | Budgeted cost of work scheduled |
| Earned Value | EV | Budgeted cost of work performed |
| Actual Cost | AC | Actual cost of work performed |
| Budget at Completion | BAC | Total project budget |
| Estimate at Completion | EAC | Forecast total cost |
| Schedule Variance | SV | EV - PV |
| Cost Variance | CV | EV - AC |
| Schedule Performance Index | SPI | EV / PV |
| Cost Performance Index | CPI | EV / AC |

## Technical Requirements
- **Framework**: Svelte 5
- **Build**: Vite
- **Deployment**: Self-contained static build (single HTML + assets)
- **State**: No backend - all state in browser localStorage

## Beads Integration
- Each scenario = 1 bead
- Each decision point = checkpoint
- Completion = all 10 beads collected
