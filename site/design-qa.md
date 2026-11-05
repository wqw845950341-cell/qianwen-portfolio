# Design QA — live project links, street texture, and evidence layout

## Evidence

- Source 01, street-greening case: `C:\Users\12637\AppData\Local\Temp\codex-clipboard-cd2c8a65-1605-429b-a6fc-6a4a7b967358.png` (2343 × 1080).
- Source 02, AI-commerce case: `C:\Users\12637\AppData\Local\Temp\codex-clipboard-f6e39717-f422-4d78-b0bc-c9f044135daf.png` (2497 × 1279).
- Source 03, home evidence detail: `C:\Users\12637\AppData\Local\Temp\codex-clipboard-83d3b1a5-6b89-4231-b2b5-1a5cfec4719c.png` (640 × 217 focused crop).
- Implementation captures: `qa-latest-street.png`, `qa-latest-commerce.png`, and `qa-latest-home-project1.png`, each rendered at a 1280 × 720 CSS viewport.
- Comparison sheets: `qa-compare-street.png`, `qa-compare-commerce.png`, and `qa-compare-home.png`. Each side is fitted proportionally into a 1000 × 700 comparison slot; the differing source viewports were not stretched or treated as pixel-identical.
- Tested states: `#work-3`, `#work-1`, and the home Work state with AI commerce selected and its evidence note open.

## Findings

- No actionable P0/P1/P2 mismatch remains.
- Street-greening copy and its five-stage capability rail no longer collide with the live-project CTA. The intentionally taller project section scrolls at short viewports instead of clipping the final stage.
- The former map screenshot is no longer rendered. The entire central surface is a live Canvas city system: fine parcel particles, road bands, a river corridor, scan rings, hotspots, pointer disturbance, and the emerald field layer all share one continuous composition.
- The AI-commerce case now exposes `打开 Coze 工作流`, linking to `https://www.coze.cn/store/agent/7674848296376221738?bot_id=true`.
- The street-greening case now exposes `打开在线项目`, linking to `https://streetgreening-dashboard-site.vercel.app/`.
- The home evidence tag was moved away from the original node/button collision. The focused comparison shows readable labels and uninterrupted controls.
- The six-node AI workflow connector stays centered between circular nodes.
- The bottom sound control displays `Time Machine` plus its ON/OFF state, supports click and the `S` keyboard shortcut, loops, and uses a conservative default volume.
- Browser console verification reported no errors or warnings. The production build completed successfully.

## Comparison history

1. Earlier street capture placed the CTA over `城市数据` and split the visual into a left particle field plus a static screenshot. The CTA/copy spacing was rebuilt and the static image dependency was replaced by a full-bleed dynamic city Canvas.
2. Earlier AI-commerce capture offered only `查看项目思考`. The CTA now uses the required Coze destination, and DOM inspection confirms the final href.
3. Earlier home evidence capture showed its tag across nearby copy and controls. Repositioning the tag removed that overlap in the post-fix capture.
4. Earlier workflow connectors touched the circles off-center. The connector origin is now calculated from each circle's horizontal midpoint.

## Open asset dependency

- The repository does not contain the requested `Time Machine` audio asset. The player is wired to `/assets/time-machine.mp3`, but playback cannot be validated until the user supplies a legally usable file and identifies the intended artist/version. No copyrighted recording was downloaded or embedded during implementation.

## Follow-up polish

- P3: the dynamic city texture is deliberately darker at 1280 × 720 to protect copy contrast; its density and glow can be raised later without changing layout or interaction.
- P3: source and implementation use different viewport ratios, so exact line breaks differ while hierarchy and collision-free behavior are preserved.

final result: passed

## Homepage restoration after explicit user correction

The latest request restores the original particle homepage, not the CodeCraft-style redesign. Source truth is commit `00fa758` and its actual live capture `references/refresh/original-live.png`. Implementation captures are in `qa/restored-home/`, at 1440×1000 desktop and 390×844 mobile. The normalized combined `comparison.png` was opened and reviewed. The hero, three original project locations, particle field, navigation, evidence card and dock retain their original composition. Only the requested sans-serif font, five-project indices, added-project content, corrected links and repaired asset paths differ intentionally.

The new projects occupy an existing spatial slot when selected; all five remain available in the visible top/side indices and mobile selector. This preserves the original composition without adding overlapping clusters. A long RedLens note was shortened and its evidence tag shifted after visual review so it does not obscure its project label or Demo action. Post-fix captures and the passing `qa/restored-home/results.json` record the change.

