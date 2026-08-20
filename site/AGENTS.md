# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable visual direction

- Use the approved dark generative-particle portfolio system as the source of truth.
- Do not use a portrait or foreground a single job title; present Qianwen as a generalist across systems, data, AI prototyping, and spatial research.
- Project colors are fixed: violet-blue for AI commerce, amber for PosturePal, emerald-teal for HCMC Street Greening.
- Preserve bilingual Chinese/English controls, keyboard navigation, reduced-motion support, and a strong mobile touch experience.
- Prefer content-rich case studies over portfolio thumbnails: each project should expose context, system logic, key decisions, evidence, validation framing, and reflection.
- Interaction should reveal meaning, not decorate it: project signals, clickable workflow nodes, scroll-linked chapters, filters, reading drawers, and capability inspectors should all expose real content.
- Keep the particle field as the shared atmosphere, not the only art form. Each major page needs a distinct content-bearing visual system: task network for AI commerce, pose landmarks and session UI for PosturePal, map layers and grading for street greening, orbital time for Journey, editorial constellations for Notes, and a capability field for About.
- Particle scenes must be genuinely interactive rather than exported illustrations. In particular, the PosturePal hero uses a live Canvas pose field with pointer repulsion, spring reassembly, breathing motion, selectable posture phases, and a visible landmark skeleton; do not replace it with the static amber pose image.
- The Street Greening case study must preserve the approved composition: left project rail and five-stage grading chain, a broad emerald flow converging into the HCMC map, the right Key Facts/typology panel, and the lower green chapter waveform. All visible hero motion must be live: use the React Canvas vector field, the canvas-rendered/pointer-reactive map with scan pulses, live DOM scenario controls, and the animated chapter waveform. Do not restore the static particle plate, screenshot-based bottom strip, duplicated screenshot labels, or generic scribble particle system.
- Primary navigation order is Journey, Work, AI, Notes, About, Contact. Preserve the dedicated AI capability page as a content-bearing live network, with four selectable capability layers and three concrete project evidence cards.
- Journey capability growth is communicated with an interactive before/after radar chart, explicit 0–100 reflection scores, score deltas, and milestone evidence. Do not regress to decorative horizontal lines without values.
- Notes and About must not reuse the same faint dot-cloud treatment. Notes uses a high-visibility editorial nebula with braided topic routes, horizontal vortices, pulse rings, moving packets, and pointer repulsion. About uses distinct orbital capability clusters with evidence streams converging on a shared nexus; capability selection changes the dominant cluster and color. Preserve the text-safe vertical bands so richer motion never overlaps foreground copy or CTAs.
- Approved references live under `C:\Users\12637\.codex\generated_images\019fdb77-db7e-7b82-a1e4-a0abd68da0c2\` and include the homepage, case-study, Journey, Notes, About, command-palette, and mobile frames generated on 2026-08-10.
- The approved interaction extension is the 2026-08-12 “Field Notes” direction (`exec-e4931ba1-cacc-4e6a-8fe3-bfb4740f0cdc.png`): preserve the dark particle canvas while adding translucent project evidence slips, draggable notes, evidence tags, and a stitched vertical project index. These interactions must reveal real Problem / Decision / Learned / Impact content and collapse into a touch-safe bottom evidence sheet on mobile.
- Treat the AI commerce diagnostic and task copilot as a 2026 project everywhere it is dated.
