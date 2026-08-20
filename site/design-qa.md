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