Typography, original dark tokens, spacing, image sharpness and scope copy were checked. No actionable P0/P1/P2 findings remain in this correction. Tests cover all project selections, new evidence, direct demo actions, numeric shortcuts, both new cases, command search, 320/390/760/946/1100/1440 px layouts, mobile evidence and routing, English/light modes, and actual moving/pointer-responsive Canvas frames. The first motion-only check inherited the reduced-motion context; explicit media emulation corrected the test setup and the live Canvas passed. Browser errors and HTTP failures: none.

final result: passed

## Live-site refresh — 2026-11-05

Latest user direction supersedes the particle-led homepage. Source: supplied CodeCraft-style screenshot, retained locally in `references/refresh/style-reference.png`. Baseline: `references/refresh/original-live.png`. The redesigned homepage preserves existing internal routes and adds Teddi Lab and RedLens.

Visual evidence: `qa/refresh/desktop-top.png` at 1440×1000, `mobile-top.png` at 390×844, project-grid and both added-case captures. `style-comparison.png` combines source and implementation hero regions at normalized 720 px width. Typography, navy/violet tokens, spacing, image quality and copy were reviewed. Own project imagery intentionally replaces the reference's portrait; actual project counts and methods replace unsupported client/experience statistics and skill percentages. Chinese and English use a sans-serif stack; the old serif font has been removed.

Functional browser checks in `qa/refresh/results.json` pass: five projects, real category filters, current demo links, Teddi/RedLens routes, media and stage selection, embedded RedLens diagnosis, original three case routes, command search, English and mobile menu. No page overflow at 320/390/760/946/1100/1440 px. No recorded console or HTTP errors. The original animated cases use explicit DOM readiness because ongoing resources can delay network-idle. Build and four protected hosting checks pass.

No actionable P0/P1/P2 findings remain in the reviewed refresh. P3: the retained original case pages have more extensive interactive layouts than the new card-led homepage. Physical-device Safari/Firefox were not tested. GitHub publication is explicitly requested and uses the existing Pages workflow.

final result: passed

## Five simultaneous nebulae and unified project tabs — 2026-11-05

This section supersedes the earlier three-center/aliased extension. Source visual truth remains the original particle homepage at commit `00fa758`, captured in `references/refresh/original-live.png`, plus the user's explicit request for five simultaneous nebulae and matching project tabs. No homepage redesign was introduced.

Evidence: `qa/five-nebulae/desktop.png`, `selected-4.png`, `selected-5.png`, `case-live-motion.png`, `case-4.png`, `case-5.png`, and `mobile.png`. The combined `comparison.png` places source and implementation together at identical 1440×1000 CSS/pixel sizes, deviceScaleFactor 1; focused `comparison-hero.png` and `comparison-navigation.png` were opened alongside it. Mobile captures use 390×844 CSS pixels. The baseline source had reduced motion and an existing empty-canvas bug; the final full-motion capture intentionally shows the restored particle field. Different animation frames are not treated as visual drift.

Findings and iteration history:
- [P1, fixed] Newly added projects previously reused an existing nebula and hid its original label. The field now builds five separate center/color groups, all five node labels and evidence tags remain visible under every selection, and every center independently selects its own project.
- [P1, fixed] New cases previously used a separate static layout. Both now render the original CaseStudy shell with five project tabs, live pointer-reactive particle Canvas, four selectable workflow nodes, shared insight panel, four scroll-linked chapters and original navigation. Real artifacts and supplied video remain available below the hero.
- [P2, fixed] An opaque preview initially concealed the new case particle field. Moving the live field into the shared hero reveals it around the workflow without compromising copy contrast; `case-live-motion.png` documents the fix.
- [P2, fixed] Canvas ResizeObserver cleared static reduced-motion frames. Static fields now repaint after resize. Reduced motion retains five visible nebulae while full motion retains live frame changes and pointer response.
- [P2, fixed] Teddi's expanded node controls collided with the lower status row. The node was raised, with `selected-4.png` documenting separation. Mobile uses the existing bottom sheet and five tabs; new case flow controls use four columns and natural content height.

Required fidelity surfaces: the requested sans-serif/黑体 stack and original hierarchy are retained; original hero, navigation, draggable note and dock spacing remain recognizable; existing violet/amber/emerald colors are retained with distinct rose and blue for the additions; original project images/video are sharp and contained; all added content remains bilingual and describes proposal/prototype scope without invented commercial results. Moving the new labels and shrinking individual nebula radii are intentional five-project extensions. All five labels are simultaneously visible on desktop and mobile. No actionable P0/P1/P2 findings remain.

Verification: `qa/five-nebulae/results.json` records five-center hit tests, five-project selection, shared case routes and tabs, workflow and chapter interactions, galleries, supplied video playback, cross-project stage reset, command search, six viewport widths, mobile demo links, bilingual/light theme controls, live Canvas frames and zero page/network errors. Production build and all four existing hosting tests passed. Physical-device Safari/Firefox were not tested.

final result: passed
